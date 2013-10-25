class AddZipCodeToAnswer < ActiveRecord::Migration
  def change
    add_column :answers, :zipcode, :string
  end
end
