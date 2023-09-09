class Users::SessionsController < Devise::SessionsController
  skip_before_action :verify_authenticity_token
  respond_to :json

  def refresh_jwt
    refresh_token = cookies[:refresh_token]
    return render_response('No refresh token provided.', :bad_request) if refresh_token.blank?

    encrypted_token = Digest::SHA256.hexdigest(refresh_token)
    current_user = User.find_by(refresh_token: encrypted_token)

    if current_user && current_user.refresh_token_expires_at > Time.now
      current_user.update_columns(jti: SecureRandom.uuid)
      new_jwt = Warden::JWTAuth::UserEncoder.new.call(current_user, :user, nil).first
      render_response('JWT refreshed successfully!', :ok, {new_jwt_token: new_jwt})
    else
      render_response('Refresh token expired!', :unauthorized)
    end
  end


  private

  def respond_with(resource, options = {})
    new_refresh_token = generate_refresh_token_for(resource)

    # Set the refresh token as an HttpOnly cookie
    cookies[:refresh_token] = {
      value: new_refresh_token,
      httponly: true,
      secure: Rails.env.production?,
      expires: 7.days
    }

    render_response('Logged in successfully.', :ok)
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

  def generate_refresh_token_for(current_user)
    raw_token = SecureRandom.hex(24)
    encrypted_token = Digest::SHA256.hexdigest(raw_token)
    
    if current_user.update_columns(refresh_token: encrypted_token, refresh_token_expires_at: Time.now + 1.month)
      raw_token
    else
      Rails.logger.error("Failed to update user refresh token: #{current_user.errors.full_messages.join(", ")}")
      nil
    end
  end  

  def render_response(message = "Success", status = :ok, data_structure = {})
    render json: {
      status: {code: Rack::Utils::SYMBOL_TO_STATUS_CODE[status], message: message},
      data: data_structure
    }, status: status
  end
end
