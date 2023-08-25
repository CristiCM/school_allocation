class SchoolsCreationController < ApplicationController
  load_and_authorize_resource :SchoolSpecialization

  before_action :set_sorting_params, only: [:index, :download]
  before_action :set_school_specializations, only: [:index, :download]

    def new
      @school_specialization = SchoolSpecialization.new
    end

    def create
      @school_specialization = SchoolSpecialization.new(school_specialization_params)
      
      if @school_specialization.save
        flash[:success] = 'SchoolSpecialization instance created'
      else
        flash[:alert] = 'Instance creation failed!'
      end
      redirect_to new_school_specialization_path
    end

    def update
      @school_specialization = SchoolSpecialization.find(params[:id])
      if @school_specialization.update(school_specialization_params)
        flash[:success] = 'Updated successfully!'
      else
        flash[:alert] = 'Update failed!'
      end
      conditional_redirect
    end
    
    def destroy
      begin
        @school_specialization = SchoolSpecialization.find(params[:id])
        @school_specialization.destroy
        flash[:success] = 'Record was successfully deleted.'
      rescue
        flash[:alert] = 'Delete failed: Students have that specialization selected.'
      end
      conditional_redirect
    end    

    def edit
      @school_specialization = SchoolSpecialization.find(params[:id])
    end 

    def index
      @school_specializations = apply_pagination(@school_specializations)
    end
    
    def download
      respond_to do |format|
        format.xlsx { render xlsx: "download", filename: "School Specializations.xlsx" }
      end
    end

    private

    def set_sorting_params
      @sort_by = params[:sort_by] || 'school_specializations.spots_available'
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
      school_specializations.paginate(page: params[:page], per_page: 10)
    end

    def conditional_redirect
      if request.referrer && request.referrer.include?('edit') || request.referrer && request.referrer.include?('specializations')
        redirect_to school_specializations_path
      else
        redirect_to new_school_specialization_path
      end
    end
    

    def school_specialization_params
      params.require(:school_specialization).permit(:school_id, :track_id, :specialization_id, :spots_available)
    end    
end
  