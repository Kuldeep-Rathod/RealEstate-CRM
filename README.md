# RealEstate-CRM

RealEstate-CRM is a backend application built with Node.js, Express, and MongoDB to manage real estate leads and user authentication. This project provides APIs for handling leads, user authentication, and role-based access control.

## Features

- **Lead Management:** Create, update, delete, and assign leads.
- **User Authentication:** Secure authentication using JWT.
- **Role-Based Access Control:** Different user roles with varying levels of access.
- **RESTful API:** Well-structured API endpoints.
- **MongoDB Database:** Data storage with Mongoose.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Kuldeep-Rathod/RealEstate-CRM.git
   cd RealEstate-CRM
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables:
   Create a `.env` file and add the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   ```

## Usage

### Run in Development Mode

```sh
npm run dev
```

### Run in Production Mode

```sh
npm start
```

### Build the Project

```sh
npm run build
```

### Watch for Changes (New Terminal)

```sh
npm run watch
```

## API Endpoints

### Auth

- **POST /api/v1/auth/register** - Register a new user
- **POST /api/v1/auth/login** - Login user
- **POST /api/v1/auth/logout** - Logout user

### Employee

- **GET api/v1/employees/:id** - Get user profile (protected)
- **PUT api/v1/employees/:id** - Update user profile (protected)
- **GET api/v1/employees** - Get all users (protected)
- **DELETE api/v1/employees/:id** - Delete user (protected)

### Leads

- **POST /api/v1/leads** - Create a new lead (protected)
- **GET /api/v1/leads** - Get all leads (protected)
- **GET /api/v1/leads/:id** - Get lead by ID (protected)
- **PUT /api/v1/leads/:id** - Update lead (protected)
- **DELETE /api/v1/leads/:id** - Delete lead (protected)

## Folder Structure

```
RealEstate-CRM/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.ts
│   ├── server.ts
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
├── README.md
```

## Technologies Used

- **Node.js** - Backend runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **TypeScript** - Typed JavaScript
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **dotenv** - Environment variables

## Contributing

Feel free to contribute to this project by creating pull requests or reporting issues.

## License

This project is licensed under the MIT License.

