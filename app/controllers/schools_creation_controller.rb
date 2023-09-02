class SchoolsCreationController < ApplicationController
  load_and_authorize_resource :SchoolSpecialization
  before_action :set_sorting_params, only: [:index, :download]
  before_action :set_school_specializations, only: [:index, :download]
  PAGINATION_RECORD_NUMBER = 10

    def new

      data = {
        schools: SchoolSerializer.new(School.all).serializable_hash[:data].map { |data| data[:attributes] },
        tracks: TrackSerializer.new(Track.all).serializable_hash[:data].map { |data| data[:attributes] },
        specializations: SpecializationSerializer.new(Specialization.all).serializable_hash[:data].map { |data| data[:attributes] }
      }

      if !School.any? || !Track.any? || !Specialization.any?
        render_success("School, Track, Spec records.", :partial_content, data)
      else
        render_success("School, Track, Spec records.", :ok, data)
      end
    end
  
    def create
      @school_specialization = SchoolSpecialization.new(school_specialization_params)
      
      if SchoolSpecialization.exists?(school_id: school_specialization_params[:school_id], track_id: school_specialization_params[:track_id], specialization_id: school_specialization_params[:specialization_id])
        render_error("Specialization already exists!", :conflict)
      elsif @school_specialization.save
        data = {school_specialization: SchoolSpecializationSerializer.new(@school_specialization).serializable_hash[:data][:attributes]}
        render_success("Specialization created!", :created, data)
      else
        render_error(@school_specialization.errors.full_messages.to_sentence, :bad_request)
      end
    end

    def update
      @school_specialization = SchoolSpecialization.find_by(params[:id])

      if !@school_specialization
        render_error("Invalid record id!", :not_found)
      elsif @school_specialization.update(school_specialization_params)
        data = {school_specialization: SchoolSpecializationSerializer.new(@school_specialization).serializable_hash[:data][:attributes]}
        render_success("Specialization updated!", :ok, data)
      else
        render_error(@school_specialization.errors.full_messages.to_sentence, :bad_request)
      end
    end
    
    def destroy
      @school_specialization = SchoolSpecialization.find_by(params[:id])
      
      begin
        if !@school_specialization
          render_error("invalid record id!", :not_found)
        elsif @school_specialization.destroy
          render_success("Record deleted succesfully!", :ok)
        end
      rescue
        render_error("Delete failed: Students have that specialization selected.", :forbidden)
      end
    end

    # Can receive params: :order, :page(pagination)
    def index
      @school_specializations = apply_pagination(@school_specializations)
      data = {school_specializations: SchoolSpecializationSerializer.new(@school_specializations).serializable_hash[:data].map {|data| data[:attributes]}}
      render_success("School Specializations, ordered and paginated.", :ok, data)
    end

    # Can receive params: :order
    def download
      data = ExcelGenerator.generate_for_school_specializations(@school_specializations)
      send_data data, filename: "School Specializations.xlsx", type: Mime::Type.lookup_by_extension('xlsx').to_s
    end
    

    private

    def set_sorting_params
      @sort_by = 'school_specializations.spots_available'
      @order = params[:order] || 'DESC'
    end
    
    def set_school_specializations
      unassigned_school = School.find_by(name: "Unassigned School")
    
      if unassigned_school
        @school_specializations = SchoolSpecialization.where.not(school_id: unassigned_school.id)
      else
        @school_specializations = SchoolSpecialization.all
      end
    
      @school_specializations.order!("#{@sort_by} #{@order}")
    end
    
    def apply_pagination(school_specializations)
      school_specializations.paginate(page: params[:page], per_page: PAGINATION_RECORD_NUMBER)
    end   

    def school_specialization_params
      params.require(:school_specialization).permit(:school_id, :track_id, :specialization_id, :spots_available)
    end    
end
  