# frozen_string_literal: true

class Store < ApplicationRecord
  has_many :products
  has_many :users
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
