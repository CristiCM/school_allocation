require 'rails_helper'
# Needed to add config.include Devise::Test::ControllerHelpers, type: :controller
RSpec.describe StudentsCreationController, type: :controller do

    let(:admin) { create(:user, role: 'admin')}

    let(:student_params) do
        {
            email: 'teststudent@student.com',
            admission_average: 10.00,
            en_average: 9.65,
            ro_grade: 8.85,
            mathematics_grade: 6.54,
            mother_tongue: 'German',
            mother_tongue_grade: 7.85,
            graduation_average: 9.85
        }
    end

    before do
        sign_in admin
    end

    describe 'POST #create' do
        context 'with valid params' do

            it 'returns a 201 status' do
                post :create, params: { user: student_params }
                expect(response).to have_http_status(201)
            end  
            
            it 'creates a new user with the provided params' do
                expect { post :create, params: { user: student_params } }.to change {User.count}.by(1)
            end

            it 'assigns a random password' do
                allow(SecureRandom).to receive(:hex).and_return('secure_password')

                post :create, params: { user: student_params }
                expect(User.last.valid_password?('secure_password')).to be true
                # valid_password? -> Devise method to check if a string is the 
                # encrypted equiv of what the user stores.
            end       
            
            it 'returns the users with proper attributes' do
                post :create, params: { user: student_params }

                parsed_response = JSON.parse(response.body)
                user = parsed_response["data"]["student"]
                
                expect(user.keys).to match_array([
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
        end

        context 'with invalid params' do
            let(:invalid_student_params) { {email: ''} }

            before do
                post :create, params: { user: invalid_student_params }
            end

            it 'returns a 400 status' do
                post :create, params: { user: invalid_student_params }
                expect(response).to have_http_status(400)
            end 
            
            it 'does not create the user' do
                expect {post :create, params: { user: invalid_student_params }}.not_to change { User.count }
            end
        end
    end

    describe 'PATCH #update' do
        let!(:user) { create(:user) }

        context 'with valid params' do

            it 'returns a 200 status' do
                expect(response).to have_http_status(200)
            end  

            it 'pulls the specific record by bet id and assigns it to a instance variable' do
                patch :update, params: { id: user.id, user: student_params }
                expect(assigns(:student).id).to eq(user.id)
            end

            it 'updates the student record' do
                old_email = user.email
                expect {
                    patch :update, params: { id: user.id, user: student_params }
                    user.reload
                  }.to change { user.email }.from(old_email).to('teststudent@student.com')
            end
        end

        context 'with invalid params' do
            it 'returns a 400 status' do
                patch :update, params: { id: user.id, user: student_params.merge(ro_grade: nil) }
                expect(response).to have_http_status(400)
            end  
        end
    end

    describe 'DELETE #destroy' do
        let!(:user) { create(:user) }

        context 'with valid params' do

            it 'returns a 200 status' do
                delete :destroy, params: { id: user.id }
                expect(response).to have_http_status(200)
            end

            it 'pulls the specific record by bet id and assigns it to a instance variable' do
                delete :destroy, params: { id: user.id }
                expect(assigns(:student).id).to eq(user.id)
            end

            it 'deletes the student record' do
                expect {delete :destroy, params: { id: user.id }}.to change { User.count }.by(-1)
            end
        end

        context 'with invalid params' do
            it 'returns a 404 status' do
                delete :destroy, params: { id: -5 }
                expect(response).to have_http_status(404)
            end
        end
    end


    describe 'GET #index' do
        
        context 'when no students are present' do

            before do
                get :index
            end
            
            it 'returns a 200 response' do
                expect(response).to have_http_status(200)
            end

            it 'has a suggestive message in the response' do
                parsed_response = JSON.parse(response.body)
                message = parsed_response["status"]["message"]

                expect(message).to eq("There are no student records.")
            end  
        end

        context 'when students are present with default sorting and ordering' do
            let!(:users) { create_list(:user, 30) }

            before do
                get :index
            end

            it 'returns a 200 status' do
                expect(response).to have_http_status(200)
            end

            it 'returns the users with proper attributes' do
                parsed_response = JSON.parse(response.body)

                first_user = parsed_response["data"]["users"].first

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

            it 'sets default sorting parameters' do
                expect(assigns(:sort_by)).to eq('users.created_at')
                expect(assigns(:order)).to eq('DESC')
            end

            it 'returns the users paginated with a limit of 10' do
                parsed_response = JSON.parse(response.body)
                expect(parsed_response["data"]["users"].size).to eq(10)
            end

            it 'returns the users properly sorted and ordered ' do
                parsed_response = JSON.parse(response.body)
                response_student_ids = parsed_response["data"]["users"].map {|user| user["id"]}

                correct_student_ids = User.where(role: 'student').sort_by(&:created_at).map(&:id).reverse.first(10)

                expect(response_student_ids).to match_array(correct_student_ids)
            end
        end

        context 'when students are present with custom sorting and ordering' do
            let!(:users) { create_list(:user, 30) }

            before do
                get :index, params: {sort_by: 'users.email', order: 'ASC'}
            end

            it 'returns a 200 status' do
                expect(response).to have_http_status(200)
            end

            it 'returns the users with proper attributes' do
                parsed_response = JSON.parse(response.body)

                first_user = parsed_response["data"]["users"].first

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

            it 'sets default sorting parameters' do
                expect(assigns(:sort_by)).to eq('users.email')
                expect(assigns(:order)).to eq('ASC')
            end

            it 'returns the users paginated with a limit of 10' do
                parsed_response = JSON.parse(response.body)
                expect(parsed_response["data"]["users"].size).to eq(10)
            end

            it 'returns the users properly sorted and ordered ' do
                parsed_response = JSON.parse(response.body)
                response_student_ids = parsed_response["data"]["users"].map {|user| user["id"]}

                correct_student_ids = User.where(role: 'student').sort_by(&:email).map(&:id).first(10)

                expect(response_student_ids).to match_array(correct_student_ids)
            end
        end
    end
    
    describe 'GET #download' do
        let!(:users) { create_list(:user, 30) }

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
            expect(response.headers['Content-Disposition']).to include("Students.xlsx")
        end
    end
end