class CreateJobTypes < ActiveRecord::Migration
  def change
    create_table :job_types do |t|
      t.string :title
      t.integer :order_num

      t.timestamps
    end
  end
end
