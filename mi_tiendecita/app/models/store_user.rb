# frozen_string_literal: true

class StoreUser < ApplicationRecord
  belongs_to :store
  belongs_to :user
end

# == Schema Information
#
# Table name: store_users
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  store_id   :bigint           not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_store_users_on_store_id  (store_id)
#  index_store_users_on_user_id   (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (store_id => stores.id)
#  fk_rails_...  (user_id => users.id)
#
