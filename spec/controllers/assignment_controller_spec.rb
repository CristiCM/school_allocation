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

        let!(:first_user) { create(:user)}
        let!(:second_user) { create(:user)}

        it 'creates a @users instance variable with all preferenceless students' do
            get :new

            expect(assigns(:users).first.id).to eq(first_user.id)
            expect(assigns(:users).last.id).to eq(second_user.id)
        end

        it 'renders the new template' do
            get :new
            expect(response).to render_template(:new)
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

        context 'when the allocation is already done' do
            it 'displays a alert flash message' do
                Job.first.update( allocation_done: true )
                post :create, params: { job: fake_params }
                expect(flash[:alert]).to eq('The allocation is already done!')
            end  
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
    
    describe 'GET #index' do
        # SINGLE ATTRIBUTE SORTING SO FROM TIME TO TIME, IF TIEBRAKERS == IT MIGHT
        # BE A ORDER ISSUE.
        
        let!(:assignments) {create_list(:assignment, 30)}

        context 'default sorting' do

            before do
                get :index
            end

            it 'sets default sorting parameters' do
                expect(assigns(:sort_by)).to eq('users.admission_average')
                expect(assigns(:order)).to eq('DESC')
            end

            it 'grabs and orders the assignments' do
                expect(assigns(:assignments)).to eq((assignments.sort_by { |a| a.user.admission_average }).reverse.first(10))
            end

            it 'paginates assignments' do
                # a simple count uses a SQL query and returns everything from assignments
                # not keeping count of the pagination so a .to_a is used.
                expect(assigns(:assignments).to_a.count).to eq(10)
            end

            it 'renders the index template' do
                expect(response).to render_template(:index)
            end
        end

        context 'custom sorting' do

            let(:sort_by) { 'users.ro_grade' }
            let(:order) { 'ASC' }

            before do
                get :index, params: { sort_by: sort_by, order: order }
            end

            it 'sets custom sorting parameters' do
                expect(assigns(:sort_by)).to eq(sort_by)
                expect(assigns(:order)).to eq(order)
            end

            it 'grabs and orders the assignments' do
                expect(assigns(:assignments)).to eq((assignments.sort_by { |a| a.user.ro_grade }).first(10))
            end

            it 'paginates assignments limiting them to 10' do
                expect(assigns(:assignments).to_a.count).to eq(10)
            end

            it 'renders the index template' do
                expect(response).to render_template(:index)
            end
        end
    end

    describe 'GET #download' do

        let!(:assignments) { create_list(:assignment, 10) }
        before do
            get :download, format: :xlsx
        end

        it 'returns a succesful response' do
            expect(response).to be_successful
        end
    end
end