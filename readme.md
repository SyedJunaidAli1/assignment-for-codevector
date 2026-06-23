# CodeVector Internship - Take Home Assignment

## Overview

This project implements a backend service for browsing a large product catalog (~200,000 products).

Features:

* Browse products ordered by newest first
* Filter products by category
* Cursor-based pagination
* Seed script to generate 200,000 products
* MongoDB indexing for fast queries

## Tech Stack

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose

## Why I Chose This Stack

I chose MongoDB and Express because they are lightweight and allow efficient implementation of cursor-based pagination.

MongoDB's ObjectId and indexing capabilities work well for large datasets and allow pagination without relying on offset/skip-based queries.

---

## Data Model

Each product contains:

* `_id` (MongoDB unique identifier)
* `name`
* `category`
* `price`
* `createdAt`
* `updatedAt`

Example:

```json
{
  "_id": "...",
  "name": "Product 1",
  "category": "Books",
  "price": 299.99,
  "createdAt": "...",
  "updatedAt": "..."
}
```

---

## Database Indexes

Indexes used:

```js
{
  updatedAt: -1,
  _id: -1
}
```

Used for sorting and cursor pagination.

```js
{
  category: 1,
  updatedAt: -1,
  _id: -1
}
```

Used when filtering by category.

These indexes allow efficient retrieval without scanning the full collection.

---

## Pagination Strategy

### Why Not Offset Pagination?

A traditional approach using:

```js
skip((page - 1) * limit)
```

can produce duplicate or missing records when products are inserted or updated while users are browsing.

Example:

1. User loads page 1.
2. New products are inserted.
3. User loads page 2.
4. Some products may appear twice or be skipped.

### Cursor Pagination

This implementation uses cursor pagination.

The API returns a `nextCursor` representing the last item in the current page.

Example:

```http
GET /api/products?limit=10
```

Response:

```json
{
  "products": [...],
  "nextCursor": "..."
}
```

Next request:

```http
GET /api/products?limit=10&cursor=...
```

This approach avoids duplicates and missing records while maintaining fast query performance.

---

## API Endpoints

### Get Products

```http
GET /api/products
```

Optional query parameters:

```http
?limit=10
?category=Books
?nextcursor=<cursor>
```

Examples:

```http
GET /api/products?limit=10

GET /api/products?limit=10&category=Books

GET /api/products?limit=10&nextcursor=<cursor>

GET /api/products?limit=10&category=Books&nextcursor=<cursor>
```

---

## Seeding Data

The repository includes a seed script that generates 200,000 products.

To run:

```bash
npm run seed
```

The script inserts products in batches using `insertMany()` for better performance.

---

## Running Locally

Install dependencies:

```bash
npm install
```

Create `.env`:

```env
PORT=8000
DATABASE_URL=<your_mongodb_connection_string>
```

Start the server:

```bash
npm run dev
```

---

## Improvements With More Time

* Add cursor support for previous page navigation.
* Add validation for query parameters.
* Add automated tests.
* Add API documentation using Swagger/OpenAPI.
* Add rate limiting and caching.
* Add a frontend interface for browsing products.

---

## AI Usage

AI tools were used to:

* Discuss pagination approaches.
* Compare offset and cursor pagination.
* Review database indexing strategies.
* Validate implementation ideas.

The final implementation and design decisions were reviewed and understood before being applied.
