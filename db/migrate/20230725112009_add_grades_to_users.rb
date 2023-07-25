class AddGradesToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :exam_grade, :float
    add_column :users, :middle_grade, :float
  end
end
