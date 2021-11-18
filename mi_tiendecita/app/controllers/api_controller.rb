class ApiController < ActionController::Base
  skip_before_action :verify_authenticity_token

  TIME_NOW = Time.now.to_i

  def encode_token(user_id, expiry_after_days = 7)
    exp = TIME_NOW + expiry_after_days * 24 * 3600
    iat = TIME_NOW
    payload = { user_id: user_id, exp: exp, iat: iat }
    JWT.encode(payload, ENV['JWT_SECRET'])
  end

  def auth_header
    # { Authorization: 'Bearer <token>' }
    request.headers['Authorization']
  end

  def decoded_token
    if auth_header
      token = auth_header.split(' ')[1]
      # header: { 'Authorization': 'Bearer <token>' }
      begin
        JWT.decode(token, ENV['JWT_SECRET'], true, algorithm: 'HS256')
      rescue JWT::DecodeError
        nil
      end
    end
  end

  def logged_in_user
    if decoded_token
      user_id = decoded_token[0]['user_id']
      @user = User.find_by(id: user_id)
    end
  end

  def logged_in?
    !!logged_in_user
  end

  def authorized
    render json: { message: 'Please log in' }, status: :unauthorized unless logged_in?
  end
end