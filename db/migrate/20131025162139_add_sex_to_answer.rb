class AddSexToAnswer < ActiveRecord::Migration
  def change
    add_column :answers, :sex, :string
  end
end
