class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.string :hashid
      t.integer :form_id
      t.string :living_place
      t.string :working_place
      t.integer :birth_year

      t.timestamps
    end
  end
end
