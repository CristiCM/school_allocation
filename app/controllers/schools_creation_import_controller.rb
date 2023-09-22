class SchoolsCreationImportController < ApplicationController
  before_action :authenticate_request
  authorize_resource :School

    def create
        begin
          DataImporter.new(params[:file]).import_csv
          render json: {}, status: :ok
        rescue => e
          render json: {}, status: :bad_request
        end
    end
end