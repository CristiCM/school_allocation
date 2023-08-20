class AddAllocationTrackerToJobs < ActiveRecord::Migration[7.0]
  def change
    add_column :jobs, :allocation_done, :boolean
  end
end
