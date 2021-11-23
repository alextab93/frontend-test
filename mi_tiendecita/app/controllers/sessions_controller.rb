class SessionsController < ApplicationController
  skip_before_action :require_current_user

  def new
  end

  def create
    user_session = UserSession.new(auth_hash)
    user = user_session.current_user
    session[:current_user_id] = user.id
    redirect_to(params['nexturl'] || root_path)
  end

  def destroy
    # Remove the user id from the session
    @current_user = session[:current_user_id] = nil
    redirect_to(root_path)
  end

  protected

  def auth_hash
    request.env["omniauth.auth"].info
  end

  private

  def reject_login
    redirect_to('/')
  end
end
