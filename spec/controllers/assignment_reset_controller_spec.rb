require 'rails_helper'

RSpec.describe AssignmentsResetController, type: :controller do

    let(:admin) { create(:user, role: 'admin') }

    before do
        sign_in admin
    end

    describe 'DELETE #destroy' do
        let!(:school_specialization) { create(:school_specialization, spots_available: 15) }
        let!(:assignments) { create_list(:assignment, 15, school_specialization_id: school_specialization.id) }
        let!(:job) { create(:job, allocation_done: true) }

        before do
            delete :destroy, params: { id: 'dummy' }
        end

        it 'destorys all the assignments' do
            expect(Assignment.all.count).to eq(0)
        end

        it 'sets the job allocation_done attribute to false' do
            expect(Job.first.allocation_done).to eq(false)
        end

        it 'restores the school_specialization spots_available attribute to the initial count' do
            expect(school_specialization.spots_available).to eq(15)
        end
    end
end