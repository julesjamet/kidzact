Rails.application.routes.draw do
  root to: 'pages#home'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  devise_for :users
    get 'dashboard', to: 'kids#dashboard'
    resources :kids
  
end
