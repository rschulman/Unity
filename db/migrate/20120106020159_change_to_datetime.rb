class ChangeToDatetime < ActiveRecord::Migration
  def up
    change_column :games, :game_date, :datetime
  end

  def down
    change_column :games, :game_date, :date
  end

end
