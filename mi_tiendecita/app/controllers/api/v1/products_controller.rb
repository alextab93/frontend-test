# frozen_string_literal: true

class Api::V1::ProductsController < ApiController
  before_action :authorized

  def index
    @products = Product.where(store_id: params[:store_id])
    render json: { products: @products }
  end

  def show
    @product = Product.find(params[:id])
    render json: { product: @product }
  end

  def create
    @product = Product.new(product_params.merge({ store_id: params[:store_id] }))

    if @product.save
      render json: { product: @product }
    else
      render json: { errors: @product.errors.messages }
    end
  end

  def update
    @product = Product.find(params[:id])

    if @product.update(product_params)
      render json: { product: @product }
    else
      render json: { errors: @product.errors.messages }
    end
  end

  def destroy
    @product = Product.find(params[:id])

    if @product.destroy
      render json: { message: 'Product deleted successfully' }
    else
      render json: { errors: @product.errors.messages }
    end
  end

  private

  def product_params
    params.require(:product).permit(
      :name,
      :price,
      :code,
      :quantity,
      :description,
      :image_url,
    )
  end
end
