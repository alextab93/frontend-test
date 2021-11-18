class Product < ApplicationRecord
  belongs_to :store
end

# == Schema Information
#
# Table name: products
#
#  id          :bigint           not null, primary key
#  code        :string           not null
#  description :string           not null
#  image_url   :string
#  name        :string           not null
#  price       :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  store_id    :bigint           not null
#
# Indexes
#
#  index_products_on_store_id  (store_id)
#
# Foreign Keys
#
#  fk_rails_...  (store_id => stores.id)
#
