class SchoolsCreationImportController < ApplicationController
  before_action :authentificate_request
  authorize_resource :School

    def create
        begin
          DataImporter.new(params[:file]).import_csv

          render_success("Successfully imported!", :ok)
        rescue => e
          render_error("Import failed: #{e.message}", :bad_request)
        end
    end
end