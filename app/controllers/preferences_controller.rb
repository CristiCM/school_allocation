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
        begin
            current_user.preferences.create!(preference_params)
            flash[:success] = 'Preference was successfully created.'
            redirect_to preferences_path
        rescue ActiveRecord::RecordInvalid
            flash[:error] = "You have already chosen this specialization"
            redirect_to preferences_path
        end
    end
      
    def update
        preference = current_user.preferences.find(params[:id])
        preference.update!(preference_params)
        redirect_to preferences_path, notice: 'Preference updated successfully.'
    end
    
    def destroy
        preference = current_user.preferences.find(params[:id])
        preference.destroy
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