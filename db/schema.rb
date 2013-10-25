# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20131025125725) do

  create_table "admin_users", force: true do |t|
    t.string   "email",               default: "", null: false
    t.string   "encrypted_password",  default: "", null: false
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",       default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "admin_users", ["email"], name: "index_admin_users_on_email", unique: true

  create_table "answer_details", force: true do |t|
    t.integer  "answer_id"
    t.integer  "question_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "answer_rate"
  end

  create_table "answers", force: true do |t|
    t.string   "hashid"
    t.integer  "form_id"
    t.string   "living_place"
    t.string   "working_place"
    t.integer  "birth_year"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "job_type_id"
    t.string   "zipcode"
    t.string   "facebook_id"
    t.string   "facebook_name"
  end

  create_table "categories", force: true do |t|
    t.integer  "form_id"
    t.string   "title"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "icon_id"
    t.integer  "order_num"
  end

  create_table "forms", force: true do |t|
    t.string   "hashid"
    t.string   "title"
    t.string   "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "job_types", force: true do |t|
    t.string   "title"
    t.integer  "order_num"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "questions", force: true do |t|
    t.integer  "category_id"
    t.string   "title"
    t.string   "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "rails_admin_histories", force: true do |t|
    t.text     "message"
    t.string   "username"
    t.integer  "item"
    t.string   "table"
    t.integer  "month",      limit: 2
    t.integer  "year",       limit: 5
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "rails_admin_histories", ["item", "table", "month", "year"], name: "index_rails_admin_histories"

end
