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



## 8\. Deployment

#### 1. **Cloud Infrastructure Selection and Justification**

*   **Frontend on Firebase Hosting**:
    
    *   **Why Firebase**: Firebase Hosting offers fast, secure, and globally distributed hosting for web apps, making it well-suited for responsive frontends. Since Firebase is also free for low-traffic use, it’s a cost-effective solution that simplifies deployment with a single command.
        
    *   **Features Utilized**: Firebase provides HTTPS by default, which helps secure frontend traffic, and caching options that improve load times by storing static assets close to users.
        
*   **Backend on Microsoft Azure**:
    
    *   **Why Azure**: Azure App Service (or Functions for serverless apps) is highly scalable and offers direct integrations with tools you might be using, such as Visual Studio Code, GitHub Actions, or CI/CD pipelines. Additionally, Azure’s global data centers and load balancing can enhance app resilience.
        
    *   **Features Utilized**: With App Service, you can set up autoscaling, monitoring, and custom domains. Azure Functions can also scale down costs by only charging for active use, which is beneficial if your backend doesn’t need to be running continuously.
        
*   **Database on Aiven (PostgreSQL)**:
    
    *   **Why Aiven PostgreSQL**: Aiven provides managed PostgreSQL instances, which means automated backups, scaling options, and integrated security, all essential for production-grade data management.
        
    *   **Features Utilized**: With Aiven, you have access to monitoring tools, connection pooling, and data redundancy options, which are key for maintaining high availability and data security.
        
---
#### 2\. **Deployment Processes**

*   **Deploying Frontend on Firebase**:
    
    *   **Steps**: Build your React app with npm run build, then deploy with firebase deploy. Firebase CLI can simplify these steps and supports CI/CD integration.
        
    *   **Configuration**: You can configure your caching and asset management in Firebase, optimizing for mobile and web by caching images, JS, and CSS assets.
        
*   **Deploying Backend on Azure App Service**:
    
    *   **Steps**: Use the Azure CLI or Azure Portal to create an App Service instance. Push your backend code using Git, GitHub Actions, or Azure DevOps pipelines.
        
    *   **Scaling**: Configure scaling settings in App Service to increase or decrease instances based on demand, helping reduce costs and optimize performance.
        
*   **Setting Up Aiven PostgreSQL**:
    
    *   **Steps**: Create a PostgreSQL instance in Aiven, configure access, and set up your schema. Use Aiven’s SSL certificates to secure your connections.
        
    *   **Connection and Security**: Use environment variables in your backend for secure, easy database connections.
        
----
#### 3\. **Scalability and Performance Best Practices**

*   **Auto-Scaling and Load Balancing**:
    
    *   Configure Azure App Service to automatically scale based on CPU or memory usage, or set up regional load balancing for global user distribution.
        
*   **Caching**:
    
    *   Firebase automatically uses a global CDN, and you can specify caching headers for static assets. Backend caching (e.g., Redis) can reduce database load.
        
*   **Database Optimization**:
    
    *   Use indexing, optimize queries, and configure connection pooling. Aiven provides monitoring tools to identify slow queries, which can help reduce query execution time and improve response.
        
---
#### 4\. **Monitoring and Logging Setup**

*   **Frontend on Firebase**:
    
    *   Firebase Analytics can track page load times, user actions, and performance. Crashlytics, if integrated, can catch frontend errors in real-time.
        
*   **Backend on Azure**:
    
    *   Use Azure Monitor and Application Insights to track performance, error rates, and resource utilization (CPU, memory, request time). This helps identify issues and understand app usage.
        
*   **Database on Aiven**:
    
    *   Aiven includes built-in monitoring for PostgreSQL, tracking metrics like query performance, error rates, and uptime. This helps prevent database bottlenecks.
        
---
#### 5\. **Challenges and Considerations**

*   **Cross-Provider Integration**:
    
    *   **Issue**: API requests and CORS policies can be challenging. Ensure that each service allows communication from your other services, using CORS headers as necessary.
        
    *   **Solution**: Configure Firebase to allow requests to Azure, and set up authentication to secure communications between your backend and frontend.
        
*   **Performance Bottlenecks**:
    
    *   **Issue**: Slow database queries or limited API responses.
        
    *   **Solution**: Identify slow queries with Aiven monitoring and optimize them, or set up API response caching.
        
*   **Cost Management**:
    
    *   **Consideration**: Balancing cost and performance, particularly with resources that scale with traffic, such as Azure App Service or Aiven.
        
    *   **Solution**: Use monitoring tools to evaluate usage patterns and adjust resource allocation to optimize costs.
---
