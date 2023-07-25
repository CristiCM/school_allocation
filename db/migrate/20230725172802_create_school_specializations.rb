class CreateSchoolSpecializations < ActiveRecord::Migration[7.0]
  def change
    create_table :school_specializations do |t|
      t.references :school, null: false, foreign_key: true
      t.references :track, null: false, foreign_key: true
      t.references :specialization, null: false, foreign_key: true
      t.integer :spots_available

      t.timestamps
    end
  end
end
