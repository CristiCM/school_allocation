class ApplicationController < ActionController::Base
  protect_from_forgery unless: -> { request.format.json? || request.content_type == "multipart/form-data" }

  rescue_from CanCan::AccessDenied do |exception|
    render_error("You don't have access on this page!", :forbidden)
  end

  protected

  def authenticate_request
    if current_user.nil?
      render_error("Invalid or missing token.", :unauthorized)
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

  def render_success(message = "Success", status = :ok, data_structure = {})
    render json: {
      status: {code: Rack::Utils::SYMBOL_TO_STATUS_CODE[status], message: message},
      data: data_structure
    }, status: status
  end
      
  def render_error(message = "Error", status = :bad_request)
    render json: {
      status: {code: Rack::Utils::SYMBOL_TO_STATUS_CODE[status], message: message}
    }, status: status
  end

  def set_job
    @job = Job.first
    unless @job
      render_error("Job record does not exist", :not_found)
      return
    end
  end
end
