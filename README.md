# CMS Backend

A robust Node.js API for managing users and clients, built with Express and MySQL.

## Features

- **User & Client Management**: Full CRUD operations.
- **Authentication**: Secure JWT-based user authentication.
- **Database**: Integrated with MySQL.

## Quick Start

### Clone the Repository

```bash
git clone https://github.com/Adarshpadval/user-management-system.git
cd user-management-system
```
### Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=db_cms
PORT=3000
JWT_SECRET=your_static_jwt_secret
```

## Test Database Connection
```bash
node src/testConnection.js
```
##Start the Server
```bash
npm start
```
# API Endpoints
## Users
- **GET /api/users - Fetch all users
- **GET /api/users/:id - Fetch a user by ID
- **POST /api/users - Create a new user
- **PUT /api/users/:id - Update a user
- **DELETE /api/users/:id - Delete a user

 # Explore more from it client and admin routes
# License
- ** MIT License - Feel free to use and modify.