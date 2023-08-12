class AssignmentsController < ApplicationController
    before_action :verify_admin
    def new
    end

    def index
    end

    def create
        job_manager = JobManager.new(job_creation_params)
        job_manager.create
        flash[:success] = 'Job created successfully!'
        redirect_to new_assignment_path
    end
  
    def destroy
        
        job_manager = JobManager.new(job_deletion_params)
        job_manager.destroy
        flash[:success] = 'Job deleted successfully!'
        redirect_to new_assignment_path
    end

    private

    def job_creation_params
      params.require(:job).permit(:id, :type, :first_notification, :second_notification, :allocation_date)
    end

    def job_deletion_params
      params.permit(:id, :type)
    end
end