class SchoolsCreationController < ApplicationController
  before_action :authentificate_request
  load_and_authorize_resource :SchoolSpecialization
  before_action :set_sorting_params, only: [:index, :download]
  before_action :set_school_specializations, only: [:index, :download]
  PAGINATION_RECORD_NUMBER = 10
  
    def new
      render json: {
        schools: SchoolSerializer.new(School.all).serializable_hash[:data].map { |data| data[:attributes] },
        tracks: TrackSerializer.new(Track.all).serializable_hash[:data].map { |data| data[:attributes] },
        specializations: SpecializationSerializer.new(Specialization.all).serializable_hash[:data].map { |data| data[:attributes] }
      }, status: !School.any? || !Track.any? || !Specialization.any? ? :partial_content : :ok
    end
  
    def create
      @school_specialization = SchoolSpecialization.new(school_specialization_params)
      
      if SchoolSpecialization.exists?(school_id: school_specialization_params[:school_id], track_id: school_specialization_params[:track_id], specialization_id: school_specialization_params[:specialization_id])
        render json: {}, status: :conflict
      elsif @school_specialization.save
        render json: {
          school_specialization: SchoolSpecializationSerializer.new(@school_specialization).serializable_hash[:data][:attributes]
        }, status: :created
      else
        render json: {}, status: :bad_request
      end
    end

    def update
      @school_specialization = SchoolSpecialization.find_by(id: params[:id])

      if !@school_specialization
        render json: {}, status: :not_found
      elsif @school_specialization.update(school_specialization_params)
        render json: {}, status: :ok
      else
        render json: {}, status: :bad_request
      end
    end
    
    def destroy
      @school_specialization = SchoolSpecialization.find_by(id: params[:id])
      
      begin
        if !@school_specialization
          render json: {}, status: :not_found
        elsif @school_specialization.destroy
          render json: {}, status: :ok
        end
      rescue
        render json: {}, status: :forbidden
      end
    end

    # Can receive params: :order, :page(pagination)
    def index
      @school_specializations = apply_pagination(@school_specializations)
      
      if @school_specializations.empty?
        render json: {}, status: :no_content
      else
        render json: {
          school_specializations: SchoolSpecializationSerializer.new(@school_specializations).serializable_hash[:data].map {|data| data[:attributes]},
          order: params[:order],
          page: params[:page],
          total_pages: (@school_specializations.count.to_f / 10).ceil
        }, status: :ok
      end
    end

    # Can receive params: :order
    def download
      data = ExcelGenerator.generate_for_school_specializations(@school_specializations)
      send_data data, filename: "School Specializations.xlsx", type: Mime::Type.lookup_by_extension('xlsx').to_s
    end

    def show
      school_specialization = SchoolSpecialization.all.find_by(id: params[:id])

      if !school_specialization
        render json: {}, status: :not_found
      else
        render json: {
          school_specialization: SchoolSpecializationSerializer.new(school_specialization).serializable_hash[:data][:attributes]
        }, status: :ok
      end
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
  