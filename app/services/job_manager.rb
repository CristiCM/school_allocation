class JobManager
  ALL_JOB_ATTRIBUTES = {
    first_notification: {
      worker: EmailWorker,
      job_jid_attribute: :first_notification_jid,
      job_time_attribute: :first_notification_time,
      action: "first_notification"
    },
    second_notification: {
      worker: EmailWorker,
      job_jid_attribute: :second_notification_jid,
      job_time_attribute: :second_notification_time,
      action: "second_notification"
    },
    allocation_date: {
      worker: AllocationWorker,
      job_jid_attribute: :allocation_date_jid,
      job_time_attribute: :allocation_time,
      action: nil  # For allocation, the action is the list of student ids.
    }
  }.freeze

  REQUIRED_DATE_PARAMS = [:first_notification, :second_notification, :allocation_date].freeze

  def initialize(params)
    @params = params
  end

  def create
    return false unless at_least_one_date_present?

    job = Job.first
    ALL_JOB_ATTRIBUTES.each do |job_key, job_attributes|
      next unless @params[job_key] || job.allocation_done?

      datetime_bucharest = Time.zone.parse(@params[job_key])
      delete_job(job.send(job_attributes[:job_jid_attribute]))

      action = job_attributes[:action] || User.get_allocation_sorted_student_ids
      new_jid = job_attributes[:worker].perform_at(datetime_bucharest.utc, action)

      job.update(
        job_attributes[:job_jid_attribute] => new_jid,
        job_attributes[:job_time_attribute] => datetime_bucharest
      )

      job.update(allocation_done: true) if job_attributes[:worker] == AllocationWorker
    end

    true
  end

  def destroy
    job = Job.first
    # even if the type: is given a symbol in the view, the URL changes it to a string.
    job_key = @params[:type].to_sym
    job_attributes = ALL_JOB_ATTRIBUTES[job_key]

    return false unless job_attributes

    delete_job(job.send(job_attributes[:job_jid_attribute]))
    job.update(
      job_attributes[:job_jid_attribute] => nil,
      job_attributes[:job_time_attribute] => nil
    )

    true
  end

  private

  def at_least_one_date_present?
    REQUIRED_DATE_PARAMS.any? { |param| @params[param].present? }
  end

  def delete_job(jid)
    queue = Sidekiq::ScheduledSet.new
    job = queue.find_job(jid)
    job&.delete
  end
end
