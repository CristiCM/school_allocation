class UserMailer < Devise::Mailer
  include Devise::Controllers::UrlHelpers

  def preferences_email(user)
    @user = user
    mail(to: @user.email, subject: 'Choose your preferences soon!')
  end
end
