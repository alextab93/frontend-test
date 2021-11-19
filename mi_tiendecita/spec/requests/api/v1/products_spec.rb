# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::Products', type: :request do
  let(:store) { create(:store) }
  let(:user) { create(:user, email: 'user1@test.com', password: 'pass123', store: store) }
  let(:product1) { create(:product, store: store) }
  let(:product2) { create(:product, store: store) }
  let(:product3) { create(:product, store: store) }

  describe 'Methods' do
    it 'lists a single product' do
      get "/api/v1/products/#{product1.id}", headers: auth_headers(user)
      json = JSON.parse(response.body)

      expect(response).to have_http_status(:success)
      expect(json).to eq({'id' => product1.id,
                          'name' => product1.name,
                          'code' => product1.code,
                          'price' => product1.price,
                          'description' => product1.description,
                          'imageUrl' => product1.image_url
                        })
    end
  end
end
