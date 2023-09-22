class AllocationResetWorker
    include Sidekiq::Worker

    def perform
        job_manager = JobManager.new()
        job_manager.destroy_all

        ActiveRecord::Base.transaction do
          Assignment.destroy_all
        end
    end      
end