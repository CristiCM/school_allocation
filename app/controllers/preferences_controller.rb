class PreferencesController < ApplicationController
    before_action :authenticate_request
    authorize_resource
    before_action :set_preferences

    def create
        @preference = current_user.preferences.build(preference_params)

        if @preference.save
            render json: {}, status: :created
        else
            render json: {}, status: :bad_request
        end
    end
     
    def destroy
        @preference = @preferences.find_by(id: params[:id])
        
        if !@preference
            render json: {}, status: :not_found
        elsif @preference.destroy
            update_priority_after_deletion
            render json: {}, status: :ok
        end
    end

    def index
        if @preferences.any?
            render json: {
                preferences: PreferenceSerializer.new(@preferences).serializable_hash[:data].map {|data| data[:attributes]}
            }, status: :ok
        else
            render json: {}, status: :no_content
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