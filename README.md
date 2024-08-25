
# Node.js API for Managing Schools

This project is a Node.js API built using Express and MySQL to manage school information. It allows users to add new schools and list existing schools sorted by their proximity to a given location.

Table of Contents
Features
Prerequisites
Installation
Environment Variables
Running the Project
API Endpoints
Deployment
License

## Features
Add School: An endpoint to add a new school to the database.
List Schools: An endpoint to list all schools, sorted by distance from a given location.

## Prerequisites
Node.js: v18.x or higher
MySQL: Make sure you have MySQL installed and running locally or use a remote MySQL server.
Git: For version control and cloning the repository.

## Installation

```bash
git clone https://github.com/yourusername/nodejsapi.git
cd nodejsapi
```

## Dependency installation

```bash
npm install express mysql2 dotenv
```

## Create environment variables

DB_HOST=your_mysql_host
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_DATABASE=your_mysql_database
DB_PORT=3306 # Add if not using the default port
PORT=3000

## Running the Project
Start MySQL server
Run API
```bash
npm start
```

## Deployment 

To deploy your API, you can use services like Heroku, Vercel, or AWS. 
