class PreferencesController < ApplicationController
    load_and_authorize_resource
    def new
    end

    def create
        begin
            current_user.preferences.create!(preference_params)
            flash[:success] = 'Preference was successfully created.'
            redirect_to preferences_path
        rescue ActiveRecord::RecordInvalid
            flash[:alert] = 'You have already chosen this specialization.'
            redirect_to preferences_path
        end
    end
     
    def destroy
        @preference = current_user.preferences.find(params[:id])
        @preference.destroy
        update_priority_after_deletion
        flash[:success] = 'Preference was successfully removed.'
        redirect_to preferences_path
    end
    
    private
    
    def preference_params
        params.require(:preference).permit(:school_specialization_id, :priority)
    end

    def update_priority_after_deletion
        current_user.preferences.order(:priority).each_with_index do |preference, index|
        preference.update(priority: index + 1)
        end
    end
end