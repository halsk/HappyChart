class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.integer :category_id
      t.string :title
      t.string :description

      t.timestamps
    end
  end
end
