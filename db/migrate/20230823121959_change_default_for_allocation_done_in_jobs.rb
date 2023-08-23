class ChangeDefaultForAllocationDoneInJobs < ActiveRecord::Migration[7.0]
  def change
    change_column_default :jobs, :allocation_done, from: nil, to: false
    change_column_null :jobs, :allocation_done, false
  end
end
