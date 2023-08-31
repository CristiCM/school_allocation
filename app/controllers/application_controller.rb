class ApplicationController < ActionController::Base
    protect_from_forgery unless: -> { request.format.json? }
    rescue_from CanCan::AccessDenied do |exception|
        render json: { error: "Access Denied!" }, status: 403
    end      
end
