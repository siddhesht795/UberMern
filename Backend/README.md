# Backend API Documentation

## User Registration
Register a new user in the system.

### Endpoint
```
POST /users/register
```

### Request Body
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

### Response

#### Success (201 Created)
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

#### Error (400 Bad Request)
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

### Validation Rules
- Email must be valid and at least 5 characters long
- First name must be at least 3 characters long
- Last name must be at least 3 characters long
- Password must be at least 6 characters long
- All fields are required

## User Login
Login with existing user credentials.

### Endpoint
```
POST /users/login
```

### Request Body
```json
{
  "email": "string",    // required, valid email format
  "password": "string"  // required, minimum 6 characters
}
```

### Response

#### Success (200 OK)
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

#### Error (401 Unauthorized)
```json
{
  "message": "Invalid credentials"
}
```

#### Error (400 Bad Request)
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

### Validation Rules
- Email must be valid
- Password must be at least 6 characters long
- All fields are required

### Implementation Details
- Password is hashed using bcrypt with salt round 10
- Authentication uses JWT tokens
- MongoDB is used as the database
- Express-validator is used for input validation
- Socket ID support for real-time features
