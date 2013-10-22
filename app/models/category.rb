class Category < ActiveRecord::Base
  belongs_to :form
  has_many :questions

end
