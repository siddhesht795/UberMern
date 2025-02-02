# Uber Clone Backend

A Node.js backend service for an Uber-like ride-sharing application using Express.js and MongoDB.

## Features

- User Authentication (Register/Login/Logout)
- Captain (Driver) Registration
- JWT-based Authentication
- Real-time Location Tracking (Socket.IO)

## Project Structure

```
Backend/
├── controllers/
│   ├── user.controller.js
│   └── captain.controller.js
├── models/
│   ├── user.model.js
│   ├── captain.model.js
│   └── blacklistModel.model.js
├── routes/
│   ├── user.routes.js
│   └── captain.routes.js
├── services/
│   ├── user.service.js
│   └── captain.service.js
└── middlewares/
    └── auth.middleware.js
```

## Setup
```bash
npm install
npm run dev
```

## API Endpoints

### User Routes
- POST `/api/user/register` - Register new user
- POST `/api/user/login` - User login
- GET `/api/user/profile` - Get user profile (Protected)
- GET `/api/user/logout` - Logout user (Protected)

### Captain Routes
- POST `/api/captain/register` - Register new captain

## User Authentication APIs

### 1. Register User
Register a new user in the system.

#### Endpoint
```
POST /users/register
```

#### Request Body
```json
{
  "fullName": {
    "firstName": "string", // required, minimum 3 characters
    "lastName": "string"   // required, minimum 3 characters
  },
  "email": "string",      // required, minimum 5 characters
  "password": "string"    // required, will be hashed
}
```

#### Response
**Success (201 Created)**
```json
{
  "token": "JWT_TOKEN_STRING",
  "user": {
    "fullName": {
      "firstName": "string",
      "lastName": "string"
    },
    "email": "string",
    "socketId": "string",
    "createdAt": "datetime",
    "updatedAt": "datetime"
  }
}
```

### 2. Login User
Login with existing user credentials.

#### Endpoint
```
POST /users/login
```

#### Request Body
```json
{
  "email": "string",    // required, valid email format
  "password": "string"  // required, minimum 6 characters
}
```

#### Response
**Success (200 OK)**
```json
{
  "token": "JWT_TOKEN_STRING",
  "user": {
    "fullName": {
      "firstName": "string",
      "lastName": "string"
    },
    "email": "string",
    "socketId": "string",    // optional
    "createdAt": "datetime",
    "updatedAt": "datetime"
  }
}
```

### 3. Get User Profile
Get the profile of the authenticated user.

#### Endpoint
```
GET /users/profile
```

#### Headers
```
Authorization: Bearer JWT_TOKEN_STRING
```

#### Response
**Success (200 OK)**
```json
{
  "fullName": {
    "firstName": "string",
    "lastName": "string"
  },
  "email": "string",
  "socketId": "string",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### 4. Logout User
Logout the current user and invalidate/blacklist token.

#### Endpoint
```
GET /users/logout
```

#### Headers
```
Authorization: Bearer JWT_TOKEN_STRING
```

#### Response
**Success (200 OK)**
```json
{
  "message": "Logged out successfully"
}
```

## Models

### User
- Full Name (First Name, Last Name)
- Email
- Password
- Socket ID

### Captain
- Full Name (First Name, Last Name)
- Email
- Password
- Socket ID
- Status (Active/Inactive)
- Vehicle Details (Color, Plate, Capacity, Type)
- Location (Latitude, Longitude)

## Error Responses

### Validation Error (400 Bad Request)
```json
{
  "errors": [
    {
      "msg": "Error message",
      "param": "field_name",
      "location": "body"
    }
  ]
}
```

### Authentication Error (401 Unauthorized)
```json
{
  "message": "Invalid credentials"
}
```

## Implementation Details
- MongoDB database with Mongoose ODM
- JWT-based authentication
- Password encryption using bcrypt
- Express validator for input validation
- Cookie-based token storage
- Token blacklisting for logout
- Socket ID support for real-time features
- Auto-expiring blacklisted tokens (24 hours)

## Authentication
- JWT-based authentication
- Token blacklisting for logout
- Protected routes using auth middleware

## Tech Stack
- Node.js
- Express.js
- MongoDB with Mongoose
- Socket.IO
- JWT for authentication
- bcryptjs for password hashing
