class AddJobTypeIdToAnswer < ActiveRecord::Migration
  def change
    add_column :answers, :job_type_id, :integer
  end
end
