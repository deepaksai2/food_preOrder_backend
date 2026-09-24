# P15 — Food Pre-Order System Backend

Backend-only REST API for a cafeteria food pre-order system.

## Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- express-validator
- Postman

## Roles

### USER
- View menu
- Place orders
- View own orders
- Cancel eligible orders

### ADMIN
- Manage menu
- Activate/deactivate menu items
- View all orders
- Update order status

## Setup

```bash
npm install
```

Create `.env` from `.env.example`.

Example:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/food_preorder
JWT_SECRET=change_this_secret
JWT_EXPIRES_IN=1d
```

Seed the database:

```bash
npm run seed
```

Start development server:

```bash
npm run dev
```

API:

```text
http://localhost:5000
```

## Test Credentials

ADMIN:

```text
admin@cafeteria.com
Admin@123
```

USER:

```text
student@college.com
Student@123
```

## Main Endpoints

### Auth

```text
POST /api/auth/register
POST /api/auth/login
```

### Menu

```text
GET /api/menu
GET /api/menu/:id
POST /api/admin/menu
PUT /api/admin/menu/:id
PATCH /api/admin/menu/:id/status
DELETE /api/admin/menu/:id
```

### User Orders

```text
POST /api/orders
GET /api/orders/my
GET /api/orders/:id
PATCH /api/orders/:id/cancel
```

### Admin Orders

```text
GET /api/admin/orders
GET /api/admin/orders/:id
PATCH /api/admin/orders/:id/status
```

## Order Status Flow

```text
PLACED
  ↓
CONFIRMED
  ↓
PREPARING
  ↓
READY
  ↓
COMPLETED
```

A PLACED order can also be cancelled by its owner.

## Security

- Passwords are hashed using bcrypt.
- JWT is required for protected endpoints.
- ADMIN routes use role-based authorization.
- Users can only retrieve their own orders.
- Order totals are calculated on the server.
- Unavailable menu items cannot be ordered.
- JWT secrets and MongoDB credentials are stored in `.env`.

## Postman

Import:

```text
postman/Food-PreOrder.postman_collection.json
```

Set:

```text
baseUrl
userToken
adminToken
menuItemId
orderId
```

The collection includes successful API requests. Add the failure scenarios from the project specification when demonstrating validation and authorization.

## HTTP Status Codes

```text
200 OK
201 Created
204 No Content
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
500 Internal Server Error
```
