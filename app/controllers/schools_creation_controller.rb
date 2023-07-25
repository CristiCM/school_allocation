class SchoolsCreationController < ApplicationController
    before_action :verify_admin
    def new
      @school_specialization = SchoolSpecialization.new
    end

    def create
      @school_specialization = SchoolSpecialization.new(school_specialization_params)
      
      if @school_specialization.save
         redirect_to create_schools_path, notice: "Added successfully!"
      else
        render :new, notice: "Failed."
      end
    end

    def update
    end

    def import
      Rails.logger.info "Importing file..."
      begin
        raise "Not a CSV file" if File.extname(params[:file].path) != '.csv'
  
        spreadsheet = Roo::Spreadsheet.open(params[:file].path)
        header = spreadsheet.row(1)
  
        raise "Invalid headers" unless header.sort == ["school", "track", "specialization"].sort
  
        School.import(params[:file])
        Track.import(params[:file])
        Specialization.import(params[:file])
  
        redirect_to add_schools_path, notice: "Data imported successfully"
      rescue => e
        flash[:alert] = "Import failed: #{e.message}"
        render :new, status: :unprocessable_entity
      end
    end

    private

    def school_specialization_params
      params.require(:school_specialization).permit(:school_id, :track_id, :specialization_id, :spots_available)
    end    
end
  