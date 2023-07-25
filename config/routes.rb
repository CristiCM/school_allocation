Rails.application.routes.draw do
  root 'pages#home'

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  get "create_students", to: "students_creation#new"
  post "create_students", to: "students_creation#create"
  post 'import_data', to: 'schools_creation#import', as: :import_data
  patch "create_students", to: "students_creation#update"

  get "create_schools", to: "schools_creation#new"
  post "create_schools", to: "schools_creation#create"
  patch "create_schools", to: "schools_creation#update"



  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
