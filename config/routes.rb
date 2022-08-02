Rails.application.routes.draw do
  resources :cities, only: [:index, :create, :show, :destroy]
  
  resources :users, only: [:create, :show, :update]
   
  resources :tiles, only: [:create, :destroy]


  post "/login", to: "sessions#create"
  delete '/logout', to: 'sessions#destroy'

  # Defines the root path route ("/")
  # root "articles#index"
end
