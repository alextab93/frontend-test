# frozen_string_literal: true

module Authentication
  def auth_headers(user = nil)
    user ||= create(:user, email: 'user1@test.com', password: 'pass123')
    exp = Time.now.to_i + 3 * 60 # 3 min life-span token
    payload = { user_id: user.id, exp: exp }
    token = JWT.encode(payload, ENV['API_SECRET'])
    {
      'Authorization': "Bearer #{token}"
    }
  end
end
