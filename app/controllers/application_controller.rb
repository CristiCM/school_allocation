class ApplicationController < ActionController::Base
    rescue_from CanCan::AccessDenied do |exception|
        flash[:alert] = "You do not have access to this page."
        redirect_to root_path
    end
end
