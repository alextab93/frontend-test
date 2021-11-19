# frozen_string_literal: true

FactoryBot.define do
  factory :store do
    name { Faker::Company.name }
    address { Faker::Address.street_address }
  end
end

# == Schema Information
#
# Table name: stores
#
#  id         :bigint           not null, primary key
#  address    :string
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
