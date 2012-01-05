class ChangeColumnstoBigint < ActiveRecord::Migration
  def up
    change_column :stars, :mass, :bigint
    change_column :planets, :mass, :bigint
  end
  
  def down
    change_column :stars, :mass, :integer
    change_column :planets, :mass, :bigint
end
