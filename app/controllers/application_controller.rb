class ApplicationController < ActionController::Base
  protect_from_forgery unless: -> { request.format.json? || request.content_type == "multipart/form-data" }

  rescue_from CanCan::AccessDenied do |exception|
    render json: {}, status: :forbidden
  end

  protected

  def authenticate_request
    if current_user.nil?
      render json: {}, status: :unauthorized
      return
    end
  end

  def current_user
    @current_user ||= begin
      token = request.headers['Authorization']&.split(' ')[1]
      return nil unless token

      jwt_payload = JWT.decode(token, ENV['DEVISE_JWT_SECRET_KEY']) rescue nil
      return nil unless jwt_payload

      payload = jwt_payload[0]
      User.find_by(id: payload['sub'])
    end
  end    

  def set_job
    @job = Job.first
    unless @job
      render json: {}, status: :not_found
      return
    end
  end
end
