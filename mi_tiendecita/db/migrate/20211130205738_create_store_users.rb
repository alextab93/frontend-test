class CreateStoreUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :store_users do |t|
      t.references :store, foreign_key: true, null: false
      t.references :user, foreign_key: true, null: false
      t.timestamps
    end

    remove_reference :users, :store
  end
end
