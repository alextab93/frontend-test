# frozen_string_literal: true

FactoryBot.define do
  factory :product do
    name { Faker::Commerce.product_name }
    code { Faker::Code.npi }
    price { rand(300..15_000) }
    description { Faker::Lorem.sentence }
    image_url { 'path/image_url.jpg' }
    store
  end
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
