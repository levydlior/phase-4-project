Rails.application.routes.draw do

  namespace :api do
    resources :cities, only: [:index, :create, :show, :destroy]
    
    resources :users, only: [:create, :show, :update, :destroy]
    
    resources :tiles, only: [:create, :destroy]


    post "/login", to: "sessions#create"
    delete '/logout', to: 'sessions#destroy'
  end
  # Defines the root path route ("/")
  # root "articles#index"

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
