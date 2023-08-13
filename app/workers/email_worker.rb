class EmailWorker
    include Sidekiq::Worker

    ALL_NOTIFICATION_ATTRIBUTES = {
        "first_notification" =>
        {
            email_template: :first_notification_email,
            job_jid_attribute: :first_notification_jid,
            job_time_attribute: :first_notification_time
        },
        "second_notification" =>
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
            next unless job_key == notification_type

            students_without_preferences.each do |user|
                UserMailer.send(job_attributes[:email_template], user).deliver
                puts "\n\n#{notification_type} sent to: #{user.email}\n\n"
            end

            job.update(
                job_attributes[:job_jid_attribute] => nil,
                job_attributes[:job_time_attribute] => nil
            )
        end
    end

    private

    def get_all_students_with_missing_preferences
        User.left_joins(:preferences)
          .where(role: 'student')
          .where(preferences: { id: nil })
    end
end