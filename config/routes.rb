Rails.application.routes.draw do
  root 'homes#new'

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  resources :students, controller: 'students_creation', only: [:new, :create, :update, :destroy, :index, :edit]

  resources :school_specializations, controller: 'schools_creation', only: [:new, :create, :update, :destroy, :edit, :index]

  resources :school_specialization_import , controller: 'schools_creation_import', only: [:new, :create]

  resources :preferences, only: [:new, :create, :destroy, :index]

  resources :assignments, only: [:new, :create, :destroy, :index]
  
  require 'sidekiq/web'
  mount Sidekiq::Web => '/sidekiq'
end
