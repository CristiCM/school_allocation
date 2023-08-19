require 'rails_helper'

RSpec.describe JobManager do
  FactoryBot.create(:job)

  describe "#create" do
    context 'with invalid params (no data present)' do
      let(:params) { { first_notification: nil, second_notification: nil, allocation_date: nil } }

      it 'returns false' do
        expect(JobManager.new(params).create).to eq(false)
      end
    end

    context 'with valid params' do
      context 'when first_notification is provided' do
        let(:params) { { first_notification: '2024-01-01 12:00:00', second_notification: nil, allocation_date: nil } }

        before do
          allow(EmailWorker).to receive(:perform_at).and_return('new_f_n_jid')
        end

        it 'creates a first notification sidekiq job' do
          JobManager.new(params).create
          expect(EmailWorker).to have_received(:perform_at).with(
            Time.zone.parse('2024-01-01 12:00:00').utc,
            'first_notification'
          )
        end

        it 'updates the Job first notification columns with the new JID and Time' do
          JobManager.new(params).create
          expect(Job.first[:first_notification_jid]).to eq('new_f_n_jid')
          expect(Job.first[:first_notification_time]).to eq(Time.zone.parse('2024-01-01 12:00:00'))
        end

        it 'returns true' do
          expect(JobManager.new(params).create).to eq(true)
        end
      end

      context 'when second_notification is provided' do
        let(:params) { { first_notification: nil, second_notification: '2024-02-02 12:00:00', allocation_date: nil } }

        before do
          allow(EmailWorker).to receive(:perform_at).and_return('new_s_n_jid')
        end

        it 'creates a second notification sidekiq job' do
          JobManager.new(params).create
          expect(EmailWorker).to have_received(:perform_at).with(
            Time.zone.parse('2024-02-02 12:00:00'),
            'second_notification'
          )
        end

        it 'updates the Job second notification columns with the new JID and Time' do
          JobManager.new(params).create
          expect(Job.first[:second_notification_jid]).to eq('new_s_n_jid')
          expect(Job.first[:second_notification_time]).to eq(Time.zone.parse('2024-02-02 12:00:00'))
        end

        it 'returns true' do
          expect(JobManager.new(params).create).to eq(true)
        end
      end

      context 'when allocation_date is provided' do
        let(:params) { { first_notification: nil, second_notification: nil, allocation_date: '2024-03-03 12:00:00' } }

        before do
          allow(AllocationWorker).to receive(:perform_at).and_return('new_alloc_jid')
          allow(User).to receive(:get_allocation_sorted_student_ids).and_return([5, 3, 2, 4, 1])
        end

        it 'creates an allocation sidekiq job' do
          JobManager.new(params).create
          expect(AllocationWorker).to have_received(:perform_at).with(
            Time.zone.parse('2024-03-03 12:00:00'),
            [5, 3, 2, 4, 1]
          )
        end

        it 'updates the Job allocation columns with the new JID and Time' do
          JobManager.new(params).create
          expect(Job.first[:allocation_date_jid]).to eq('new_alloc_jid')
          expect(Job.first[:allocation_time]).to eq(Time.zone.parse('2024-03-03 12:00:00'))
        end

        it 'returns true' do
          expect(JobManager.new(params).create).to eq(true)
        end
      end
    end
  end

  describe '#destroy' do
    context "with invalid params" do
      let(:params) { { id: 1, type: 'invalid attribute key' } }

      it 'returns false' do
        expect(JobManager.new(params).destroy).to eq(false)
      end
    end

    context "with valid params" do
      context 'when first notification is provided' do
        let(:params) { { id: 1, type: 'first_notification' } }

        it 'deletes the sidekiq job if exists and deletes the Job record fields for first notification' do
          expect(Job.first[:first_notification_jid]).not_to eq(nil)
          expect(Job.first[:first_notification_time]).not_to eq(nil)
          JobManager.new(params).destroy
          expect(Job.first[:first_notification_jid]).to eq(nil)
          expect(Job.first[:first_notification_time]).to eq(nil)
        end

        it 'returns true' do
          expect(JobManager.new(params).destroy).to eq(true)
        end
      end

      context 'when second notification is provided' do
        let(:params) { { id: 1, type: 'second_notification' } }

        it 'deletes the sidekiq job if exists and deletes the Job record fields for second notification' do
          expect(Job.first[:second_notification_jid]).not_to eq(nil)
          expect(Job.first[:second_notification_time]).not_to eq(nil)
          JobManager.new(params).destroy
          expect(Job.first[:second_notification_jid]).to eq(nil)
          expect(Job.first[:second_notification_time]).to eq(nil)
        end

        it 'returns true' do
          expect(JobManager.new(params).destroy).to eq(true)
        end
      end

      context 'when allocation date is provided' do
        let(:params) { { id: 1, type: 'allocation_date' } }

        it 'deletes the sidekiq job if exists and deletes the Job record fields for allocation date' do
          expect(Job.first[:allocation_date_jid]).not_to eq(nil)
          expect(Job.first[:allocation_time]).not_to eq(nil)
          JobManager.new(params).destroy
          expect(Job.first[:allocation_date_jid]).to eq(nil)
          expect(Job.first[:allocation_time]).to eq(nil)
        end

        it 'returns true' do
          expect(JobManager.new(params).destroy).to eq(true)
        end
      end
    end
  end
end
