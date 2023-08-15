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
                post :create, params: {school_specialization: school_spec_params }

                expect(SchoolSpecialization.last[:school_id]).to eq(School.last.id)  
                expect(SchoolSpecialization.last[:track_id]).to eq(Track.last.id)  
                expect(SchoolSpecialization.last[:specialization_id]).to eq(Specialization.last.id)  
                expect(SchoolSpecialization.last[:spots_available]).to eq(2)
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
        
        context 'with valid params' do
        #TODO CONTINUE FROM HERE     
        end
    end
end