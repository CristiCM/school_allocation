class ApplicationController < ActionController::Base
    protect_from_forgery unless: -> { request.format.json? }
    rescue_from CanCan::AccessDenied do |exception|
        flash[:alert] = "You do not have access to this page."
        redirect_to root_path
    end
end
