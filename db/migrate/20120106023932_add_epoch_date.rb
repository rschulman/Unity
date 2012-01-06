class AddEpochDate < ActiveRecord::Migration
  def change
    add_column :games, :epoch_date, :datetime
  end
end
