class AddAddressToAnswer < ActiveRecord::Migration
  def change
    add_column :answers, :address1, :string
    add_column :answers, :address2, :string
  end
end
