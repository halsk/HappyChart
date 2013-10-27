class Question < ActiveRecord::Base
  belongs_to :category
  has_many :answer_details
  def field_name
    sprintf "q-%d-%d", self.category.id, self.id
  end
end
