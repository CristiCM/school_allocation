require 'rails_helper'
#TODO: FIX TESTS HERE:

RSpec.describe AssignmentsController, type: :controller do
    let!(:admin) { FactoryBot.create(:user, role: 'admin') }
    let!(:job_manager) { double('JobManager') }

    before do
        sign_in admin
        allow(JobManager).to receive(:new).and_return(job_manager)
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

        before do
            allow(job_manager).to receive(:create)
        end

        it 'creates a new JobManager and calls the create method' do
            post :create, params: { job: fake_params }
            
            expect(JobManager).to have_received(:new)
            expect(job_manager).to have_received(:create)
        end

        context 'with valid params' do
            before do
                allow(job_manager).to receive(:create).and_return(true)
            end

            it 'it displays a success flash message' do
                post :create, params: { job: fake_params }
                expect(flash[:success]).to eq('Job created successfully!')
            end
        end

        context 'with invalid params' do
            before do
                allow(job_manager).to receive(:create).and_return(false)
            end

            it 'it displays a alert flash message' do
                post :create, params: { job: fake_params }
                expect(flash[:alert]).to eq('Please select a date first!')
            end
        end

        it 'redirects to new_assignment_path' do
            post :create, params: { job: fake_params }
            expect(response).to redirect_to(new_assignment_path)
        end
    end

    describe 'DELETE #destroy' do
        let(:fake_assignment) { double('Assignment') }
        let(:fake_params) { { id: 1, type: "SomeType" } }
    
        before do
            allow(Assignment).to receive(:find).and_return(fake_assignment)
            allow(job_manager).to receive(:destroy)
        end

        it 'creates a new JobManager and calls the destroy method' do
            delete :destroy, params: fake_params

            expect(JobManager).to have_received(:new)
            expect(job_manager).to have_received(:destroy)
        end

        context "with valid params" do
            before do
                allow(job_manager).to receive(:destroy).and_return(true)
            end

            it 'redirects to new_assignment_path with success flash' do
                delete :destroy, params: fake_params
                expect(flash[:success]).to eq('Job deleted successfully!')
            end
        end

        context "with invalid params" do
            before do
                allow(job_manager).to receive(:destroy).and_return(false)
            end

            it 'redirects to new_assignment_path with success flash' do
                delete :destroy, params: fake_params
                expect(flash[:alert]).to eq("There's nothing to delete!")
            end
        end
        
        it 'redirects to new_assignment_path' do
            delete :destroy, params: fake_params
            expect(response).to redirect_to(new_assignment_path)
        end
    end
end