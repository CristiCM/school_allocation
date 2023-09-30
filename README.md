## `heroku-deployment` Branch

This branch is a modified version of the `main` branch, adapted specifically for deployment on Heroku. It mirrors the `main` branch in functionality and features but includes some essential changes to ensure smooth deployment and operation on Heroku.

### Key Modifications

- **Database Configuration**: The database has been switched to PostgreSQL to comply with Heroku's database requirements.
- **Additional Configurations**

### Deployment Steps

1. **Clone the Repository:**

    ```sh
    git clone https://github.com/CristiCM/school-allocation-system.git
    ```

2. **Navigate to the Project Directory:**

    ```sh
    cd school_allocation
    ```

3. **Switch to `heroku-deployment` Branch:**

    ```sh
    git checkout heroku-deployment
    ```

4. Follow the standard Heroku deployment procedure to push this branch to your Heroku application.

Remember, this branch is already configured for Heroku, so you don't need to make additional changes to deploy the application.

Enjoy the application on Heroku!
