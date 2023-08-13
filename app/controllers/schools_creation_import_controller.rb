class SchoolsCreationImportController < ApplicationController
  load_and_authorize_resource :School
    def new
    end

    def create
        Rails.logger.info "Importing file..."
        begin
          DataImporter.new(params[:file]).call
          redirect_to new_school_specialization_path
          flash[:success] = "Successfully imported!"
        rescue => e
          flash[:alert] = "Import failed: #{e.message}"
          render :new, status: :unprocessable_entity
        end
    end
end