# frozen_string_literal: true

class Api::V1::StoresController < ApiController
  before_action :authorized

  def index
    @stores = Store.all
  end

  def show
    @store = Store.find(params[:id])
  end

  def create
    @store = Store.new(store_params)

    if @store.save
      render json: { store: @store }
    else
      render json: { errors: @store.errors.messages }
    end
  end

  def update
    @store = Store.find(params[:id])

    if @store.update(store_params)
      render json: { store: @store }
    else
      render json: { errors: @store.errors.messages }
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
