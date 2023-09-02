require 'rails_helper'

RSpec.describe PreferencesController, type: :controller do
    let!(:user) { FactoryBot.create(:user) }
    let!(:school_specialization) { FactoryBot.create(:school_specialization) }
    let!(:preference_params) {{school_specialization_id: school_specialization.id, priority: 1}}

    before do
        sign_in user
    end

    describe 'POST #create' do
        
        context 'with vaild params' do
            it 'returns a 201 status' do
                post :create, params: {preference: preference_params}
                expect(response).to have_http_status(201)
            end

            it 'creates a preference record for the current_user' do
                expect {post :create, params: { preference: preference_params }}.to change {Preference.count}.by(1)
            end
        end
            
        context 'with invalid params, meaning the record already exists' do

            before do
                Preference.create(user_id: user.id, school_specialization_id: school_specialization.id, priority: 1)
            end

            it 'returns a 400 status' do
                post :create, params: {preference: preference_params}
                expect(response).to have_http_status(400)
            end

            it 'does not create a preference' do
                post :create, params: {preference: preference_params}
                expect { post :create, params: { preference: preference_params }}.not_to change {Preference.count}
            end
        end
    end

    describe 'DELETE #destroy' do
        let!(:preference1) { create(:preference, user: user, priority: 1 ) }
        let!(:preference2) { create(:preference, user: user, priority: 2 ) }
        let!(:preference3) { create(:preference, user: user, priority: 3 ) }

        it 'pulls the specific record by bet id and assigns it to a instance variable' do
            last_pref_id = preference2.id
            delete :destroy, params: { id: last_pref_id }
            expect(assigns(:preference).id).to eq(last_pref_id)
        end

        context "if the preference doesn't exist" do
            it 'returns a 404 status' do
                delete :destroy, params: { id: 99}
                expect(response).to have_http_status(404)
            end
        end
          
        context "if the preference does exist" do
            it 'returns a 200 status' do
                delete :destroy, params: {id: preference2.id}
                expect(response).to have_http_status(200)
            end

            it 'deletes the record from the table' do
                expect {delete :destroy, params: { id: preference2.id }}.to change {Preference.count}.by(-1)
            end

            it 'calls the update_priority_after_deletion method to reassign the preferences the right priority' do
                delete :destroy, params: { id: preference2.id }
                preference3.reload
                expect(preference3.priority).to eq(2)
            end
        end
    end

    describe 'GET #index' do
        context 'if the user has no preferences' do
            it 'returns a 200 status' do
                get :index
                expect(response).to have_http_status(200)
            end

            it 'has a proper message to outline that the user has no preferences' do
                get :index
                parsed_response = JSON.parse(response.body)
                expect(parsed_response["status"]["message"]).to eq("Student has no preferences.")
            end
        end

        context 'if the user has preferences' do
            let!(:preference1) { create(:preference, user: user, priority: 1 ) }
            let!(:preference2) { create(:preference, user: user, priority: 2 ) }

            it 'returns a 200 status' do
                get :index
                expect(response).to have_http_status(200)
            end

            it 'returns the preferences with the proper attributes' do
                get :index
                parsed_response = JSON.parse(response.body)
                first_preference = parsed_response["data"]["preferences"].first
                
                expect(first_preference.keys).to match_array([
                    "id",
                    "user_id",
                    "school_specialization_id",
                    "priority",
                    "created_at"
                ])
            end

            it 'returns the preferences in the proper order, by priority' do
                get :index
                parsed_response = JSON.parse(response.body)
                first_preference = parsed_response["data"]["preferences"].first
                second_preference = parsed_response["data"]["preferences"].last

                expect(first_preference["priority"]).to be < second_preference["priority"]
            end
        end
    end  
end