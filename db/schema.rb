# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_08_03_173344) do
  create_table "assignments", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "school_specialization_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["school_specialization_id"], name: "index_assignments_on_school_specialization_id"
    t.index ["user_id"], name: "index_assignments_on_user_id"
  end

  create_table "jobs", force: :cascade do |t|
    t.string "first_notification_jid"
    t.string "second_notification_jid"
    t.string "allocation_date_jid"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "first_notification_time"
    t.datetime "second_notification_time"
    t.datetime "allocation_time"
  end

  create_table "preferences", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "school_specialization_id", null: false
    t.integer "priority"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["school_specialization_id"], name: "index_preferences_on_school_specialization_id"
    t.index ["user_id"], name: "index_preferences_on_user_id"
  end

  create_table "school_specializations", force: :cascade do |t|
    t.integer "school_id", null: false
    t.integer "track_id", null: false
    t.integer "specialization_id", null: false
    t.integer "spots_available"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["school_id"], name: "index_school_specializations_on_school_id"
    t.index ["specialization_id"], name: "index_school_specializations_on_specialization_id"
    t.index ["track_id"], name: "index_school_specializations_on_track_id"
  end

  create_table "schools", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "specializations", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tracks", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "admission_average"
    t.float "en_average"
    t.float "ro_grade"
    t.float "mathematics_grade"
    t.string "mother_tongue"
    t.float "mother_tongue_grade"
    t.float "graduation_average"
    t.string "role"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "assignments", "school_specializations"
  add_foreign_key "assignments", "users"
  add_foreign_key "preferences", "school_specializations"
  add_foreign_key "preferences", "users"
  add_foreign_key "school_specializations", "schools"
  add_foreign_key "school_specializations", "specializations"
  add_foreign_key "school_specializations", "tracks"
end
