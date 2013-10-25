class AddFacebookIdToAnswer < ActiveRecord::Migration
  def change
    add_column :answers, :facebook_id, :string
    add_column :answers, :facebook_name, :string
  end
end
