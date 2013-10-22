class Category < ActiveRecord::Base
  belongs_to :form
  has_many :questions

  def icon_name
    sprintf("icon%02d.png", icon_id)
  end
end
