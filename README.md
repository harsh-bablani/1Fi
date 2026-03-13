# 1Fi Full Stack Developer Assignment

A full-stack e-commerce web application that displays products with multiple EMI plans backed by mutual funds. It features a modern, ultra-vibrant UI and dynamic data loading from a backend MongoDB database.

## Tech Stack Used
*   **Frontend:** React, Vite, Tailwind CSS (v4)
*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB (mongoose)

## Setup and Run Instructions

### Prerequisites
*   Node.js installed (v18+)
*   MongoDB Atlas connection string 

### 1. Database Setup
1.  Navigate to the `backend` folder.
2.  Install dependencies: `npm install`
3.  Initialize the database with the seed script (this will wipe existing products and insert the 3 required products with their variants):
    ```bash
    node seed/seedData.js
    ```

### 2. Run the Backend API
From the `backend` directory, start the Express server (it will run on port 5000):
```bash
node server.js
```

### 3. Run the Frontend App
1.  Open a new terminal and navigate to the `frontend/1fi` folder.
2.  Install dependencies: `npm install`
3.  Start the Vite development server:
    ```bash
    npm run dev
    ```
4.  Open your browser and navigate to `http://localhost:5173/products/iphone-17-pro` or whichever URL Vite provided.

## Database Schema Used
**Collection Name:** `products`

```javascript
{
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true }, // URL parameter
  variant: { type: String }, // Base storage model
  mrp: { type: Number, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  colors: [{ type: String }], // Array of color variants (satisfies 2+ variants requirement)
  emiPlans: [
    {
      monthlyPayment: { type: Number, required: true },
      tenure: { type: Number, required: true }, // Months
      interestRate: { type: String, required: true },
      cashback: { type: Number, default: 0 }
    }
  ]
}
```

## API Endpoints and Example Responses

### 1. GET `/api/products`
Retrieves a list of all available products.

**Response (200 OK):**
```json
[
  {
    "_id": "64abcdef1234567890abcd12",
    "name": "iPhone 17 Pro",
    "slug": "iphone-17-pro",
    "variant": "256GB",
    "mrp": 134900,
    "price": 127400,
    "image": "https://dummyimage.com/...",
    "colors": ["orange", "silver", "blue"],
    "emiPlans": [ ... ]
  },
  // ... (Samsung and OnePlus products)
]
```

### 2. GET `/api/products/:slug`
Retrieves detailed information for a specific product by its URL-friendly slug.

**Example Request:** `GET /api/products/iphone-17-pro`

**Response (200 OK):**
```json
{
  "_id": "64abcdef1234567890abcd12",
  "name": "iPhone 17 Pro",
  "slug": "iphone-17-pro",
  "variant": "256GB",
  "mrp": 134900,
  "price": 127400,
  "image": "https://dummyimage.com/...",
  "colors": ["orange", "silver", "blue"],
  "emiPlans": [
    {
      "monthlyPayment": 44967,
      "tenure": 3,
      "interestRate": "0%",
      "cashback": 7500,
      "_id": "64abcdef..."
    },
    {
      "monthlyPayment": 4297,
      "tenure": 36,
      "interestRate": "10.5%",
      "cashback": 7500,
      "_id": "64abcdef..."
    }
  ],
  "__v": 0
}
```

**Error Response (404 Not Found):**
```json
{
  "message": "Product not found"
}
```
