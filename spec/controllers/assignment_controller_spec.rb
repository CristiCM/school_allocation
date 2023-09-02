require 'rails_helper'

RSpec.describe AssignmentsController, type: :controller do
    let!(:admin) { FactoryBot.create(:user, role: 'admin') }
    let!(:job_manager) { double('JobManager') }
    let!(:job) { FactoryBot.create(:job, allocation_done: false) }


    before do
        sign_in admin
        allow(JobManager).to receive(:new).and_return(job_manager)
    end

    describe 'GET #new' do

        context "when all students have preferences" do
            let(:preferences) { create_list(:preference, 30)}

            before do
                get :new
            end

            it 'returns a 204 status' do
                expect(response).to have_http_status(204)
            end

            it 'returns a empty students array' do
                parsed_response = JSON.parse(response.body)
                expect(parsed_response["students"]).to eq(nil)
            end
        end

        context 'when no-preference stundents exist' do
            let!(:users) { create_list(:user, 20) }

            before do
                get :new
            end

            it 'returns a 200 status' do
                expect(response).to have_http_status(200)
            end

            it 'returns students paginated with a limit of 10' do
                parsed_response = JSON.parse(response.body)
                expect(parsed_response["data"].size).to eq(10)
            end

            it 'returns users with required attributes' do
                parsed_response = JSON.parse(response.body)
                attribute_array = [
                    "id",
                    "email",
                    "created_at",
                    "admission_average",
                    "en_average",
                    "ro_grade",
                    "mathematics_grade",
                    "mother_tongue",
                    "mother_tongue_grade",
                    "graduation_average",
                    "role",
                    "jti"
                ]
                expect(parsed_response["data"].first.keys).to match_array(attribute_array)
            end
        end
    end
    
    describe 'GET #index' do

        context 'when there are no assingments' do
            before do
                get :index
            end

            it 'returns a 204 status' do
                expect(response).to have_http_status(204)
            end
        end

        context 'when assignments exist and the sorting is default' do
            let!(:assignments) { create_list(:assignment, 20)}
            
            before do
                get :index
            end

            it 'returns a 200 status' do
                expect(response).to have_http_status(200)
            end

            it 'returns assignments paginated with a limit of 10' do
                parsed_response = JSON.parse(response.body)
                expect(parsed_response["data"]["assignments"].size).to eq(10)
            end

            it 'returns assignment with required attributes' do
                parsed_response = JSON.parse(response.body)
                first_assignment = parsed_response["data"]["assignments"].first["assignment"]
                expect(first_assignment.keys).to match_array([
                    "id",
                    "user_id",
                    "school_specialization_id",
                    "created_at",
                    "unassigned"
                ])
            end

            it 'returns user with required attributes' do
                parsed_response = JSON.parse(response.body)
                first_user = parsed_response["data"]["assignments"].first["user"]

                expect(first_user.keys).to match_array([
                    "id",
                    "email",
                    "created_at",
                    "admission_average",
                    "en_average",
                    "ro_grade",
                    "mathematics_grade",
                    "mother_tongue",
                    "mother_tongue_grade",
                    "graduation_average",
                    "role",
                    "jti"
                ])
            end

            it 'returns matching user/assignment' do
                parsed_response = JSON.parse(response.body)
                first_assignment = parsed_response["data"]["assignments"].first["assignment"]
                first_user = parsed_response["data"]["assignments"].first["user"]

                expect(first_assignment["user_id"]).to eq(first_user["id"])
            end

            it 'sets the proper default sorting and ordering params' do
                expect(assigns(:sort_by)).to eq('users.admission_average')
                expect(assigns(:order)).to eq('DESC')
            end

            it 'orders the assignments correctly new' do
                parsed_response = JSON.parse(response.body)
                response_assignment_ids = parsed_response["data"]["assignments"].map { |entry| entry["assignment"]["id"] }
                
                correct_assignments = assignments.sort_by { |assignment| assignment.user.admission_average }.reverse.first(10)
                correct_assignments_ids = correct_assignments.map {|assignment| assignment["id"]}

                expect(correct_assignments_ids).to eq(response_assignment_ids)
            end
        end
    end

        context 'when assignments exist and the sorting is custom' do
            let!(:assignments) { create_list(:assignment, 20)}
            
            before do
                get :index, params: { sort_by: 'users.ro_grade', order: 'ASC'}
            end

            it 'sets the proper default sorting and ordering params' do
                expect(assigns(:sort_by)).to eq('users.ro_grade')
                expect(assigns(:order)).to eq('ASC')
            end

            it 'orders the assignments correctly new' do
                parsed_response = JSON.parse(response.body)
                response_assignment_ids = parsed_response["data"]["assignments"].map { |entry| entry["assignment"]["id"] }
                
                correct_assignments = assignments.sort_by { |assignment| assignment.user.ro_grade }.first(10)
                correct_assignments_ids = correct_assignments.map {|assignment| assignment["id"]}

                expect(correct_assignments_ids).to eq(response_assignment_ids)
            end
        end

    describe 'GET #download' do
        let!(:assignments) { create_list(:assignment, 30) }

        before do
            get :download
        end

        it 'returns a 200 OK status' do
            expect(response).to have_http_status(200)
        end

        it 'returns the correct content type' do
            expect(response.content_type).to eq(Mime::Type.lookup_by_extension('xlsx').to_s)
        end

        it 'returns the expected content disposition (filename)' do
            expect(response.headers['Content-Disposition']).to include("Assignments.xlsx")
        end
    end
end