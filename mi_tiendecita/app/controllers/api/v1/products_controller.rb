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
  end

  def update
  end

  def destroy
  end
end
