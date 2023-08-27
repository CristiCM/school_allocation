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
        case notification_type.to_sym
        when :first_notification, :second_notification
            process_deadline_notifications(notification_type)
        when :allocation_result_notification_email
            process_allocation_result_notifications(notification_type)
        end
    end

    private

    def process_deadline_notifications(notification_type)
        job = Job.first
        ALL_NOTIFICATION_ATTRIBUTES.each do |job_key, job_attributes|
            next unless job_key == notification_type.to_sym

            User.students_without_preferences.each do |user|
                UserMailer.send(job_attributes[:email_template], user).deliver
            end

            job.update(
                job_attributes[:job_jid_attribute] => nil,
                job_attributes[:job_time_attribute] => nil
            )
        end
    end

    def process_allocation_result_notifications(notification_type)
        Assignment.all.each do |assignment|
            user = assignment.user
            allocation_information = assignment.school_specialization
            UserMailer.allocation_result_notification_email(user, !assignment.unassigned, allocation_information.display_name).deliver
        end
    end
end