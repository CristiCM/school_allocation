Rails.application.routes.draw do
  get '/current_user', to: 'current_user#index'
  root 'homes#new'

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    passwords: 'users/passwords',
    registrations: 'users/registrations'
  }

  resources :students, controller: 'students_creation', only: [:new, :create, :update, :destroy, :index, :edit] do
    collection do
      get :download
    end
  end

  resources :school_specializations, controller: 'schools_creation', only: [:new, :create, :update, :destroy, :edit, :index] do
    collection do
      get :download
    end
  end

  resources :school_specialization_import , controller: 'schools_creation_import', only: [:new, :create]

  resources :preferences, only: [:new, :create, :destroy, :index]

  resources :assignments, only: [:new, :index] do
    collection do
      get :download
    end
  end

  resources :assignments_reset, only: [:destroy]

  resources :jobs, only: [:create, :destroy, :show]
  
  require 'sidekiq/web'
  mount Sidekiq::Web => '/sidekiq'
end
