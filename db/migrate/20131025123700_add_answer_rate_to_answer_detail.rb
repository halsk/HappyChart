class AddAnswerRateToAnswerDetail < ActiveRecord::Migration
  def change
    remove_column :answer_details, :answer
    add_column :answer_details, :answer_rate, :integer
  end
end
