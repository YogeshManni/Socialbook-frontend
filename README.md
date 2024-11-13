# SOCIALBOOK

## Table of Contents

1. [Project Summary](#project-summary)

   - [Problem Statement](#problem-statement)
   - [Solution](#solution)

2. [Key Features](#key-features)

3. [Setup Instructions](#setup-instructions)

4. [User Document](#user-document)

5. [Key Performance Indicators (KPIs)](#key-performance-indicators-kpis)

6. [Competitive Analysis](#competitive-analysis)

7. [Flow Chart](#flow-chart)

8. [Technical Design Document](#technical-design-document)

9. [Challenges and Learnings](#challenges-and-learnings)

## Project Summary

<div style="margin-left:2rem">

### Problem Statement

Students and universities often face significant challenges due to fragmented communication systems, which result from using multiple tools for emails, messages, and forums. This scattered approach causes:

- **Missed updates:** Important announcements and information often get lost across different platforms.
- **Confusion:** Juggling various tools makes it difficult to stay organized and on top of academic and social communication.
- **Disconnection:** New or transferring students struggle to build a sense of community, making it harder to engage with peers and faculty.
- **Inefficient academic content sharing:** Existing tools for discussions and sharing academic resources are often cumbersome and not suited for streamlined collaboration.
- **Networking challenges:** Navigating multiple platforms to connect with peers and professors makes networking more difficult, leading to missed opportunities for building academic and professional relationships.

In short, the overwhelming spread of information across disparate systems makes managing communication and staying updated nearly impossible for students and faculty alike.

</div>

---

<div style="margin-left:2rem">

### Solution

Socialbook provides an integrated solution that consolidates communication channels into a single, user-friendly platform designed specifically for academic environments. By bringing together features for academic discussions, social interactions, and event management, the app offers the following benefits:

- **Streamlined communication:** All essential communication tools are housed in one place, reducing the confusion and complexity of managing multiple platforms.
- **Fostering community:** The app facilitates stronger connections between students and faculty, making it easier to build relationships and foster collaboration.
- **Efficient content sharing:** With dedicated tools for sharing academic resources, it simplifies the process of discussing and distributing content, enhancing engagement in academic discussions.
- **Event management:** A built-in event management system allows users to stay informed about university events, meetings, and deadlines, all within the same platform.
- **Improved collaboration:** The app enhances collaboration by providing the tools needed to easily connect, share ideas, and organize projects.

In summary, this app addresses the key issues of fragmented communication, offering a comprehensive solution that simplifies the university experience by making communication, content sharing, and event management more efficient.

</div>

---

## Key Features

- **Posts:** Users can share images and videos, with options for likes and comments, facilitating vibrant interactions.
- **Events:** Articles can be posted for upcoming campus events, allowing for easy event management and participation.
- **People Page:** A dynamic directory that lists all users with their relevant information, making it simple to connect with peers and faculty.
- **Discussions:** Topic-driven discussion forums where users can engage in academic or social conversations.
- **Profile:** Users can customize their profiles with personal details, academic info, and a profile picture to enhance connections within the community.
- **Real time Chatting:** Users can chat with each other in real time, making it easy to communicate and collaborate.
- **Stories:** Users can post stories, which can be viewed by others, allowing for a more personal and engaging experience. Stories lasts for 24 hours.

## Setup Instructions

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

#### Full Developer Document

For a detailed documentation,please read developer documentation [here](https://github.com/YogeshManni/Socialbook-frontend/blob/main/Developer%20Documentation.md)

---

## User Document

For Project Navigation and user flow, please see User Documentation
[here](https://github.com/YogeshManni/Socialbook-frontend/blob/main/User%20Documentation.md)

## Key Performance Indicators (KPIs)

1. **Daily Active Users (DAU)**

   - **KPI:** The number of unique users who log into the app each day.
   - **Justification:** This KPI measures how many users are actively using the app on a daily basis. A high number of daily active users indicates that people are frequently engaging with the app, which suggests it's becoming an integral part of their routine. This helps track overall app usage and user retention.

2. **Feature Usage Rate**
   - **KPI:** The percentage of users who use key features like Events, Discussions, and Posts.
   - **Justification:** This KPI measures how many users are using important features of the app. If many users are using these features, it means they find them useful. If not, it might indicate that these features need improvements or more user support. This helps you understand which parts of the app are working well and which might need changes.

## Competitive Analysis

| Product Name    | Website             | Platform                        | Downloads | Cost/Payment Model     | Time on Market |
| --------------- | ------------------- | ------------------------------- | --------- | ---------------------- | -------------- |
| Jostle          | jostle.me           | Web, iOS, Android               | 50K+      | Subscription-based     | 13+ years      |
| Slack           | slack.com           | Web, iOS, Android, Windows, Mac | 10M+      | Freemium, subscription | 10+ years      |
| Microsoft Teams | microsoft.com/teams | Web, iOS, Android, Windows, Mac | 100M+     | Freemium, subscription | 7+ years       |

---

### Key Features and Analysis:

**Jostle**

- **Key Features:** Real-time collaboration, news sharing, employee recognition, event management, and a social feed.
- **Strengths:** Easy to use, focuses on employee engagement, and can be customized to fit different needs.
- **Weaknesses:** Lacks features specific to educational settings, limited social interaction tools for students, and high subscription costs can be prohibitive for academic institutions.

**Slack**

- **Key Features:** Organized channels for discussions, direct messaging, third-party app integrations, file sharing, and voice/video calls.
- **Strengths:** Customizable, real-time communication, extensive integrations, and robust team collaboration tools make Slack a strong contender in business environments.
- **Weaknesses:** The overwhelming notification system can be distracting, not designed with education in mind, and lacks tools for long-form content like articles or academic discussions.

**Microsoft Teams**

- **Key Features:** A chat-based workspace with document collaboration, video conferencing, Office 365 integration, and task management capabilities.
- **Strengths:** Seamless integration with the Microsoft ecosystem, strong document collaboration tools, and comprehensive communication features.
- **Weaknesses:** Complex for new users, primarily business-oriented, and lacks strong social networking features that would benefit students or a university setting.

### Analysis Summary

While Jostle, Slack, and Microsoft Teams are great for businesses, they don’t fully meet the needs of universities. They lack tools for student engagement, academic discussions, and simplified event and content sharing. The new app aims to solve these problems by offering a platform tailored to education, bringing communication, collaboration, and community together in one place.

### Flow Chart

Please download the flowchart image to see or follow [this link](https://github.com/YogeshManni/Socialbook-frontend/blob/main/socialbook%20flowchart.png) to see it on my Github repository.

### Technical Design Document

---

You can find my Technical design document at [this link](https://docs.google.com/document/d/1XlS1MFwZJJqKKaXfstARnPk2VyefMXeDmpEgVfT1BUI/edit?usp=sharing).

### Challenges and Learnings

---

Please find my challenges and learnings documentation [here](https://github.com/YogeshManni/Socialbook-frontend/blob/main/Challenges%20and%20Learnings.md)

[Go to Top](#socialbook)
