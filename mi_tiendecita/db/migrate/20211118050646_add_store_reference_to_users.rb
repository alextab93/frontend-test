class AddStoreReferenceToUsers < ActiveRecord::Migration[6.1]
  def change
    add_reference :users, :store, foreign_key: true, null: false
  end
end
