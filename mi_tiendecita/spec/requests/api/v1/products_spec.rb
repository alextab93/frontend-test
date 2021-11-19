# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::Products', type: :request do
  let(:product1) { create(:product) }

  describe 'Methods' do
    it 'lists a single product' do
      get "/api/v1/products/#{product1.id}", headers: auth_headers
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

    it 'modifies a product' do
      params = {
        product: {
          name: 'Changed product name'
        }
      }
      patch "/api/v1/products/#{product1.id}", params: params, headers: auth_headers

      json = JSON.parse(response.body)['product']

      expect(response).to have_http_status(:success)
      expect(json['name']).to eq('Changed product name')
    end
  end
end
