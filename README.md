# 🚀 User Info API (REST + GraphQL)

A simple user information management system using **Node.js** and **Express**, exposing both **RESTful** and **GraphQL** APIs.

---

## 📦 Features

- ✅ View all users
- ✅ Get a single user by ID
- ✅ Add a new user
- ✅ Update a user by ID
- ✅ Delete a user by ID
- ✅ GraphQL support for flexible querying and mutations

---

## 🛠️ Technologies Used

- Node.js
- Express
- GraphQL
- express-graphql

---

## 📁 Project Structure

```
user-info-api/
├── rest-api/
│   ├── server.js
│   ├── package.json
│   └── README.md
├── graphql-api/
│   ├── server.js
│   ├── package.json
│   └── README.md
└── README.md (this file)
```

---

# 📄 REST API – README

## 🧑‍💻 Setup Instructions

### 1. Clone the Repository:

```bash
git clone https://github.com/yourusername/rest-api.git
cd rest-api
```

### 2. Install Dependencies:

```bash
npm install
```

### 3. Start the Server:

```bash
node server.js
```

Server will run at: [http://localhost:3000](http://localhost:3000)

---

## 📬 REST API Endpoints

| Method | Endpoint       | Description        |
|--------|----------------|--------------------|
| GET    | /users         | Get all users      |
| GET    | /users/:id     | Get user by ID     |
| POST   | /users         | Add a new user     |
| PUT    | /users/:id     | Update user by ID  |
| DELETE | /users/:id     | Delete user by ID  |

---

## 📦 Sample User JSON

```json
{
  "name": "Alice",
  "email": "alice@example.com"
}
```

---

## 🧪 Testing the REST API

Use tools like:

- Postman
- Insomnia
- curl (CLI)

---

# 📄 GraphQL API – README

## 🧑‍💻 Setup Instructions

### 1. Clone the Repository:

```bash
git clone https://github.com/yourusername/graphql-api.git
cd graphql-api
```

### 2. Install Dependencies:

```bash
npm install
```

### 3. Start the Server:

```bash
node server.js
```

Server will run at: [http://localhost:4000/graphql](http://localhost:4000/graphql)

---

## 🔍 Example Queries and Mutations

### 📋 Query All Users

```graphql
{
  users {
    id
    name
    email
  }
}
```

### 🔍 Query a User by ID

```graphql
{
  user(id: 1) {
    name
    email
  }
}
```

### ➕ Add a User (Mutation)

```graphql
mutation {
  addUser(name: "Charlie", email: "charlie@example.com") {
    id
    name
    email
  }
}
```

### ✏️ Update a User (Mutation)

```graphql
mutation {
  updateUser(id: 1, name: "Alice Updated", email: "newalice@example.com") {
    id
    name
    email
  }
}
```

### ❌ Delete a User (Mutation)

```graphql
mutation {
  deleteUser(id: 2) {
    id
    name
  }
}
```

---

## 🧪 Test with GraphiQL

Open [http://localhost:4000/graphql](http://localhost:4000/graphql) in your browser and interact with your GraphQL API using GraphiQL.
