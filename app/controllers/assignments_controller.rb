class AssignmentsController < ApplicationController
  skip_load_resource only: :destroy
  load_and_authorize_resource
  

  
  before_action :set_sorting_params, only: [:index, :download]
  before_action :set_assignments, only: [:index, :download]

  def new
    @users = apply_pagination(User.left_outer_joins(:preferences)
             .where(preferences: { id: nil }, role: 'student'))
  end

  def create
    job_manager = JobManager.new(job_creation_params)

    if Job.first.allocation_done?
      flash[:alert] = 'The allocation is already done!'
    elsif job_manager.create
      flash[:success] = 'Job created successfully!'
    else
      flash[:alert] = 'Please select a date first!'
    end

    redirect_to new_assignment_path
  end
  
  def destroy
    job_manager = JobManager.new(job_deletion_params)
    if job_manager.destroy
      flash[:success] = 'Job deleted successfully!'
    else
      flash[:alert] = "There's nothing to delete!"
    end
    redirect_to new_assignment_path
  end

  def index
    @assignments = apply_pagination(@assignments)
  end

  def download
    respond_to do |format|
      format.xlsx { render xlsx: "download", filename: "assignments.xlsx" }
    end
  end  

  private

  def apply_pagination(assignments)
    assignments.paginate(page: params[:page], per_page: 10)
  end

  def set_assignments
    @assignments = Assignment.includes(user: [], school_specialization: [:school, :track, :specialization])
                            .joins(:user)
                            .order("#{@sort_by} #{@order}")
  end

  def set_sorting_params
    @sort_by = params[:sort_by] || 'users.admission_average'
    @order = params[:order] || 'DESC'
  end

  def job_creation_params
    params.require(:job).permit(:id, :type, :first_notification, :second_notification, :allocation_date)
  end

  def job_deletion_params
    params.permit(:id, :type) # id is only passed to allow deletion
  end
end