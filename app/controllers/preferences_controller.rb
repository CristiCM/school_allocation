class PreferencesController < ApplicationController
    before_action :authentificate_request
    authorize_resource
    before_action :set_preferences

    def create
        @preference = current_user.preferences.build(preference_params)

        if @preference.save
            render_success("Preference was successfully created.", :created, {preference: @preference})
        else
            render_error(@preference.errors.full_messages.to_sentence, :bad_request)
        end
    end
     
    def destroy
        @preference = @preferences.find_by(id: params[:id])
        
        if !@preference
            render_error("Invalid record id!", :not_found)
        elsif @preference.destroy
            update_priority_after_deletion
            render_success("Preference successfully destroyed!", :ok)
        end
    end
    

    def index
        if @preferences.any?
            data = { preferences: PreferenceSerializer.new(@preferences).serializable_hash[:data].map {|data| data[:attributes]} }
            render_success("Student preferences.", :ok,  data)
        else
            render_error("Student has no preferences.", :ok)
        end
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

    def set_preferences
        @preferences = current_user.preferences
    end
end