class AllocationResetWorker
    include Sidekiq::Worker

    def perform
        ActiveRecord::Base.transaction do
          Assignment.destroy_all
        end
        Job.first.update(allocation_done: false)
    end      
end