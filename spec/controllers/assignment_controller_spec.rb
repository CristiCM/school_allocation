require 'rails_helper'

RSpec.describe AssignmentsController, type: :controller do
    let!(:admin) { FactoryBot.create(:user, role: 'admin') }
    let!(:job_manager) { double('JobManager') }

    before do
        sign_in admin
        allow(JobManager).to receive(:new).and_return(job_manager)
        allow(job_manager).to receive(:create)
        allow(job_manager).to receive(:destroy)
    end

    describe 'GET #new' do
        it 'renders the new template' do
            get :new
            expect(response).to render_template(:new)
        end
    end

    describe 'GET #index' do
        it 'renders the index template' do
            get :index
            expect(response).to render_template(:index)
        end
    end

    describe 'POST #create' do
        let(:fake_params) { {id: 1, type: "SomeType", first_notification: "Dummy", second_notification: "Dummy", allocation_date: "Dummy" } }

        it 'creates a new JobManager and calls the create method' do
            post :create, params: { job: fake_params }
            
            expect(JobManager).to have_received(:new)
            expect(job_manager).to have_received(:create)
        end

        it 'redirects to new_assignment_path with a success flash' do
            post :create, params: { job: fake_params }

            expect(response).to redirect_to(new_assignment_path)
            expect(flash[:success]).to eq('Job created successfully!')
        end    
    end

    describe 'DELETE #destroy' do
        let(:fake_assignment) { double('Assignment') }
        let(:fake_params) { { id: 1, type: "SomeType" } }
    
        before do
            allow(Assignment).to receive(:find).and_return(fake_assignment)
        end

        it 'creates a new JobManager and calls the destroy method' do
            delete :destroy, params: fake_params

            expect(JobManager).to have_received(:new)
            expect(job_manager).to have_received(:destroy)
        end

        it 'redirects to new_assignment_path with success flash' do
            delete :destroy, params: fake_params

            expect(response).to redirect_to(new_assignment_path)
            expect(flash[:success]).to eq('Job deleted successfully!')
        end
    end
end