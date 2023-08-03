class AddTimesToJobs < ActiveRecord::Migration[7.0]
  def change
    add_column :jobs, :first_notification_time, :datetime
    add_column :jobs, :second_notification_time, :datetime
    add_column :jobs, :allocation_time, :datetime
  end
end
