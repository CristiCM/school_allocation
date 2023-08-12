class UserMailer < Devise::Mailer
  include Devise::Controllers::UrlHelpers

  def first_notification_email(user)
    @user = user
    mail(to: @user.email, subject: 'Choose your preferences soon!')
  end

  def second_notification_email(user)
    @user = user
    mail(to: @user.email, subject: 'You need to choose your highschool preferences!')
  end
end
