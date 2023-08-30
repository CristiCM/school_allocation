class Users::PasswordsController < Devise::PasswordsController
  skip_before_action :verify_authenticity_token
  
  respond_to :json

  private

  def respond_with(resource, options = {})
    case action_name
    when 'create'
      if resource.respond_to?(:errors) && !resource.errors.empty?
        render json: {
          status: { code: 401, message: resource.errors.full_messages.join(', ') }
        }, status: :unauthorized
      else
        render json: {
          status: { code: 200, message: 'Password reset instructions sent successfully.' }
        }, status: :ok
      end
    when 'update'
      if resource.errors.empty?
        render json: {
          status: { code: 200, message: 'Password updated.' }
        }, status: :ok
      else
        render json: {
          status: { code: 401, message: resource.errors.full_messages }
        }, status: :unauthorized
      end
    else
      super
    end
  end
end
