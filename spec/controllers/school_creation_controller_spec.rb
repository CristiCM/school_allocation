require 'rails_helper'

RSpec.describe SchoolsCreationController, type: :controller do
    let(:admin) { create(:user, role: 'admin') }

    let!(:school) { create(:school)}
    let!(:track) { create(:track)}
    let!(:specialization) { create(:specialization)}

    let(:school_spec_params) do 
        {
            school_id: school.id, 
            track_id: track.id,
            specialization_id: specialization.id,
            spots_available: 2
        }
    end

    before do
        sign_in admin
    end

    describe 'GET #new' do
        context 'if all are present School/Track/Spec' do

            it 'returns a 200 status' do
                get :new
                expect(response).to have_http_status(200)
            end

            it 'returns schools with the proper attributes and matching ids' do
                get :new
                parsed_response = JSON.parse(response.body)
                first_school = parsed_response["data"]["schools"].first

                expect(first_school.keys).to match_array([
                    "id",
                    "name",
                    "created_at"
                ])

                expect(first_school["id"]).to eq(school.id)
            end

            it 'returns tracks with the proper attributes and matching ids' do
                get :new
                parsed_response = JSON.parse(response.body)
                first_track = parsed_response["data"]["tracks"].first

                expect(first_track.keys).to match_array([
                    "id",
                    "name",
                    "created_at"
                ])

                expect(first_track["id"]).to eq(track.id)
            end

            it 'returns schools with the proper attributes and matching ids' do
                get :new
                parsed_response = JSON.parse(response.body)
                first_specialization = parsed_response["data"]["specializations"].first

                expect(first_specialization.keys).to match_array([
                    "id",
                    "name",
                    "created_at"
                ])

                expect(first_specialization["id"]).to eq(specialization.id)
            end
        end

        context 'if any of the 3, School/Track/Spec are missing' do
            before do
                School.destroy_all
            end

            it 'returns a 206 status' do
                get :new
                expect(response).to have_http_status(206)
            end
        end
    end

    describe 'POST #create' do
        
        it 'creates a new school specialization with the provided params' do
            expect { post :create, params: {school_specialization: school_spec_params }}.to change {SchoolSpecialization.count}.by(1)
        end

        context 'with valid params' do

            it 'returns a 201 status' do
                post :create, params: {school_specialization: school_spec_params}
                expect(response).to have_http_status(201)
            end

            it 'returns the school_specialization with proper attributes and matching id' do
                post :create, params: {school_specialization: school_spec_params}
                parsed_response = JSON.parse(response.body)
                school_specialization = parsed_response["data"]["school_specialization"]

                expect(school_specialization.keys).to match_array([
                    "id",
                    "school_id",
                    "track_id",
                    "specialization_id",
                    "spots_available",
                    "created_at"
                ])

                expect(school_specialization["id"]).to eq(SchoolSpecialization.last.id)
            end
        end

        context 'with invalid params' do
            
            before do
                school_spec_params[:spots_available] = -10
            end

            it 'returns a 400 status' do
                post :create, params: { school_specialization: school_spec_params }
                expect(response).to have_http_status(400)
            end
        end

        context 'if the school_specialization already exists' do
            before do
                SchoolSpecialization.create(school_spec_params)
            end

            it 'returns a 409 status' do
                post :create, params: { school_specialization: school_spec_params }
                expect(response).to have_http_status(409)
            end
        end
    end

    describe 'PATCH #update' do
        let!(:school_spec_record) { create(:school_specialization, spots_available: 999) }

        it 'pulls the specific record by bet id and assigns it to a instance variable' do
            patch :update, params: { id: school_spec_record.id, school_specialization: school_spec_params }
            expect(assigns(:school_specialization).id).to eq(school_spec_record.id)
        end

        context 'with valid params' do
            before do
                patch :update, params: { id: school_spec_record.id, school_specialization: {spots_available: 100} }
            end

            it 'returns a 200 status' do
                expect(response).to have_http_status(200)
            end

            it 'returns the updated school specialization' do
                parsed_response = JSON.parse(response.body)
                updated_school_spec = parsed_response["data"]["school_specialization"]

                expect(updated_school_spec["spots_available"]).to  eq(100)
            end
        end

        context 'with invalid params' do
            before do
                patch :update, params: { id: school_spec_record.id, school_specialization: {spots_available: -5} }
            end

            it 'returns a 400 status' do
                expect(response).to have_http_status(400)
            end
        end
        
        context 'if the record does not exist' do
            before do
                patch :update, params: { id: 888, school_specialization: {spots_available: 100} }
            end

            it 'returns a 404 status' do
                expect(response).to have_http_status(404)  
            end
        end
    end

    describe 'DELETE #destroy' do
        let!(:school_spec_record) { FactoryBot.create(:school_specialization)}

        it 'pulls the specific record by bet id and assigns it to a instance variable' do
            delete :destroy, params: { id: school_spec_record.id }
            expect(assigns(:school_specialization).id).to eq(school_spec_record.id)
        end

        context 'if the record exists' do

            it 'returns a 200 status' do
                delete :destroy, params: { id: school_spec_record.id }
                expect(response).to have_http_status(200)
            end

            it 'deletes the record' do
                expect { delete :destroy, params: {id:school_spec_record.id}}.to change { SchoolSpecialization.count}.by(-1)
            end
        end  

        context 'if the record does not exist' do
            before do
                delete :destroy, params: { id: 888 }
            end

            it 'returns a 404 status' do
                expect(response).to have_http_status(404)  
            end
        end

        context 'if the school specialization is choosen by a student' do
            let!(:assignment) { create(:assignment, school_specialization_id: school_spec_record.id)}
            before do
                delete :destroy, params: {id: school_spec_record.id}
            end

            it 'returns a 403 status' do
                expect(response).to have_http_status(403)
            end

            it 'deos not delete the record' do
                expect { delete :destroy, params: {id: school_spec_record.id}}.not_to change { SchoolSpecialization.count }
            end
        end
    end

    describe 'GET #index' do

        context 'when there are no school_specializations' do
            before do
                get :index
            end

            it 'returns a 204 status' do
                expect(response).to have_http_status(204)
            end
        end

        context 'when school_specializations exist and the ordering is default' do
            let!(:school_specializations) { create_list(:school_specialization, 20)}
            let!(:max_spots_school_specialization) { create(:school_specialization, spots_available: 99999) }
            
            before do
                get :index
            end

            it 'returns a 200 status' do
                expect(response).to have_http_status(200)
            end

            it 'returns school_specializations paginated with a limit of 10' do
                parsed_response = JSON.parse(response.body)
                expect(parsed_response["data"]["school_specializations"].size).to eq(10)
            end

            it 'returns school_specializations with required attributes' do
                parsed_response = JSON.parse(response.body)
                
                first_school_specialization = parsed_response["data"]["school_specializations"].first
                expect(first_school_specialization.keys).to match_array([
                    "id",
                    "school_id",
                    "track_id",
                    "specialization_id",
                    "spots_available",
                    "created_at"
                ])
            end

            it 'sets the proper default sorting and ordering params' do
                expect(assigns(:sort_by)).to eq('school_specializations.spots_available')
                expect(assigns(:order)).to eq('DESC')
            end

            it 'returns matching school_specializations' do
                parsed_response = JSON.parse(response.body)
                first_response_school_specialization = parsed_response["data"]["school_specializations"].first

                expect(max_spots_school_specialization.id).to eq(first_response_school_specialization["id"])
            end

            # up for issues due to one single tiebraker
            it 'orders the assignments correctly new' do
                parsed_response = JSON.parse(response.body)
                response_school_specs_ids = parsed_response["data"]["school_specializations"].map { |entry| entry["id"] }
                
                correct_school_specs_ids = SchoolSpecialization.all.sort_by { |school_spec| school_spec.spots_available }.reverse.first(10)
                correct_school_specs_ids = correct_school_specs_ids.map {|school_spec| school_spec.id}

                expect(correct_school_specs_ids).to eq(response_school_specs_ids)
            end
        end
    

        context 'when school_specializations exist and the ordering is custom' do
            let!(:school_specializations) { create_list(:school_specialization, 20)}
            
            before do
                get :index, params: { order: 'ASC' }
            end

            it 'sets the proper custom ordering' do
                expect(assigns(:order)).to eq('ASC')
            end

            it 'orders the school_specializations correctly' do
                parsed_response = JSON.parse(response.body)
                response_school_specs_ids = parsed_response["data"]["school_specializations"].map { |entry| entry["id"] }
                
                correct_school_specs_ids = SchoolSpecialization.all.sort_by { |school_spec| school_spec.spots_available}.first(10)
                correct_school_specs_ids = correct_school_specs_ids.map {|school_spec| school_spec.id}

                expect(correct_school_specs_ids).to eq(response_school_specs_ids)
            end
        end
    end

    describe 'GET #download' do
        let!(:school_specializations) { create_list(:school_specialization, 20) }

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
            expect(response.headers['Content-Disposition']).to include("School Specializations.xlsx")
        end
    end
end