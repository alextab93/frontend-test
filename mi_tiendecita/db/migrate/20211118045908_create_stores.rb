class CreateStores < ActiveRecord::Migration[6.1]
  def change
    create_table :stores do |t|
      t.string :name, null: false
      t.string :address, null: true
      t.timestamps
    end
  end
end
