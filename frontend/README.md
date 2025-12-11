# AppZ Lab 3 - Frontend

React frontend application for AppZ Lab 3.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Backend Connection

The frontend connects to the user-service running on `http://localhost:8081`.

Make sure the backend services are running before testing the login functionality.

## Login Endpoint

The login page calls the `/authenticate` endpoint:
- Method: GET
- Parameters: `email` and `password` (query parameters)
- Returns: User object with id, email, role, etc.


