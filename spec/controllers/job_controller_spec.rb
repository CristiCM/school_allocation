require 'rails_helper'
require 'sidekiq/testing'

RSpec.describe JobsController, type: :controller do
    let!(:admin) { create(:user, role: 'admin')}

    before do
        sign_in admin
        Sidekiq::Testing.inline!
    end
    
    describe "POST #create" do
        context 'if the allocation is done' do
            before do
                Job.create(allocation_done: true)
            end

            it 'returns a 422 status for first_notification' do
                post :create, params: {job: {first_notification: "2023-09-02 23:45:00"}}
                expect(response).to have_http_status(422)
            end  

            it 'returns a 422 status for second_notification' do
                post :create, params: {job: {second_notification: "2023-09-02 23:45:00"}}
                expect(response).to have_http_status(422)
            end  

            it 'returns a 422 status for allocation_date' do
                post :create, params: {job: {allocation_date: "2023-09-02 23:45:00"}}
                expect(response).to have_http_status(422)
            end  
        end

        context 'if the allocation is not done with valid params' do
            before do
                Job.create()
            end

            it 'returns a 201 status for first_notification' do
                post :create, params: {job: {first_notification: "2023-09-02 23:45:00"}}
                expect(response).to have_http_status(201)
            end  

            it 'returns a 201 status for second_notification' do
                post :create, params: {job: {second_notification: "2023-09-02 23:45:00"}}
                expect(response).to have_http_status(201)
            end  

            it 'returns a 201 status for allocation_date' do
                post :create, params: {job: {allocation_date: "2023-09-02 23:45:00"}}
                expect(response).to have_http_status(201)
            end 

            it 'stores the job jid and time in the Job model for first_notification' do
                post :create, params:{job: {first_notification: "2023-09-02 23:45:00"}}
                expect(Job.first.first_notification_jid).not_to eq(nil)  
                expect(Job.first.first_notification_time).not_to eq(nil)
            end
            
            it 'stores the job jid and time in the Job model for second_notification' do
                post :create, params:{job: {second_notification: "2023-09-02 23:45:00"}}
                expect(Job.first.second_notification_jid).not_to eq(nil)  
                expect(Job.first.second_notification_time).not_to eq(nil)
            end

            it 'stores the job jid and time in the Job model for allocation_date' do
                post :create, params:{job: {allocation_date: "2023-09-02 23:45:00"}}
                expect(Job.first.allocation_date_jid).not_to eq(nil)  
                expect(Job.first.allocation_time).not_to eq(nil)
            end

            it 'returns the job information with the proper attributes' do
                post :create, params:{job: {first_notification: "2023-09-02 23:45:00"}}
                parsed_response = JSON.parse(response.body)
                job = parsed_response["data"]["job"]

                expect(job.keys).to match_array([
                    "first_notification_time",
                    "second_notification_time",
                    "allocation_time",
                    "allocation_done"
                ])
            end
        end

        context 'with invalid params' do
            it 'returns a 404 status' do
                post :create, params: { job: {something: "something"} }
                expect(response).to have_http_status(404)
            end
        end  
    end

    describe "DELETE #destroy" do
        context 'with invalid id param' do
            it 'returns a 404 status' do
                delete :destroy, params: { id: -1 }
                expect(response).to have_http_status(404)
            end
        end

        context 'with valid id param' do
            let!(:job) { Job.create(first_notification_time: DateTime.now, second_notification_time: DateTime.now, allocation_time: DateTime.now) }
        
            describe 'removing the first_notification' do
                it 'sets first_notification to nil' do
                    delete :destroy, params: { id: job.id, type: 'first_notification' }
                    job.reload
                    expect(job.first_notification_time).to be_nil
                end
            end
        
            describe 'removing the second_notification' do
                it 'sets second_notification to nil' do
                    delete :destroy, params: { id: job.id, type: 'second_notification' }
                    job.reload
                    expect(job.second_notification_time).to be_nil
                end
            end
        
            describe 'removing the allocation_date' do
                it 'sets allocation_date to nil' do
                    delete :destroy, params: { id: job.id, type: 'allocation_date' }
                    job.reload
                    expect(job.allocation_time).to be_nil
                end
            end
        
            it 'returns a 200 status' do
                delete :destroy, params: { id: job.id, type: 'first_notification' }
                expect(response).to have_http_status(200)
            end
        end         
    end
    


    describe "GET #show" do
        let!(:job) { Job.create() }
    
        it 'returns the job information' do
            get :show, params: { id: job.id }
            parsed_response = JSON.parse(response.body)
            job_data = parsed_response["data"]["job"]
    
            expect(job_data.keys).to match_array([
                "first_notification_time",
                "second_notification_time",
                "allocation_time",
                "allocation_done"
            ])
        end
    
        it 'returns a 200 status' do
            get :show, params: { id: job.id }
            expect(response).to have_http_status(200)
        end
    end
end