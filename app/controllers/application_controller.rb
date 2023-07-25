class ApplicationController < ActionController::Base
    
    def verify_admin
        unless current_user && current_user.role == 'admin'
            redirect_to root_path, alert: 'You do not have access to this page.'
        end
    end
end
