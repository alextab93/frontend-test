# frozen_string_literal: true

class Api::V1::StoresController < ApiController
  before_action :authorized

  def index
    @stores = User.find(session[:current_user_id]).stores.order('id')
  end

  def show
    @store = Store.find(params[:id])
  end

  def create
    @store = Store.new(store_params)

    if @store.save
      render json: { store: @store }, status: :created
    else
      render json: { errors: @store.errors.messages }, status: :bad_request
    end
  end

  def update
    @store = Store.find(params[:id])

    if @store.update(store_params)
      render json: { store: @store }
    else
      render json: { errors: @store.errors.messages }, status: :bad_request
    end
  end

  private

  def store_params
    params.require(:store).permit(
      :name,
      :address
    )
  end
end
