# Pet Management API 🐾

A full-stack Node.js application that integrates with the Petfinder API to manage users and their pets. Users can browse available animals from Petfinder and add them to their profiles.

## 📋 Project Overview

This Pet Management API allows users to:
- Create and manage user profiles
- Browse animals from the Petfinder API
- Add animals to user profiles
- View user profiles with their associated pets
- Get detailed information about different animal types and breeds

### 🛠 Tech Stack
- **Backend**: Node.js, Express.js
- **API Integration**: Petfinder API v2
- **Authentication**: JWT tokens
- **Data Storage**: In-memory data storage with file-based models
- **Logging**: Custom Winston-based logging system

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Petfinder API credentials

### 1. Clone the Repository
```bash
git clone <repository-url>
cd PetManagement
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:

```env
PORT=6000

API_KEY=your_petfinder_api_key_here
API_SECRET=your_petfinder_secret_here

JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_secure_123456
MODE=development
```

**To get Petfinder API credentials:**
1. Visit [Petfinder Developers](https://www.petfinder.com/developers/)
2. Create an account and new application
3. Copy your API Key and Secret to the `.env` file

### 4. Start the Application

#### Development Mode
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

The server will start on `http://localhost:6000`

## 📚 API Documentation

### Base URL
```
http://localhost:6000/api
```

## 👥 User Management

### Get All Users
```http
GET /api/users/
```

**Response:**
```json
{
    "URL": "http://localhost:6000/api/users",
    "message": "Retrieved all users from DB",
    "users": [
        {
            "id": "1",
            "name": "John Doe",
            "email": "john@example.com",
            "city": "newyork",
            "age": 25,
            "pet_ids": []
        }
    ]
}
```

### Create New User
```http
POST /api/users/
Content-Type: application/json
```

**Request Body:**
```json
{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "city": "Los Angeles",
    "age": 28,
    "password": "securepass123"
}
```

**Response:**
```json
{
    "URL": "http://localhost:6000/api/users",
    "message": "User created successfully",
    "user": {
        "id": "1672534567890",
        "name": "Jane Smith",
        "email": "jane@example.com",
        "city": "losangeles",
        "age": 28,
        "pet_ids": []
    }
}
```

### Get User by ID
```http
GET /api/users/{user_id}
```

**Response:**
```json
{
    "URL": "http://localhost:6000/api/users/1",
    "message": "Fetched user by id: 1",
    "user": {
        "id": "1",
        "name": "John Doe",
        "email": "john@example.com"
    },
    "pets": [
        {
            "id": "12345",
            "name": "Buddy",
            "type": "Dog",
            "breed": "Golden Retriever"
        }
    ]
}
```

### Update User
```http
PUT /api/users/{user_id}
Content-Type: application/json
```

**Request Body:**
```json
{
    "name": "John Updated",
    "city": "Boston",
    "age": 26
}
```

### Delete User
```http
DELETE /api/users/{user_id}
```

## 🐕 Pet Management

### Get All Animals (from Petfinder)
```http
GET /api/pets/allanimals/
```

**Response:**
```json
{
    "message": "good",
    "data": [
        {
            "id": "12345",
            "type": "Dog",
            "name": "Buddy",
            "breed": "Golden Retriever",
            "color": "Golden",
            "gender": "Male",
            "age": "Adult",
            "size": "Large"
        }
    ]
}
```

### Get Animal Breeds by Type
```http
GET /api/pets/getallbreeds/{type}
```

**Examples:**
```http
GET /api/pets/getallbreeds/dog
GET /api/pets/getallbreeds/cat
```

### Get Animal Type Information
```http
GET /api/pets/getsingleanimal/{type}
```

**Examples:**
```http
GET /api/pets/getsingleanimal/dog
GET /api/pets/getsingleanimal/cat
```

### Get Animal by ID
```http
GET /api/pets/animal/{animal_id}
```

**Example:**
```http
GET /api/pets/animal/12345
```

## 🔗 User-Pet Integration

### Add Animal to User
```http
POST /api/users/{user_id}/animals/{animal_id}
```

**Example:**
```http
POST /api/users/1/animals/12345
```

**Response:**
```json
{
    "URL": "http://localhost:6000/api/users/1/animals",
    "message": "Added animal to user by id:1",
    "user": {
        "id": "1",
        "name": "John Doe",
        "pet_ids": ["12345"]
    },
    "addedAnimal": {
        "id": "12345",
        "name": "Buddy",
        "type": "Dog",
        "breed": "Golden Retriever"
    }
}
```

## 🧪 Testing with Postman

### Complete Workflow Example

#### 1. Create a user:
```http
POST http://localhost:6000/api/users/
Content-Type: application/json

{
    "name": "Pet Lover",
    "email": "petlover@example.com",
    "city": "Miami",
    "age": 35,
    "password": "ilovepets123"
}
```

#### 2. Get available animals:
```http
GET http://localhost:6000/api/pets/allanimals/
```

#### 3. Add an animal to the user (copy animal ID from step 2):
```http
POST http://localhost:6000/api/users/1672534567890/animals/12345
```

#### 4. Verify user now has pets:
```http
GET http://localhost:6000/api/users/1672534567890
```

### Additional Test Cases

#### Get Dog Breeds:
```http
GET http://localhost:6000/api/pets/getallbreeds/dog
```

#### Get Cat Breeds:
```http
GET http://localhost:6000/api/pets/getallbreeds/cat
```

#### Update User:
```http
PUT http://localhost:6000/api/users/1
Content-Type: application/json

{
    "name": "Updated Name",
    "city": "New City"
}
```

#### Error Handling Test (Invalid User):
```http
GET http://localhost:6000/api/users/999
```

#### Error Handling Test (Invalid Data):
```http
POST http://localhost:6000/api/users/
Content-Type: application/json

{
    "name": "",
    "email": "invalid-email",
    "age": 15,
    "password": "123"
}
```

## 🏗 Project Structure

```
PetManagement/
├── controller/          # Request handlers
│   ├── user.controller.js
│   └── pet.controller.js
├── dal/                # Data Access Layer
│   ├── user.dal.js
│   └── auth.dal.js
├── data/               # In-memory data storage
│   └── users.js
├── models/             # Data models and validation
│   └── user.model.js
├── routes/             # API route definitions
│   ├── index.js
│   ├── user.routes.js
│   └── pet_api.routes.js
├── services/           # Business logic
│   ├── user.service.js
│   └── pet.service.js
├── utils/              # Utility functions
│   ├── token.js
│   ├── logger.js
│   └── dateTimeFormater_il.js
├── config/             # Configuration
│   └── index.js
├── logs/               # Application logs
├── .env                # Environment variables
├── .gitignore
└── package.json
```

## 🔧 Available Scripts

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start

# View logs
tail -f logs/app.log
```

## 🚨 Error Handling

The API includes comprehensive error handling:

- **400**: Bad Request (validation errors)
- **404**: Not Found (user/animal not found)
- **500**: Internal Server Error

**Example Error Response:**
```json
{
    "message": "Failed to create user",
    "errors": [
        "A valid email is required",
        "Age must be a number greater than or equal to 18"
    ]
}
```

## 📝 Features

- ✅ User CRUD operations
- ✅ Petfinder API integration
- ✅ Automatic token refresh for Petfinder API
- ✅ User-pet relationship management
- ✅ Input validation
- ✅ Comprehensive logging
- ✅ Error handling
- ✅ RESTful API design

## 🔍 Troubleshooting

### Common Issues

#### 1. Petfinder API 401 Error
```bash
# Check your .env file has valid credentials
# Test credentials manually at https://api.petfinder.com/v2/oauth2/token
```

#### 2. Port Already in Use
```bash
# Kill process using port 6000
npx kill-port 6000

# Or use different port in .env
PORT=3000
```

#### 3. Module Not Found Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Happy coding! 🐾**

For support or questions, please open an issue on GitHub.