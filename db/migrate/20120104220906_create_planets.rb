class CreatePlanets < ActiveRecord::Migration
  def change
    create_table :planets do |t|
      t.string :name
      t.string :type
      t.integer :radius
      t.bigint :mass
      t.integer :mean_temp
      t.float :gravity
      t.float :smaxis
      t.float :arg_peri
      t.float :mean_anomoly
      t.integer :star_id

      t.timestamps
    end
  end
end
