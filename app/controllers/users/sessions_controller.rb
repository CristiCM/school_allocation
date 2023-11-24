class Users::SessionsController < Devise::SessionsController
  skip_before_action :verify_authenticity_token
  respond_to :json

  def refresh_jwt
    refresh_token = cookies[:refresh_token]

    if refresh_token.blank?
      render json: {}, status: :bad_request
      return
    end

    encrypted_token = Digest::SHA256.hexdigest(refresh_token)
    current_user = User.find_by(refresh_token: encrypted_token)

    if current_user && current_user.refresh_token_expires_at > Time.now
      current_user.update_columns(jti: SecureRandom.uuid)
      new_jwt = Warden::JWTAuth::UserEncoder.new.call(current_user, :user, nil).first
      render json: {
        new_jwt_token: new_jwt
      }, status: :ok
    else
      render json: {}, status: :unauthorized
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
      expires: 7.days,
    }
    sign_out resource
    render json: {
      id: resource.id,
      email: resource.email,
      admission_average: resource.admission_average,
      en_average: resource.en_average,
      ro_grade: resource.ro_grade,
      mathematics_grade: resource.mathematics_grade,
      mother_tongue: resource.mother_tongue,
      mother_tongue_grade: resource.mother_tongue_grade,
      graduation_average: resource.graduation_average,
      role: resource.role
    }, status: :ok
  end


  def respond_to_on_destroy
    auth_header = request.headers['Authorization']
    
    if auth_header.blank?
      render json: {}, status: :not_found
      return
    end

    token = auth_header.split(' ')[1]

    if token.blank?
      render json: {}, status: :bad_request
      return
    end

    jwt_payload = JWT.decode(token, ENV['DEVISE_JWT_SECRET_KEY'])
    payload = jwt_payload[0]
    current_user = User.find(payload['sub'])

    if current_user
      render json: {}, status: :ok
      current_user = nil
    else
      ren
      render json: {}, status: :not_found
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
end
