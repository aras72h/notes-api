# Note-Taking API

## Overview

This is a Note-Taking API built with Node.js, Express, Sequelize, and PostgreSQL. It allows users to create, update, delete, and retrieve notes organized within notebooks and tagged for easy categorization.

## Features

- User registration and authentication
- CRUD operations for notebooks, notes, and tags
- Associating notes with tags
- Sequelize ORM for database management
- Environment variable configuration using dotenv

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
```

## Usage

1. Start the server:

    ```bash
    npm start
    ```

2. The server will be running on `http://localhost:3000`.

## API Endpoints

### User Routes

- **POST `/users`**: Register a new user
- **GET `/users/:id`**: Get a specific user's details
- **PUT `/users/:id`**: Update a user's details
- **DELETE `/users/:id`**: Delete a user

### Authentication Routes

- **POST `/auth/login`**: Log in a user
- **POST `/auth/logout`**: Log out a user

### Notebook Routes

- **POST `/notebooks`**: Create a new notebook
- **GET `/notebooks`**: Get all notebooks for the authenticated user
- **GET `/notebooks/:id`**: Get a specific notebook
- **PUT `/notebooks/:id`**: Update a specific notebook
- **DELETE `/notebooks/:id`**: Delete a specific notebook

### Note Routes

- **POST `/notes`**: Create a new note
- **GET `/notes`**: Get all notes for the authenticated user
- **GET `/notes/:id`**: Get a specific note
- **PUT `/notes/:id`**: Update a specific note
- **DELETE `/notes/:id`**: Delete a specific note

### Tag Routes

- **POST `/tags`**: Create a new tag
- **GET `/tags`**: Get all tags for the authenticated user
- **GET `/tags/:id`**: Get a specific tag
- **PUT `/tags/:id`**: Update a specific tag
- **DELETE `/tags/:id`**: Delete a specific tag

### Note-Tag Association Routes

- **POST `/notes/:noteId/tags/:tagId`**: Associate a tag with a note
- **DELETE `/notes/:noteId/tags/:tagId`**: Remove a tag from a note
