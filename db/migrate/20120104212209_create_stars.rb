class CreateStars < ActiveRecord::Migration
  def change
    create_table :stars do |t|
      t.string :name
      t.string :classification
      t.integer :radius
      t.bigint :mass
      t.integer :orbit
      t.integer :system_id

      t.timestamps
    end
  end
end
