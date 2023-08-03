class CreateJobs < ActiveRecord::Migration[7.0]
  def change
    create_table :jobs do |t|
      t.string :first_notification_jid
      t.string :second_notification_jid
      t.string :allocation_date_jid

      t.timestamps
    end
  end
end
