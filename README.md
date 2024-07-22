# Note-Taking API

## Overview

This is a Note-Taking API built with Node.js, Express, Sequelize, and PostgreSQL. It allows users to create, update, delete, and retrieve notes organized within notebooks and tagged for easy categorization.

## Features

- User registration and authentication
- CRUD operations for notebooks, notes, and tags
- Associating notes with tags
- Sequelize ORM for database management
- Environment variable configuration using dotenv

## Security Features

### Password Hashing

The application uses **bcrypt** for securely hashing user passwords. When a user registers or updates their password, it is hashed using bcrypt’s `hash` method with a salt rounds value of 10, ensuring that passwords are stored securely in the database.

**bcrypt** is a widely-used library that provides strong security by hashing passwords in a way that is resistant to brute-force attacks.

### Authentication

For authentication and managing user sessions, the application uses **jsonwebtoken** (JWT). JWTs are used to generate tokens upon user login, which are then used to authenticate subsequent requests.

**jsonwebtoken** allows us to create signed tokens that can be verified on the server to ensure that the user is authenticated. The tokens include user information and have a configurable expiration time to enhance security.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [User Routes](#user-routes)
  - [Authentication Routes](#authentication-routes)
  - [Notebook Routes](#notebook-routes)
  - [Note Routes](#note-routes)
  - [Tag Routes](#tag-routes)
  - [Note-Tag Association Routes](#note-tag-association-routes)
- [Security Features](#security-features)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/aras72h/notes-api.git
    cd notes-api
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up your PostgreSQL database and update the `.env` file with your database credentials.

## Environment Variables

Create a `.env` file in the root of the project and add the following environment variables:

```plaintext
PORT=3000
DATABASE_URL=postgres://username:password@host:port/database
SECRET_KEY=your_secret_key
```

## Usage

1. Start the server:

    ```bash
    npm start
    ```

2. The server will be running on `http://localhost:3000`.

## API Endpoints

### User Routes

- **POST `/api/users`**: Register a new user
- **GET `/api/users/:id`**: Get a specific user's details (requires authentication)
- **PUT `/api/users/:id`**: Update a user's details (requires authentication)
- **DELETE `/api/users/:id`**: Delete a user (requires authentication)

### Authentication Routes

- **POST `/api/login`**: Log in a user

### Notebook Routes

- **POST `/api/notebooks`**: Create a new notebook (requires authentication)
- **GET `/api/notebooks`**: Get all notebooks for the authenticated user (requires authentication)
- **GET `/api/notebooks/:id`**: Get a specific notebook (requires authentication)
- **PUT `/api/notebooks/:id`**: Update a specific notebook (requires authentication)
- **DELETE `/api/notebooks/:id`**: Delete a specific notebook (requires authentication)

### Note Routes

- **POST `/api/notes`**: Create a new note (requires authentication)
- **GET `/api/notes`**: Get all notes for the authenticated user (requires authentication)
- **GET `/api/notes/:id`**: Get a specific note (requires authentication)
- **PUT `/api/notes/:id`**: Update a specific note (requires authentication)
- **DELETE `/api/notes/:id`**: Delete a specific note (requires authentication)

### Tag Routes

- **POST `/api/tags`**: Create a new tag (requires authentication)
- **GET `/api/tags`**: Get all tags for the authenticated user (requires authentication)
- **GET `/api/tags/:id`**: Get a specific tag (requires authentication)
- **PUT `/api/tags/:id`**: Update a specific tag (requires authentication)
- **DELETE `/api/tags/:id`**: Delete a specific tag (requires authentication)

### Note-Tag Association Routes

- **POST `/api/notes/:noteId/tags/:tagId`**: Associate a tag with a note (requires authentication)
- **DELETE `/api/notes/:noteId/tags/:tagId`**: Remove a tag from a note (requires authentication)

## Security Features

### Password Hashing

The application uses **bcrypt** for securely hashing user passwords. When a user registers or updates their password, it is hashed using bcrypt’s `hash` method with a salt rounds value of 10, ensuring that passwords are stored securely in the database.

**bcrypt** is a widely-used library that provides strong security by hashing passwords in a way that is resistant to brute-force attacks.

### Authentication

For authentication and managing user sessions, the application uses **jsonwebtoken** (JWT). JWTs are used to generate tokens upon user login, which are then used to authenticate subsequent requests.

**jsonwebtoken** allows us to create signed tokens that can be verified on the server to ensure that the user is authenticated. The tokens include user information and have a configurable expiration time to enhance security.