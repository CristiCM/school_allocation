class SchoolsCreationImportController < ApplicationController
  load_and_authorize_resource :School

    def create
        Rails.logger.info "Importing file..."
        begin
          DataImporter.new(params[:file]).import_csv

          render json: {
                status: {code: 200, message: "Successfully imported!"}
                }, status: :ok
        rescue => e
          render json: {
            status: {code: 401, message: "Import failed: #{e.message}"}
          }, status: :failed
        end
    end
end