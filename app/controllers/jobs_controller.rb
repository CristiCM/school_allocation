class JobsController < ApplicationController
  skip_before_action :verify_authenticity_token
  authorize_resource
  before_action :set_job

  def create
    job_manager = JobManager.new(creation_params)

    if @job.allocation_done?
      render_error("The allocation is already done!", :unprocessable_entity)
    elsif job_manager.create
      render_success("Job created successfully!", :created, {job: JobSerializer.new(@job.reload).serializable_hash[:data][:attributes]})
    else
      render_error("Job creation failed: Bad params.", :not_found)
    end
  end



  def destroy
    job_manager = JobManager.new(destroy_params)
      
    if job_manager.destroy
      render_success("Job deleted successfully!", :ok, {job: JobSerializer.new(@job.reload).serializable_hash[:data][:attributes]})
    else
      render_error(@job.errors.full_messages.to_sentence, :bad_request)
    end
  end



  def show
    render_success("Job time information.", :ok, {job: JobSerializer.new(@job.reload).serializable_hash[:data][:attributes]})
  end

  private

  def creation_params
    params.require(:job).permit(:first_notification, :second_notification, :allocation_date)
  end
  
  def destroy_params
    params.permit(:id, :type)
  end
  
end