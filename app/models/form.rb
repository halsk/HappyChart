class Form < ActiveRecord::Base
  before_create :assign_hashid
  private

  def assign_hashid
    self.hashid = Digest::SHA1.hexdigest([Time.now, rand].join)
  end

end
