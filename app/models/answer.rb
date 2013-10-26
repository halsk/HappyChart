# coding: utf-8
require 'pry'
PREFS = ["北海道", "青森県", "岩手県", "宮城県", "秋田県",
    "山形県", "福島県", "茨城県", "栃木県", "群馬県",
    "埼玉県", "千葉県", "東京都", "神奈川県", "新潟県",
    "富山県", "石川県", "福井県", "山梨県", "長野県",
    "岐阜県", "静岡県", "愛知県", "三重県", "滋賀県",
    "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県",
    "鳥取県", "島根県", "岡山県", "広島県", "山口県",
    "徳島県", "香川県", "愛媛県", "高知県", "福岡県",
    "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県",
    "鹿児島県", "沖縄県" ]

class Answer < ActiveRecord::Base
  has_many :answer_details
  before_create :assign_hashid
  before_update :extract_location

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
  def extract_location
    PREFS.each do |p|
      res = self.living_place.scan(/^#{p}(.*)/)
      if (res.count > 0)
        self.address1 = p
        self.address2 = res[0][0]
      end
    end
  end

end
