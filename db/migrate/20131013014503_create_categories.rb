class CreateCategories < ActiveRecord::Migration
  def change
    create_table :categories do |t|
      t.integer :form_id
      t.string :title

      t.timestamps
    end
  end
end
