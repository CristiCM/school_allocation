class JobsController < ApplicationController
  before_action :authentificate_request
  skip_before_action :verify_authenticity_token
  authorize_resource
  before_action :set_job

  def create
    job_manager = JobManager.new(creation_params)

    if @job.allocation_done?
      render json: {}, status: :unprocessable_entity
    elsif job_manager.create
      render json: {
        job: JobSerializer.new(@job.reload).serializable_hash[:data][:attributes] #needs to be removed and #show to be invalidated
      }, status: :created
    else
      render json: {}, status: :not_found
    end
  end

  def destroy
    job_manager = JobManager.new(destroy_params)
      
    if job_manager.destroy
      render json: {
        job: JobSerializer.new(@job.reload).serializable_hash[:data][:attributes] #needs to be removed and #show to be invalidated
      }, status: :ok
    else
      render json: {}, status: :bad_request
    end
  end

  def show
    render json: {
      job: JobSerializer.new(@job.reload).serializable_hash[:data][:attributes]
    }, status: :ok
  end

  private

  def creation_params
    params.require(:job).permit(:first_notification, :second_notification, :allocation_date)
  end
  
  def destroy_params
    params.permit(:id, :type)
  end
  
end