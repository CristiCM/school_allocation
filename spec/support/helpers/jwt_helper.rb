module JwtHelper
    def generate_jwt_for(user)
      user.update_columns(jti: SecureRandom.uuid)
      Warden::JWTAuth::UserEncoder.new.call(user, :user, nil).first
    end
end