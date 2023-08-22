class AssignmentsController < ApplicationController
  load_and_authorize_resource
  def new
  end

  def index
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

  private

  def job_creation_params
    params.require(:job).permit(:id, :type, :first_notification, :second_notification, :allocation_date)
  end

  def job_deletion_params
    params.permit(:id, :type) # id is only passed to allow deletion
  end
end