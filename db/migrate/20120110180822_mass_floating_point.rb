class MassFloatingPoint < ActiveRecord::Migration
  def up
    change_column :planets, :mass, :float
  end

  def down
    change_column :planets, :mass, :integer
  end
end
