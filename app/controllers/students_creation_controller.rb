class StudentsCreationController < ApplicationController
    before_action :verify_admin
    require 'sidekiq/api'

    def new
      @student = User.new
    end

    def create
      @student = User.new(student_params)
      @student.password = SecureRandom.hex
      @student.role = "student"

      if @student.save
        @student.send_reset_password_instructions
        redirect_to new_student_path, notice: "User created successfully."
      else
        render :new, status: :unprocessable_entity
      end
    end

    def update
    end

    def overview
    end

    def update_notification
      job = Job.first_or_create

      if params[:job]["first_notification"]

        date_time = ActiveSupport::TimeZone['Bucharest'].parse(params[:job]["first_notification"]).utc
        old_jid = job.first_notification_jid
        job.update(first_notification_jid: update_job(old_jid, date_time, "first_notification"), first_notification_time: date_time.in_time_zone('Bucharest'))

      elsif params[:job]["second_notification"]

        date_time = ActiveSupport::TimeZone['Bucharest'].parse(params[:job]["second_notification"]).utc
        old_jid = job.second_notification_jid
        job.update(second_notification_jid: update_job(old_jid, date_time, "second_notification"), second_notification_time: date_time.in_time_zone('Bucharest'))

      end
      
      redirect_to scheduler_students_path
    end

    def update_allocation
      puts "TODO: STUDENT ALLOCATION METHOD"
      redirect_to scheduler_students_path
    end

    def delete_notification
      job_record = Job.first
      return unless !job_record.nil?

      if params[:first_notification]
        delete_job(job_record.first_notification_jid)
        job_record.update(first_notification_jid: nil, first_notification_time: nil)
      elsif params[:second_notification]
        delete_job(job_record.second_notification_jid)
        job_record.update(second_notification_jid: nil, second_notification_time: nil)
      end

      redirect_to scheduler_students_path
    end

    private

    def student_params
      params.require(:user).permit(:email, :admission_average, :en_average, :ro_grade, :mathematics_grade, :mother_tongue, :mother_tongue_grade, :graduation_average)
    end

    def update_job(jid, new_time, notification_type)
      queue = Sidekiq::ScheduledSet.new
      job = queue.find_job(jid)
      job.delete if job
      EmailWorker.perform_at(new_time, notification_type)
    end

    def delete_job(jid)
      queue = Sidekiq::ScheduledSet.new
      job = queue.find_job(jid)
      job.delete unless job.nil?
    end
  end

  