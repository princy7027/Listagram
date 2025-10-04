# Listagram🏡

![Backend](https://img.shields.io/badge/Backend-Node.js-43853D?style=flat)
![Framework](https://img.shields.io/badge/Framework-Express-000000?style=flat)
![Database](https://img.shields.io/badge/Database-MongoDB-47A248?style=flat)
![Auth](https://img.shields.io/badge/Auth-JWT-orange?style=flat)
![Frontend](https://img.shields.io/badge/Frontend-React%20(TypeScript)-61DAFB?style=flat)

A full-stack web platform that simplifies searching, booking, and managing accommodations near campuses.  
Users can browse listings, reserve properties, and communicate with owners, while listers can easily add and manage their listings.  
The system ensures **efficiency**, **transparency**, and **seamless communication** between users and property owners.  

---

## 🚀 Features

- 🔐 **Secure Authentication**: OTP-based login and signup system  
- 🏠 **Property Management**: Add, edit, and manage property listings with images, pricing, and availability  
- 👨‍💼 **Admin Dashboard**: Property and user verification, listing approvals, and system monitoring  
- ⭐ **Membership System**: Premium plans for priority listings and wishlist functionality  
- 📩 **Notifications**: Email alerts for booking confirmations, approvals, and updates  
- 🔍 **Smart Search**: Filter properties by location, price, and room type  

---

## 📊 Benefits

- **Efficiency**: Automated housing management reduces manual errors and saves time  
- **Transparency**: Real-time updates for booking and listing approvals  
- **Communication**: Direct messaging between users and property owners  
- **Engagement:** Premium features drive user retention.

---

## 🔄 User Flows

### 👤 For Users
1. Register/Login  
2. Search for accommodation by filters  
3. View property details  
4. Contact property owner  
5. Book and confirm reservation  

### 🏠 For Listers
1. Register/Login  
2. Access personal dashboard  
3. Add property listings with details and images  
4. Manage existing listings  

### 🛡️ For Admins
1. Verify users and property listings  
2. Approve or reject lister applications  
3. Monitor system activities  

---

## 🛠️ Tech Stack

- **Frontend**: React.js  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **Authentication**: JWT (JSON Web Tokens)  
- **Other**: REST APIs, Membership system
- **Email Services**: Nodemailer 

---

 ## 🛠 Getting Started

### ✅ Backend Setup
bash
cd listagram_BackEnd
npm install
npm run dev

> Server runs on the port defined in .env

### ✅ Frontend Setup
bash
cd listagram_FrontEnd
npm install
npm run dev

> Runs on http://localhost:5173 by default

---

## 🏗 Architecture

- **Backend API**: Handles all business logic, property management, bookings, notifications, and membership plans.  
- **Web Admin Panel**: Dashboard for admins to verify users and properties, approve/reject listings, and monitor system activities.  
- **Notifications Service**: Sends real-time alerts for bookings, approvals, and updates.  
- **Database**: Stores users, properties, bookings, memberships, and system logs securely.  

