class AddFamilyToAnswer < ActiveRecord::Migration
  def change
    add_column :answers, :family_type, :string
  end
end
