Rails.application.routes.draw do
  root 'homes#new'

  devise_for :users, controllers: {
    sessions: 'users/sessions',
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

  resources :assignments, only: [:new, :create, :destroy, :index] do
    collection do
      get :download
    end
  end

  resources :assignments_reset, only: [:destroy]
  
  require 'sidekiq/web'
  mount Sidekiq::Web => '/sidekiq'

  # API ROUTES UNDER API V1 SCOPE
  namespace :api do
    namespace :v1 do
      
      root 'homes#new'

      devise_for :users, controllers: {
        sessions: 'users/sessions',
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

      resources :assignments, only: [:new, :create, :destroy, :index] do
        collection do
          get :download
        end
      end

      resources :assignments_reset, only: [:destroy]
    end
  end

end
