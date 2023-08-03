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

    def update_first_notification
      date_time = convert_params_to_date(params, 'first_notification')
      job = Job.first_or_create
      old_jid = job.first_notification_jid
      job.update(first_notification_jid: update_job(old_jid, date_time), first_notification_time: date_time.in_time_zone('Bucharest'))
      redirect_to scheduler_students_path
    end
    

    def update_second_notification
      date_time = convert_params_to_date(params, 'second_notification')
      job = Job.first_or_create
      old_jid = job.second_notification_jid
      job.update(second_notification_jid: update_job(old_jid, date_time), second_notification_time: date_time.in_time_zone('Bucharest'))
      redirect_to scheduler_students_path
    end  

    def update_allocation
      puts "TODO: STUDENT ALLOCATION METHOD"
    end

    private

    def student_params
      params.require(:user).permit(:email, :admission_average, :en_average, :ro_grade, :mathematics_grade, :mother_tongue, :mother_tongue_grade, :graduation_average)
    end

    def update_job(jid, new_time)
      queue = Sidekiq::ScheduledSet.new
      job = queue.find_job(jid)
      job.delete if job
      EmailWorker.perform_at(new_time)
    end

    def convert_params_to_date(params, notification_type)
      year = params[:job]["#{notification_type}(1i)"].to_i
      month = params[:job]["#{notification_type}(2i)"].to_i
      day = params[:job]["#{notification_type}(3i)"].to_i
      hour = params[:job]["#{notification_type}(4i)"].to_i
      minute = params[:job]["#{notification_type}(5i)"].to_i
      puts "Year: #{year}, Month: #{month}, Day: #{day}, Hour: #{hour}, Minute: #{minute}"
      date = ActiveSupport::TimeZone['Bucharest'].parse("#{year}-#{month}-#{day} #{hour}:#{minute}").utc
      puts date
      date
    end
    
    
  end

  