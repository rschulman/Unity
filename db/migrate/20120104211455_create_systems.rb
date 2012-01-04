class CreateSystems < ActiveRecord::Migration
  def change
    create_table :systems do |t|
      t.string :name
      t.boolean :discovered
      t.integer :game_id

      t.timestamps
    end
    add_index :systems, :game_id
  end
end
