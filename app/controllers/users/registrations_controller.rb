# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  skip_before_action :verify_authenticity_token
  
  respond_to :json

  private

  def respond_with(resource, options = {})
    if resource.respond_to?(:errors) && !resource.errors.empty?
      render json: {
        status: { code: 200, message: 'Credentials updated.' }
        }, status: :ok
    else
      render json: {
        status: { code: 401, message: resource.errors.full_messages }
        }, status: :unauthorized
    end
  end
end
