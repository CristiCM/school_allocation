class EmailWorker
    include Sidekiq::Worker

    ALL_NOTIFICATION_ATTRIBUTES = {
        first_notification:
        {
            email_template: :first_notification_email,
            job_jid_attribute: :first_notification_jid,
            job_time_attribute: :first_notification_time
        },
        second_notification:
        {
            email_template: :second_notification_email,
            job_jid_attribute: :second_notification_jid,
            job_time_attribute: :second_notification_time
        }
    }
    
    def perform(notification_type)
        
        job = Job.first
        students_without_preferences = get_all_students_with_missing_preferences

        ALL_NOTIFICATION_ATTRIBUTES.each do |job_key, job_attributes|
            next unless job_key == notification_type.to_sym

            students_without_preferences.each do |user|
                email = UserMailer.send(job_attributes[:email_template.to_s], user).deliver
                Rails.logger.info "#{email.body.to_s.inspect}"

            end

            job.update(
                job_attributes[:job_jid_attribute] => nil,
                job_attributes[:job_time_attribute] => nil
            ) if :allocation_result_notification_email != job_key
        end

        check_for_allocation_result_notification_email(notification_type)
    end

    

    private
    #TODO: REFACTOR BELOW METHOD
    def check_for_allocation_result_notification_email(notification_type)
        if notification_type == "allocation_result_notification_email"
            Assignment.all.each do |assignment|
                user = assignment.user
                allocation_information = assignment.school_specialization
                
                UserMailer.allocation_result_notification_email(user, assignment.school_specialization_id == 404, allocation_information.display_name).deliver
            end
        end
    end

    def get_all_students_with_missing_preferences
        User.left_joins(:preferences)
          .where(role: 'student')
          .where(preferences: { id: nil })
    end
end