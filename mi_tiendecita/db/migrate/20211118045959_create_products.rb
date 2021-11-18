class CreateProducts < ActiveRecord::Migration[6.1]
  def change
    create_table :products do |t|
      t.string :name, null: false
      t.integer :price, null: false
      t.string :code, null: false
      t.string :image_url, null: true
      t.string :description, null: false
      t.references :store, foreign_key: true, null: false
      t.timestamps
    end
  end
end
