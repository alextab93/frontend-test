# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::Users', type: :request do
  let(:user1) { create(:user, email: 'user@test.com', password: 'pass123') }
  describe 'Auth' do
    it 'logs in successfully' do
      params = {
        email: user1.email,
        password: 'pass123'
      }

      post '/api/v1/login', params: params

      expect(response).to have_http_status(:success)
    end

    it 'logs out successfully' do
      post '/api/v1/logout', headers: auth_headers(user1)

      expect(response).to have_http_status(:success)
    end
  end
end
