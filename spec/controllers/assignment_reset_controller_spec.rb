require 'rails_helper'
require 'sidekiq/testing'
RSpec.describe AssignmentsResetController, type: :controller do

    let(:admin) { create(:user, role: 'admin') }

    before do
        sign_in admin
    end

    describe 'DELETE #destroy' do

        context 'if the student allocation is done' do
            let!(:school_specialization) { create(:school_specialization, spots_available: 15) }
            let!(:assignments) { create_list(:assignment, 15, school_specialization_id: school_specialization.id) }
            let!(:job) { create(:job, allocation_done: true) }

            before do
                Sidekiq::Testing.inline!
            end

            it 'returns a 202 status' do
                delete :destroy, params: { id: 1 }
                expect(response).to have_http_status(202)
            end

            it 'destorys all the assignments' do
                delete :destroy, params: { id: 1 }
                expect(Assignment.count).to eq(0)
            end

            it 'sets the job allocation_done attribute to false' do
                delete :destroy, params: { id: 1 }
                expect(Job.first.allocation_done).to eq(false)
            end

            it 'restores the school_specialization spots_available attribute to the initial count' do
                delete :destroy, params: { id: 1 }
                expect(school_specialization.spots_available).to eq(15)
            end
        end

        context "if the student allocation isn't done" do
            before do
                delete :destroy, params: { id:1 }
            end

            it 'returns a 404 status' do
                expect(response).to have_http_status(404)
            end
        end
    end
end