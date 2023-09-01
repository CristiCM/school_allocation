class JobsController < ApplicationController
  skip_load_resource only: :destroy
  load_and_authorize_resource
  def create
    job_manager = JobManager.new(job_params)

    if Job.first.allocation_done?
      flash[:alert] = 'The allocation is already done!'
    elsif job_manager.create
      flash[:success] = 'Job created successfully!'
    else
      flash[:alert] = 'Please select a date first!'
    end
  end

  def destroy
    @job = Job.find_by(id: params[:id])

    if !@job
      render_error("Invalid record id!", :not_found)
      return
    end
    
    job_manager = JobManager.new(job_params.merge(id: params[:id]))
      
    if job_manager.destroy
      render_success("Job deleted successfully!", :ok, JobSerializer.new(job).serializable_hash[:data][:attributes])
    else
      render_error(@job.errors.full_message.join(', '), :bad_request)
    end
  end

  def show
    job = Job.find_by(id: params[:id])

    if !job
      render_error("Invalid record id!", :bad_request)
    else
      render_success("Job time information.", :ok, JobSerializer.new(job).serializable_hash[:data][:attributes])
    end
  end

  private
  def job_params
    params.require(:job).permit(:type)
    #, :first_notification, :second_notification, :allocation_date
  end
end