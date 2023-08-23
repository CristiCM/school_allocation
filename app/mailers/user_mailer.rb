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

  def allocation_result_notification_email(user, assigned, allocation_information)
    @user = user
    @assigned = assigned
    @allocation_information = allocation_information
    mail(to: @user.email, subject: 'The repartizations are done. View to see the results!' )
  end
end
