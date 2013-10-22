class AddIconIdToCategories < ActiveRecord::Migration
  def change
    add_column :categories, :icon_id, :integer
    add_column :categories, :order_num, :integer
  end
end
