require 'rails_helper'

RSpec.describe PreferencesController, type: :controller do
    let!(:user) { FactoryBot.create(:user) }
    let!(:school_spec_record) { FactoryBot.create(:school_specialization) }

    let(:preference_params) do
        {
            school_specialization_id: school_spec_record.id,
            priority: 1
        }
    end

    before do
        sign_in user
    end

    describe 'GET #new' do

        it 'renders the new template' do
            get :new
            expect(response).to render_template(:new)
        end
    end

    describe 'POST #create' do
        
        context 'with vaild params' do

            it 'creates a preference record for the current_user' do
                expect {post :create, params: { preference: preference_params }}.to change {Preference.count}.by(1)
            end

            it 'redirects to preferences_path with a success flash' do
                post :create, params: { preference: preference_params }
                expect(response).to redirect_to(preferences_path)
                expect(flash[:success]).to eq('Preference was successfully created.')
            end
        end

        context 'with invalid params, meaning the record already exists' do

            before do
                Preference.create(user_id: user.id, school_specialization_id: school_spec_record.id, priority: 1)
            end

            it 'does not create a preference' do
                # expect { action }.to change { object.attribute }.by(amount)
                # The change matcher is for observing changes in data as a result of actions.
                expect { post :create, params: { preference: preference_params }}.not_to change {Preference.count}
            end

            it 'redirects to preferences_path with a alert flash' do
                post :create, params: { preference: preference_params }

                expect(response).to redirect_to(preferences_path)
                expect(flash[:alert]).to eq('You have already chosen this specialization.')
            end
        end
    end

    describe 'DELETE #destroy' do

        before do
            Preference.create!(user_id: user.id, school_specialization_id: school_spec_record.id, priority: 1)
        end
    

        it 'pulls the specific record by bet id and assigns it to a instance variable' do
            last_pref_id = Preference.last.id
            delete :destroy, params: { id: Preference.last.id }
            expect(assigns(:preference).id).to eq(last_pref_id)
        end
          
        it 'deletes the record from the table' do
            expect {delete :destroy, params: { id: Preference.last.id }}.to change {Preference.count}.by(-1)
        end

        before do
            allow(controller).to receive(:update_priority_after_deletion)
        end

        it 'calls the update_priority_after_deletion method to reassign the preferences the right priority' do
            delete :destroy, params: { id: Preference.last.id }
            expect(controller).to have_received(:update_priority_after_deletion)
        end

        it 'redirects to preferences_path with a success flash' do
            delete :destroy, params: { id: Preference.last.id }
            expect(response).to redirect_to(preferences_path)
            expect(flash[:success]).to eq('Preference was successfully removed.')
        end
    end
end