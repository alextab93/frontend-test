class Api::V1::StoresController < ApiController
  before_action :authorized

  def index
    @stores = Store.all
    render json: { stores: @stores }
  end

  def show
    @store = Store.find(params[:id])
    render json: { store: @store }
  end

  def create
  end

  def update
  end

end
