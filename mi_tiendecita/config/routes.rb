Rails.application.routes.draw do
  namespace :api do

  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'root#index'
  get '*path', to: 'root#index', via: :all
      # constraints: lambda { |request|
      #   request.path.exclude?("rails/active_storage") || request.format == :html
      # }
end
