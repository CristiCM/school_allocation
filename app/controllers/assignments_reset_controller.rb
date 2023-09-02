class AssignmentsResetController < ApplicationController
    authorize_resource :Assignment
    skip_before_action :verify_authenticity_token
    before_action :set_job
    
    def destroy
        if !@job.allocation_done?
            render_error("Allocation not done: Nothing to reset!", :not_found)
        else
            AllocationResetWorker.perform_async
            render_success("Allocation reset process started!", :accepted)
        end
    end
end
