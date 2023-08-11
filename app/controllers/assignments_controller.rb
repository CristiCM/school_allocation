class AssignmentsController < ApplicationController
    def new
    end

    def update_notification
        job = Job.first_or_create
  
        if params[:job]["first_notification"]
  
          date_time = ActiveSupport::TimeZone['Bucharest'].parse(params[:job]["first_notification"]).utc
          old_jid = job.first_notification_jid
          job.update(first_notification_jid: update_notification_job(old_jid, date_time, "first_notification"), first_notification_time: date_time.in_time_zone('Bucharest'))
  
        elsif params[:job]["second_notification"]
  
          date_time = ActiveSupport::TimeZone['Bucharest'].parse(params[:job]["second_notification"]).utc
          old_jid = job.second_notification_jid
          job.update(second_notification_jid: update_notification_job(old_jid, date_time, "second_notification"), second_notification_time: date_time.in_time_zone('Bucharest'))
  
        end
        
        redirect_to scheduler_assignments_path
    end
  
    def delete_notification
        job_record = Job.first
        return unless !job_record.nil?
  
        if params[:first_notification]
          delete_notification_job(job_record.first_notification_jid)
          job_record.update(first_notification_jid: nil, first_notification_time: nil)
        elsif params[:second_notification]
          delete_notification_job(job_record.second_notification_jid)
          job_record.update(second_notification_jid: nil, second_notification_time: nil)
        end
  
        redirect_to scheduler_assignments_path
    end

    def update_allocation
      job = Job.first_or_create

      date_time = ActiveSupport::TimeZone['Bucharest'].parse(params[:job]["allocation_date"]).utc
      old_jid = job.allocation_date_jid
      sorted_students_ids = User.get_allocation_sorted_student_ids

      job.update(allocation_date_jid: update_allocation_job(old_jid, date_time, sorted_students_ids), allocation_time: date_time.in_time_zone('Bucharest'))

      redirect_to scheduler_assignments_path
    end

    private

    def update_notification_job(jid, new_time, notification_type)
      queue = Sidekiq::ScheduledSet.new
      job = queue.find_job(jid)
      job.delete if job
      EmailWorker.perform_at(new_time, notification_type)
    end

    def delete_notification_job(jid)
      queue = Sidekiq::ScheduledSet.new
      job = queue.find_job(jid)
      job.delete unless job.nil?
    end

    def update_allocation_job(old_jid, new_time, sorted_students)
      queue = Sidekiq::ScheduledSet.new
      job = queue.find_job(old_jid)
      job.delete if job
      AllocationWorker.perform_at(new_time, sorted_students)
    end
end