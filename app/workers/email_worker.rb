class EmailWorker
    include Sidekiq::Worker

    def perform
        User.all.each do |user|
            if user.role == "student" && user.preferences.blank?
              puts "Mail sent to: #{user.email}"
              UserMailer.preferences_email(user).deliver
            end
        end
    end
end