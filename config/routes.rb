Rails.application.routes.draw do
  root 'pages#home'

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  # Assuming you have a Student resource
  resources :students, controller: 'students_creation', only: [:new, :create, :update] do
    collection do
      get 'scheduler'
      post 'update_first_notification'
      post 'update_second_notification'
      post 'update_allocation'
    end
  end

  # Assuming you have a SchoolSpecialization resource
  resources :school_specializations, controller: 'schools_creation', only: [:new, :create, :update, :destroy, :edit] do
    collection do
      get :import_data, as: :import_data
      post :import, as: :import
      get :edit_all, as: :edit_all
    end
  end

  resources :preferences, only: [:new, :create, :destroy] do
    collection do
      get 'add_new'
    end
  end
end
