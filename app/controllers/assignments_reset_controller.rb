class AssignmentsResetController < ApplicationController
    load_and_authorize_resource :Assignment

    def destroy
        Assignment.destroy_all
        Job.first.update(allocation_done: false)
        redirect_to assignments_path
    end
end