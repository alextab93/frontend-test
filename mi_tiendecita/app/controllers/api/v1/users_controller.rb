# frozen_string_literal: true

class Api::V1::UsersController < ApiController
  before_action :authorized, only: %i[show index logout]

  def show
  end

  # REGISTER
  def create
    @user = User.create(user_params)
    if @user.valid?
      token = encode_token(@user.id )
      render json: { user: @user, token: token }
    else
      render json: { error: 'Invalid username or password' }, status: :bad_request
    end
  end

  # LOGGING IN
  def login
    @user = User.find_by(email: params[:email])

    if @user&.authenticate(params[:password])
      token = encode_token(@user.id)
      render json: { user: @user, token: token }
    else
      render json: { error: 'Invalid username or password' }, status: :unauthorized
    end
  end

  def logout
    @user = nil
    render json: { message: 'Logged out' }
  end

  private

  def user_params
    params.permit(:email, :password, :first_name, :last_name, :avatar_url)
  end
end
