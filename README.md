# School Allocation System

A web application designed to automate and streamline the allocation of eighth-grade students to high schools, based on their grades and preferences. It employs a robust Ruby on Rails backend paired with a responsive React frontend to deliver an efficient, user-friendly experience.

## Features

- **Automated Allocation**: Automatically assigns students to high schools, with admin control to set allocation dates.
- **User Authentication**: Utilizes Devise and Devise-Jwt with HTTP-only cookies for secure user authentication.
- **Real-Time Updates**: Employs React with TanStack Query and Axios to provide real-time updates and an interactive user experience.
- **Async Jobs and Notifications**: Uses Sidekiq and Redis for efficient handling of asynchronous jobs and deadline notifications.
- **Role-Based Access Control**: Implements CanCanCan for adept management of role permissions.
- **Testing**: Incorporates RSpec, FactoryBot, and Faker for comprehensive testing of the Ruby on Rails backend.

## Branches

- **main**: Implements the MVC pattern with Rails views.
- **heroku-deployment**: Configured for deployment on Heroku, utilizing PostgreSQL.
- **rails-react**: Features a React frontend with controllers rendering JSON for API responses.

## Getting Started

### Seeding the Database

The application comes with a predefined seed file to populate the database with initial data, making the environment ready for allocation. You can seed the database using the following command:

```sh
bin/rails db:seed


This will create sample data, including users (with an admin account), and set the environment to an allocation-ready state. The admin can log in using the following credentials:

Email: admin@admin.com
Password: 123456
Students and Preferences
350 student accounts are created with random preferences for school specializations, ready for the allocation process.

Running the Application
Using the main Branch (MVC Pattern)


Using the rails-react Branch
