class Answer < ActiveRecord::Base
  has_many :answer_details
  before_create :assign_hashid

  def titleandvalue
    categories = Category.find(:all, :conditions => {:form_id => self.form_id}, :order=>:order_num)
    categories.map do |category|
      average = category.questions.inject(0) do |sum, q|
        sum + self.answer_details.find(:first, :conditions => {:question_id => q.id}).answer_rate
      end.to_f / category.questions.size
      {
        :id => category.id,
        :title => category.title,
        :value => average
      }
   end
  end

  def score
    categories = Category.find(:all, :conditions => {:form_id => self.form_id}, :order=>:order_num)
    sum = self.titleandvalue.inject(0) do |sum, a|
      sum + a[:value]
    end
    ((sum - 8) * 100 / (4 * categories.size)).to_i
  end

  private

  def assign_hashid
    self.hashid = Digest::SHA1.hexdigest([Time.now, rand].join)
  end

end
