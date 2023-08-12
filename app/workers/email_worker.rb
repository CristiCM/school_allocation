class EmailWorker
    include Sidekiq::Worker

    #TODO: CREATE A NEW MAILER TEMPLATE FOR FIRST/SECOND NOTIFICATION
    def perform(notification_type)
        User.all.each do |user|
            if user.role == "student" && user.preferences.blank?
              puts "\n\nMail sent to: #{user.email}\n\n"
              UserMailer.preferences_email(user).deliver
            end
        end

        if notification_type == "first_notification"
            Job.first.update(first_notification_jid: nil, first_notification_time: nil)
        elsif notification_type == "second_notification"
            Job.first.update(second_notification_jid: nil, second_notification_time: nil)
        end
    end
end