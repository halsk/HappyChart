class AddPrefIdToAnswer < ActiveRecord::Migration
  def change
    add_column :answers, :pref_id, :integer
  end
end
