# User Authentication API

This is a Node.js backend API for user authentication and profile management. It provides endpoints for user registration, login, profile editing, and user listing. The authentication system supports both local registration/login and social login with services like Google, Facebook, Twitter, or GitHub.

## Features

- User registration with email and password
- User login with email and password
- User login/register with Google, Facebook, Twitter, or GitHub
- User profile management (view, edit)
- Admin functionality to view all user profiles

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/user-authentication-api.git

2. Navigate to the project directory:

    ```bash
    cd voosh-assignment

3. Install dependencies:

    ```bash
    npm install

4. Create a .env file in the root directory and provide the following environment variables:

    ```bash
    PORT=3000
    MONGO_URI=db-url

5. Start the server:

    ```bash
    npm start

## Usage

- Register a new user: Send a POST request to /api/users/register with the user's information (email, password, etc.) in the request body.
- Login: Send a POST request to /api/users/login with the user's credentials (email, password) in the request body.
- Get user profile: Send a GET request to /api/users/profile to get the logged-in user's profile.
- Edit user profile: Send a PUT request to /api/users/profile with the updated user information in the request body to edit the logged-in user's profile.
- Get all users (Admin only): Send a GET request to /api/users to get all user profiles. Requires admin privileges.

## Contribution

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

