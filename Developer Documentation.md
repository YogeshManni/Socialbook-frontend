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

   This will install all your dependencies defined in `package.json`

3. **Environment Variables:**

   Create a `.env` file in the root directory to store environment variables such as the database URL, JWT secret key, and any third-party API keys. Example:

   ```env
   REACT_APP_BASEURL = your backend url
   REACT_APP_FIREBASE_APIKEY = your firebase api
   REACT_APP_FIREBASE_AUTHDOMAIN = your firebase domain
   REACT_APP_FIREBASE_PROJECTID = your firebase projectid
   REACT_APP_FIREBASE_STORAGEBUCKET = your firebase bucket
   REACT_APP_FIREBASE_MSGSNDID = your firebase message id
   REACT_APP_FIREBASE_APPID = your firebase app id
   REACT_APP_MODERATIONURL = moderation url
   REACT_APP_API_USER = moderation user id
   REACT_APP_API_SECRET = moderation secret
   ```

4. **Start the Application:**

   Use the following command to run the development server:

   ```bash
   npm start
   ```

   - The frontend will be available on `http://localhost:3000`

---

## 3. Code Structure

```
.env
.firebase/
.firebaserc
.gitattributes
.github/
    workflows/
        main.yml
.gitignore
build/
public/
src/
    assets/
    components/
    features/
    helpers/
    lib/
    services/
App.tsx
index.tsx
storage.rules
tailwind.config.js
tsconfig.json
```

---

## 8. Deployment Steps

1. **Deploy Frontend**:

   - Use services like Firebase or AWS S3/CloudFront for the React.js frontend.

2. **Configure CI/CD**:

   - Use GitHub Actions or CircleCI to set up continuous integration for automated testing and deployments.

---
