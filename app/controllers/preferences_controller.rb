class PreferencesController < ApplicationController
    def new
        5.times { current_user.preferences.build } unless current_user.preferences.count > 0
    end

    def create
        preferences_params = params.require(:user).permit(preferences: [:school_specialization_id, :priority])
    
        Preference.transaction do
            preferences_params[:preferences].each do |preference_params|
                current_user.preferences.create!(preference_params)
            end
        end
    
        redirect_to new_preference_path, notice: 'Preferences updated successfully.'
    rescue ActiveRecord::RecordInvalid
        render :new, status: :unprocessable_entity
    end 
    
    def destroy
        current_user.preferences.destroy_all
        redirect_to new_preference_path, notice: "Please pick your preferences again."
    end
    
    private
    
    def user_params
        params.require(:user).permit(preferences_attributes: [:id, :school_specialization_id, :priority])
    end      
end