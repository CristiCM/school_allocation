Rails.application.routes.draw do
  root 'pages#home'

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  # Assuming you have a Student resource
  resources :students, controller: 'students_creation', only: [:new, :create, :update]

  # Assuming you have a SchoolSpecialization resource
  resources :school_specializations, path: 'create_schools', controller: 'schools_creation', only: [:new, :create, :update, :destroy] do
    collection do
      post :import, as: :import_data
    end
  end
end
