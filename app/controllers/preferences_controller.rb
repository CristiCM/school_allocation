class PreferencesController < ApplicationController
    def new
        session[:add_new_preference] = 1 if session[:add_new_preference].nil?

        if current_user.preferences.count != session[:add_new_preference]
            (session[:add_new_preference] - current_user.preferences.count).times { current_user.preferences.build }
        end
    end

    def add_new
        session[:add_new_preference] += 1
        redirect_to new_preference_path
    end

    def create
        Rails.logger.debug "Raw params: #{params.inspect}"
  
        preferences_params = params.require(:user).permit(preferences: [:school_specialization_id, :priority])
        
        Rails.logger.debug "Processed params: #{preferences_params.inspect}"

        preferences_params[:preferences].each do |preference_params|
          preference = current_user.preferences.find_or_initialize_by(school_specialization_id: preference_params[:school_specialization_id])
          preference.update(preference_params)
        end
      
        redirect_to new_preference_path, notice: 'Preferences updated successfully.'
      rescue ActiveRecord::RecordInvalid
        render :new, status: :unprocessable_entity
    end
           
    
    def destroy
        current_user.preferences.destroy_all
        redirect_to new_preference_path, notice: "Please pick your preferences again."
    end   
end