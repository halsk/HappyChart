class CreateForms < ActiveRecord::Migration
  def change
    create_table :forms do |t|
      t.string :hashid
      t.string :title
      t.string :description

      t.timestamps
    end
  end
end
