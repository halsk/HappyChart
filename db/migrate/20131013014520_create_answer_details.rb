class CreateAnswerDetails < ActiveRecord::Migration
  def change
    create_table :answer_details do |t|
      t.integer :answer_id
      t.integer :question_id
      t.integer :answer

      t.timestamps
    end
  end
end
