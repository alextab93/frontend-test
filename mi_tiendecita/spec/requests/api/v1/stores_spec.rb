# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::Stores', type: :request do
  describe 'INDEX' do
    it 'lists all the stores' do
      stores = create_list(:store, 2)

      get '/api/v1/stores', headers: auth_headers

      json = JSON.parse(response.body)

      expect(response).to have_http_status(:success)
      expect(json.length).to eq(stores.length + 1) # is +1 because there's already a store created for the user performing the auth
    end
  end

  describe 'Single store' do
    let(:store) { create(:store) }
    it "listst all the store's propducts" do
      products = create_list(:product, 3, store_id: store.id)

      get "/api/v1/stores/#{store.id}/products", headers: auth_headers

      json = JSON.parse(response.body)

      expect(response).to have_http_status(:success)
      expect(json.length).to eq(products.length)
    end

    it "show store's info" do
      get "/api/v1/stores/#{store.id}", headers: auth_headers

      json = JSON.parse(response.body)
      expect(response).to have_http_status(:success)
      expect(json).to eq({ 'name' => store.name,
                           'address' => store.address })
    end
  end
end
