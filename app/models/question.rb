class Question < ActiveRecord::Base
  belongs_to :category
  def field_name
    sprintf "q-%d-%d", self.category.form.id, self.id
  end
end
