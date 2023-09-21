class AssignmentsResetController < ApplicationController
    before_action :authentificate_request
    authorize_resource :Assignment
    skip_before_action :verify_authenticity_token
    before_action :set_job
    
    def destroy
        if !@job.allocation_done?
            render json: {}, status: :not_found
        else
            AllocationResetWorker.perform_async
            render json: {}, status: :accepted
        end
    end
end
