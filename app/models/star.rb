class Star < ActiveRecord::Base
  
  belongs_to :system
  has_many :planets
end
