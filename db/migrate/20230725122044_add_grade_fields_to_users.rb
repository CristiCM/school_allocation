class AddGradeFieldsToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :admission_average, :float
    add_column :users, :en_average, :float
    add_column :users, :ro_grade, :float
    add_column :users, :mathematics_grade, :float
    add_column :users, :mother_tongue, :string
    add_column :users, :mother_tongue_grade, :float
    add_column :users, :graduation_average, :float
  end
end
