require 'rails_helper'
require 'sidekiq/testing'
Sidekiq::Testing.fake!

RSpec.describe AllocationWorker, type: :worker do
  describe "#perform" do
    let(:student1) { create(:user) }
    let(:student2) { create(:user) }
    let(:student3) { create(:user) }
    let!(:specialization1) { create(:school_specialization, spots_available: 1) }
    let!(:specialization2) { create(:school_specialization, spots_available: 1) }
    let!(:job) { Job.create! }

    before do
      create(:preference, user: student1, school_specialization: specialization2, priority: 1)
      create(:preference, user: student1, school_specialization: specialization1, priority: 2)
      create(:preference, user: student2, school_specialization: specialization1, priority: 1)
      create(:preference, user: student3, school_specialization: specialization1, priority: 1)
    end

    context 'if enough spaces available' do

      it "allocates students based on their preferences and available spots" do
        AllocationWorker.new.perform([student1.id, student2.id])

        expect(Assignment.where(user: student1, school_specialization: specialization2)).to exist
        expect(Assignment.where(user: student2, school_specialization: specialization1)).to exist

        expect(specialization1.reload.spots_available).to eq(0)
      end

      it "updates the job attributes after allocation" do
        AllocationWorker.new.perform([student1.id, student2.id])
        
        job.reload
        expect(job.allocation_date_jid).to be_nil
        expect(job.allocation_time).to be_nil
      end
    end

    context "if there aren't enough spaces available" do
      it 'does not assign the student with a school_specialization_id butwith a unassigned_ID' do
        AllocationWorker.new.perform([student1.id, student2.id, student3.id])

        expect(Assignment.find_by(user: student3)).not_to be_nil 
        expect(Assignment.find_by(user: student3).unassigned).to eq(true)  
      end
    end
  end
end
