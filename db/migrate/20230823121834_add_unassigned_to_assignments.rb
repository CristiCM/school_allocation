class AddUnassignedToAssignments < ActiveRecord::Migration[7.0]
  def change
    add_column :assignments, :unassigned, :boolean, default: false, null: false
  end
end
