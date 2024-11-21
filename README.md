# **User Notification API**

The **User Notification API** is a serverless application built with NestJS. It provides a robust system for managing user notification preferences and sending notifications via multiple channels (email, SMS, push). The API includes features like validation, rate limiting, error handling, and notification logs.

---
## **Images**
- Script start
![Screenshot 1](https://i.ibb.co/5Bc5TgH/Screenshot-2024-11-21-220542.png)

- Tests
![Screenshot 2](https://i.ibb.co/wcssNd9/Screenshot-2024-11-21220521.png)

## **Features**

- **User Preferences**:
  - Create, retrieve, update, and delete user notification preferences.
  - Supports customization for channels (email, SMS, push), frequency, and time zones.

- **Notification Management**:
  - Send notifications based on user preferences.
  - Log notification delivery status (e.g., sent, failed).

- **Rate Limiting**:
  - Prevents abuse by limiting the number of requests per user.

- **Error Handling**:
  - Custom exception filters for consistent error responses.

- **Validation**:
  - Request validation using `class-validator` and `class-transformer`.

---

## **Tech Stack**

- **Framework**: NestJS
- **Database**: MongoDB (via Mongoose)
- **Deployment**: Vercel
- **Rate Limiting**: NestJS Throttler Module
- **Testing**: Jest, Supertest
- **Environment Variables**: `@nestjs/config`

---

## **Installation**

### **Prerequisites**

- Node.js (v16+ recommended)
- MongoDB instance
- Vercel CLI (optional for deployment)

### **Steps**

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd user-notification-api
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Environment Variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   MONGO_URL=mongodb://localhost:27017/user-notifications
   PORT=3000
   ```

4. **Start the Server**:
   ```bash
   npm run start
   ```
   The application will be available at `http://localhost:3000`.

5. **Run in Watch Mode (Optional)**:
   ```bash
   npm run start:dev
   ```

---

## **API Documentation**

Refer to the [API Documentation](#api-documentation) section for detailed information about the available endpoints.


## **API Endpoints**

### **Base URL**

- **Local**: `http://localhost:3000`
- **Production**: `https://zigment-backend-task-516swpgnl-pk24s-projects.vercel.app`

### **1. User Preferences**

- **Create Preferences**: `POST /api/preferences`
- **Get Preferences**: `GET /api/preferences/:userId`
- **Update Preferences**: `PATCH /api/preferences/:userId`
- **Delete Preferences**: `DELETE /api/preferences/:userId`

### **2. Notifications**

- **Send Notification**: `POST /api/notifications/send`
- **Get Notification Logs**: `GET /api/notifications/:userId/logs`
- **Get Notification Statistics**: `GET /api/notifications/stats`

---

## **Testing**

### **Run Unit Tests**:
```
npm run test
```

### **Run E2E Tests**:
```
npm run test:e2e
```

### **Check Test Coverage**:
```
npm run test:cov
```

---

## **Deployment**

### **Deploy on Vercel**

1. **Install Vercel CLI**:
   ```
   npm install -g vercel
   ```

2. **Deploy**:
   ```
   vercel
   ```

3. **Set Environment Variables on Vercel**:
   - Navigate to **Settings > Environment Variables** in the Vercel dashboard.
   - Add variables (e.g., `MONGO_URL`).
---
