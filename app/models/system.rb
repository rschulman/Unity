class System < ActiveRecord::Base
  
  belongs_to :game
  has_many :stars
end
