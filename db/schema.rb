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
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20120110180822) do

  create_table "games", :force => true do |t|
    t.datetime "game_date"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "epoch_date"
  end

  create_table "planets", :force => true do |t|
    t.string   "name"
    t.string   "type"
    t.integer  "radius"
    t.float    "mass"
    t.integer  "mean_temp"
    t.float    "gravity"
    t.float    "smaxis"
    t.float    "arg_peri"
    t.float    "mean_anomoly"
    t.integer  "star_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "stars", :force => true do |t|
    t.string   "name"
    t.string   "classification"
    t.integer  "radius"
    t.integer  "mass"
    t.integer  "orbit"
    t.integer  "system_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "systems", :force => true do |t|
    t.string   "name"
    t.boolean  "discovered"
    t.integer  "game_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "systems", ["game_id"], :name => "index_systems_on_game_id"

end
