require 'rails_helper'
require 'sidekiq/testing'
Sidekiq::Testing.fake! # Fake Sidekiq so jobs don't get executed immediately

RSpec.describe EmailWorker, type: :worker do
  describe "#perform" do
    let!(:students_without_preferences) { create_list(:user, 3, role: 'student') }
    let!(:students_with_preferences) do 
      create_list(:user, 2, role: 'student').each { |u| create(:preference, user: u) }
    end
    let!(:job) { Job.create! } # Assuming some default attributes

    before do
      # stub the send method on UserMailer, and then further stub the deliver method on whatever send returns.
      allow(UserMailer).to receive_message_chain(:send, :deliver)
    end

    context "with first_notification" do

      it "sends emails and updates job attributes" do
        expect(UserMailer).to receive(:send).with(:first_notification_email, kind_of(User)).exactly(3).times

        EmailWorker.new().perform("first_notification")
        
        job.reload
        expect(job.first_notification_jid).to be_nil
        expect(job.first_notification_time).to be_nil
      end
    end

    context "with second_notification" do

      it "sends emails and updates job attributes" do
        expect(UserMailer).to receive(:send).with(:second_notification_email, kind_of(User)).exactly(3).times

        EmailWorker.new().perform("second_notification")
        
        job.reload
        expect(job.second_notification_jid).to be_nil
        expect(job.second_notification_time).to be_nil
      end
    end

    context "with allocation_result_notification_email" do
      
      let!(:assignments) { create_list(:assignment, 3) }

      before do
        allow(UserMailer).to receive_message_chain(:allocation_result_notification_email, :deliver)
      end
      
      it 'sends an email for each assignment' do
        EmailWorker.new().perform(:allocation_result_notification_email)

        assignments.each do |assignment|
          user = assignment.user
          allocation_information = assignment.school_specialization

          expect(UserMailer).to have_received(:allocation_result_notification_email).with(user, !assignment.unassigned, allocation_information.display_name)
        end
      end
    end

  end
end
