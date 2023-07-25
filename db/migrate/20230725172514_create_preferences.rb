class CreatePreferences < ActiveRecord::Migration[7.0]
  def change
    create_table :preferences do |t|
      t.references :user, null: false, foreign_key: true
      t.references :school_specialization, null: false, foreign_key: true
      t.integer :priority

      t.timestamps
    end
  end
end
