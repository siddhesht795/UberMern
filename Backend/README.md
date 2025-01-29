# Backend API Documentation

## Setup
```bash
npm install
npm run dev
```

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
    "socketId": "string",    // optional
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
Logout the current user and invalidate token.

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
