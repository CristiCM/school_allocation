class Users::SessionsController < Devise::SessionsController
  skip_before_action :verify_authenticity_token
  respond_to :json

  private

  def respond_with(resource, options = {})
    render_response('Logged in successfully.', :ok, UserSerializer.new(resource).serializable_hash[:data][:attributes])
  end

  def respond_to_on_destroy
    auth_header = request.headers['Authorization']
    
    if auth_header.blank?
      render_response("No authentification header provided.", :not_found)
    end

    token = auth_header.split(' ')[1]

    if token.blank?
      render_response("Invalid authorization provided.", :bad_request)
    end

    jwt_payload = JWT.decode(token, ENV['DEVISE_JWT_SECRET_KEY'])
    payload = jwt_payload[0]
    current_user = User.find(payload['sub'])

    if current_user
      render_response("Logged out successfully.", :ok)
    else
      render_response("Couldn't find an active session.", :not_found)
    end
  end

  private

  def render_response(message = "Success", status = :ok, data_structure = {})
    render json: {
      status: {code: Rack::Utils::SYMBOL_TO_STATUS_CODE[status], message: message},
      data: data_structure
    }, status: status
  end

end
