Rails.application.routes.draw do
  namespace :api, defaults: { format: 'json' } do
    namespace :v1 do
      resources :stores, only: %i[index show update create] do
        resources :products, only: %i[index create]
      end

      resources :products, only: %i[show update destroy]

      get :s3_direct_post, to: 's3_uploads#set_s3_direct_post'

      # auth
      post '/signup', to: 'users#create'
      post '/login', to: 'users#login'
      post '/logout', to: 'users#logout'
      get '/current_user', to: 'users#show'
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'root#index'
  get '*path',
      to: 'root#index',
      via: :all
      # constraints: lambda { |request|
      #   request.path.exclude?('rails/active_storage') || request.format == :html
      # }
end
