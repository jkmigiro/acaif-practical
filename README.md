# Fullstack Influencer Campaign Platform

## 🚀 Overview
This is a **Fullstack Influencer Campaign Platform** built using **Next.js, NestJS and MongoDB**. It allows influencers to view and track campaign statuses and submit content.

## 🛠️ Technologies Used
- **Frontend:** Next.js, TypeScript, Ant Design (AntD)
- **Backend:** NestJS, MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Tokens)


## 🎯 Features
### ✅ Frontend (Next.js + Ant Design)
- **Campaign List Page:** Displays campaigns with statuses and deadlines
- **Campaign Details Page:** Shows campaign instructions and submission forms
- **Login & Signup Pages:** Authentication with JWT


### ✅ Backend (NestJS + MongoDB)
- **Campaign Management:** CRUD operations for campaigns
- **Influencer Management:** User registration and authentication
- **Submission API:** Influencers can submit campaign content



## 🔧 Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/jkmigiro/acaif-practical
cd acaif-practical
```

### 2️⃣ Install Dependencies
#### Frontend:
```sh
cd acaif-frontend
npm install
```
#### Backend:
```sh
cd acaif-backend
npm install
```

### 3️⃣ Install & Setup MongoDB
#### **Option 1: Install MongoDB Locally**
1. Download MongoDB from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. Follow installation instructions for your OS

### 4️⃣  Run the Application
#### Start Backend:
```sh
cd acaif-backend
nest start
```
#### Start Frontend:
```sh
cd frontend
npm run dev
```

### 6️⃣ Access the App
- **Frontend:** `http://localhost:3000/`
- **Backend API:** `http://localhost:5000/`

## 🛡️ Authentication & Authorization
- **JWT Authentication** is implemented using NestJS Guards.
- **Middleware in Next.js** ensures protected routes.

## 🚀 API Endpoints
### **Auth Routes**
- `POST /auth/register` → Register a new influencer
- `POST /auth/login` → Authenticate & get JWT token

### **Campaign Routes**
- `GET /campaigns` → Get list of campaigns
- `GET /campaigns/:id` → Get details of a specific campaign
- `POST /campaigns` → Create a campaign


## 📜 License
This project is licensed under the MIT License.

## 📧 Contact
For any inquiries, contact **jkmigiro@gmail.com**
