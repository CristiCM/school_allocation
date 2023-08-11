Rails.application.routes.draw do
  root 'pages#home'

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  resources :students, controller: 'students_creation', only: [:new, :create, :update]

  resources :school_specializations, controller: 'schools_creation', only: [:new, :create, :update, :destroy, :edit, :index]

  resources :school_specialization_import , controller: 'schools_creation_import', only: [:new, :create]

  resources :preferences, only: [:new, :create, :destroy] do
    collection do
      get 'add_new'
    end
  end

  resources :assignments, only: [:new] do
    collection do
      get 'scheduler'
      post 'update_notification'
      post 'update_allocation'
      delete 'delete_notification'
    end
  end

  require 'sidekiq/web'
  mount Sidekiq::Web => '/sidekiq'


end
