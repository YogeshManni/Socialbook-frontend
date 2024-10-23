
# Developer Documentation

## 1. Project Overview

SocialBook is a social media platform designed for universities and colleges, aimed at improving communication and engagement by consolidating messages, posts, events, and academic discussions. The project uses a full-stack architecture with React.js for the frontend, Node.js with Express.js for the backend, and PostgreSQL as the database.

## 2. Setup Instructions

1. **Clone the Repository:**

   Run the following command:
   ```bash
   git clone https://github.com/YogeshManni/Socialbook-frontend
   ```

2. **Install Dependencies:**

   Navigate to the project folder and install the necessary packages:
   ```bash
   npm install
   ```

3. **Environment Variables:**

   Create a `.env` file in the root directory to store environment variables such as the database URL, JWT secret key, and any third-party API keys. Example:
   ```env
   DATABASE_URL=database_url
   JWT_SECRET=jwt_secret_key
   ```

4. **Database Setup:**

   Run the migrations or SQL scripts to set up the PostgreSQL database schema:
   ```bash
   npx sequelize db:migrate
   ```

5. **Start the Application:**

   Use the following command to run the development server:
   ```bash
   npm start
   ```

   - The frontend will be available on `http://localhost:3000` and the backend API on `http://localhost:5000`.

---

## 3. Code Structure

- **/src**: Contains React components, styles, and routing for the frontend.
- **/api**: Holds all the backend routes and controllers.
- **/models**: Contains the database models and schema definitions using Sequelize (or another ORM).
- **/controllers**: Business logic for each API endpoint.
- **/services**: Any additional backend services such as email notifications or third-party integrations.
- **/middleware**: Contains custom middlewares like authentication (JWT) and error handling.

---

## 4. Backend Documentation

### Key API Endpoints:

- **User Authentication:**

  - **POST /api/register**
    - Registers a new user.
    - **Parameters**:
      - `email`: User's email address.
      - `password`: User's password.
      - `name`: User's full name.
    - **Response**: Success message with JWT token for authenticated sessions.

  - **POST /api/login**
    - Authenticates a user and returns a JWT token.
    - **Parameters**:
      - `email`: User's email.
      - `password`: User's password.
    - **Response**: JWT token and user details.

- **Profile Management:**

  - **GET /api/profile**
    - Fetches the logged-in user's profile information.

  - **POST /api/profile/update**
    - Updates user profile, including name, bio, and profile picture.

- **Posts:**

  - **POST /api/posts/create**
    - Allows users to create a post with images, videos, and captions.
    - **Parameters**:
      - `media`: Uploaded image or video file.
      - `caption`: Caption for the post.
    - **Response**: Success message with post details.

  - **GET /api/posts**
    - Fetches all posts, with support for pagination.

- **Comments and Likes:**

  - **POST /api/posts/comment**
    - Allows users to comment on a post.
    - **Parameters**:
      - `comment`: Text of the comment.

  - **POST /api/posts/like**
    - Allows users to like a post.

- **Event Management:**

  - **POST /api/events/create**
    - Allows users to create events.
    - **Parameters**:
      - `title`: Event title.
      - `date`: Date and time of the event.
      - `location`: Event location.
    - **Response**: Success message with event details.

---

## 5. Database Schema

- **Users Table**: 
  - Stores user credentials, profile data (name, email, bio, profile picture).
  - Passwords are hashed using bcrypt.

- **Posts Table**: 
  - Stores user-generated posts with associated media (image, video), captions, and timestamps.
  - Linked to users through foreign keys.

- **Events Table**: 
  - Stores event details such as title, date, location, and description.

- **Comments and Likes Tables**: 
  - Separate tables to store comments and likes on posts, linked to users and posts through foreign keys.

---

## 6. Middleware

- **Authentication Middleware**: 
  - Verifies JWT tokens for protected routes.

- **Error Handling Middleware**: 
  - Catches and formats server errors to provide user-friendly messages.

---

## 7. Security Measures

- **Password Hashing**: 
  - All user passwords are hashed using bcrypt for secure storage.

- **JWT Tokens**: 
  - Used for session management and authentication, ensuring secure access to protected routes.

- **File Validation**: 
  - Media files (images and videos) are validated for type and size to ensure security.

---

## 8. Deployment Steps

1. **Deploy Backend**:
   - Use services like AWS EC2, Heroku, or DigitalOcean for deploying the Node.js backend.

2. **Deploy Frontend**:
   - Use services like Firebase or AWS S3/CloudFront for the React.js frontend.

3. **Configure CI/CD**:
   - Use GitHub Actions or CircleCI to set up continuous integration for automated testing and deployments.

4. **Deploy Database**:
   - Use services like Aiven, Elephant SQL, or Microsoft Azure to deploy the database on the cloud.

---
