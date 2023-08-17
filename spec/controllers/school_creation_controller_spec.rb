require 'rails_helper'

RSpec.describe SchoolsCreationController, type: :controller do
    let(:admin) { FactoryBot.create(:user, role: 'admin') }

    let!(:school) { FactoryBot.create(:school)}
    let!(:track) { FactoryBot.create(:track)}
    let!(:specialization) { FactoryBot.create(:specialization)}

    let(:school_spec_params) do 
        {
            school_id: School.last.id, 
            track_id: Track.last.id,
            specialization_id: Specialization.last.id,
            spots_available: 2
        }
    end

    before do
        sign_in admin
    end

    describe 'GET #new' do
        
        it 'renders the new template' do
            get :new
            expect(response).to render_template(:new)
        end

        it 'initializes a new SchoolSpecialization instance' do
            get :new
            expect(assigns(:school_specialization)).to be_a_new(SchoolSpecialization)
        end
    end

    describe 'POST #create' do
        
        context 'with valid params' do

            it 'creates a new school specialization with the provided params' do
                expect { post :create, params: {school_specialization: school_spec_params }}.to change {SchoolSpecialization.count}.by(1)
            end

            it 'redirects to new_school_specialization_path with a success flash' do
                post :create, params: {school_specialization: school_spec_params }
                expect(response).to redirect_to(new_school_specialization_path)
                expect(flash[:success]).to eq('SchoolSpecialization instance created')
            end
        end

        context 'with invalid params' do
            
            before do
                school_spec_params[:spots_available] = -10
            end

            it 'redirects to new_school_specialization_path with a alert flash' do
                post :create, params: { school_specialization: school_spec_params }
                expect(response).to redirect_to(new_school_specialization_path)
                expect(flash[:alert]).to eq('Instance creation failed!')
            end
        end    
    end

    describe 'PATCH #update' do

        let!(:school_spec_record) { FactoryBot.create(:school_specialization)}

        context 'with valid params' do
            
            it 'pulls the specific record by bet id and assigns it to a instance variable' do
                patch :update, params: { id: school_spec_record.id, school_specialization: school_spec_params }
                expect(assigns(:school_specialization).id).to eq(school_spec_record.id)
            end

            it 'updates the the record fields with the params values' do
                patch :update, params: { id: school_spec_record.id, school_specialization: school_spec_params }

                [:school_id, :track_id, :specialization_id, :spots_available].each do |attribute|
                    expect(assigns(:school_specialization).send(attribute)).to eq(school_spec_params[attribute])
                end
            end

            it 'redirects to new_school_specialization_path with a success flash' do
                patch :update, params: { id: school_spec_record.id, school_specialization: school_spec_params }

                expect(response).to redirect_to(new_school_specialization_path)
                expect(flash[:success]).to eq('Updated successfully!')
            end
        end

        context 'with invalid params' do
            let!(:new_school_spec_record) { FactoryBot.create(:school_specialization)}

            before do
                school_spec_params[:spots_available] = -10
            end

            it 'does not update the school specialization record' do
                patch :update, params: {id: new_school_spec_record.id, school_specialization: school_spec_params }

                assigns(:school_specialization).reload
                # By calling reload, you refresh the object's attributes to their values from the database, 
                #effectively discarding any in-memory changes that failed validation.
                expect(assigns(:school_specialization).send(:spots_available)).not_to eq(school_spec_params[:spots_available])
            end

            it 'redirects to new_school_specialization_path with a alert flash' do
                patch :update, params: {id: new_school_spec_record, school_specialization: school_spec_params }

                expect(response).to redirect_to(new_school_specialization_path)
                expect(flash[:alert]).to eq('Update failed!')
            end
        end
    end

    describe 'DELETE #destroy' do
        let!(:new_school_spec_record) { FactoryBot.create(:school_specialization)}

        it 'pulls the specific record by bet id and assigns it to a instance variable' do
            delete :destroy, params: { id: new_school_spec_record.id }

            [:school_id, :track_id, :specialization_id, :spots_available].each do |attribute|
                expect(assigns(:school_specialization).send(attribute)).to eq(new_school_spec_record.send(attribute))
            end
        end

        it 'destroys the SchoolSpecialization record from the table' do
            delete :destroy, params: { id: new_school_spec_record.id }
            # Parentheses () => immediate execution.
            # Curly braces {} => delayed execution in the form of a block, which RSpec can then monitor for raised errors.
            expect {SchoolSpecialization.find(new_school_spec_record.id)}.to raise_error(ActiveRecord::RecordNotFound)
        end

        it 'redirects to new_school_specialization_path with a success flash' do
            delete :destroy, params: { id: new_school_spec_record.id }
            expect(response).to redirect_to(new_school_specialization_path)
            expect(flash[:success]).to eq('Record was successfully deleted.')
        end
    end

    describe 'GET #index' do

        it 'renders the index template' do
            get :index
            expect(response).to render_template(:index)
        end
    end

    describe 'GET #edit' do
        let!(:new_school_spec_record) { FactoryBot.create(:school_specialization) }

        it 'pulls the specific record by bet id and assigns it to a instance variable' do
            get :edit, params: { id: new_school_spec_record.id }
            expect(assigns(:school_specialization).id).to eq(new_school_spec_record.id)
        end

        it 'renders the edit template' do
            get :edit, params: { id: new_school_spec_record.id }
            expect(response).to render_template(:edit)
        end
    end
end