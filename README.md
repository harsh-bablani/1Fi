# 1Fi Full Stack E‑commerce App

A full-stack e-commerce store prototype that displays products with multiple storage variants and EMI plans. It uses a modern React UI with a lightweight Node/Express API and MongoDB backend.

---

## 📦 Tech Stack

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** MongoDB (Mongoose)

---

## ⚙️ Setup & Run Instructions

### Prerequisites

- Node.js (v18+)
- MongoDB Atlas (or any MongoDB URI)

### 1) Backend Setup

1. Open a terminal and navigate to:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables (recommended):

   Create a `.env` file in `backend/` with:

   ```env
   MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
   ```

4. Seed the database (this will clear existing products and add the sample products):

   ```bash
   node seed/seedData.js
   ```

5. Run the backend server:

   ```bash
   node server.js
   ```

   The API will be available at: `http://localhost:5000`

---

### 2) Frontend Setup

1. In a new terminal, navigate to the frontend folder:

   ```bash
   cd frontend/1fi
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. (Optional) Create a `.env` file to override the API base URL in development:

   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. Start the dev server:

   ```bash
   npm run dev
   ```

   The app will open at `http://localhost:5173` (or whatever Vite provides).

---

## 🧭 API Endpoints

All API routes are prefixed with `/api`.

### `GET /api/products` — List all products

**Response example:**

```json
[
  {
    "_id": "...",
    "name": "iPhone 17 Pro",
    "slug": "iphone-17-pro",
    "variant": "256GB",
    "price": 127400,
    "mrp": 134900,
    "variants": [
      { "storage": "256GB", "price": 127400, "mrp": 134900, "stock": 12 },
      { "storage": "512GB", "price": 147400, "mrp": 154900, "stock": 9 }
    ],
    "image": "/iphone.jpg",
    "colors": ["orange", "silver", "blue"],
    "colorImages": [
      { "color": "orange", "image": "/iphone orange.jpg" }
    ],
    "emiPlans": [
      { "monthlyPayment": 44967, "tenure": 3, "interestRate": "0%", "cashback": 7500 }
    ]
  }
]
```

---

### `GET /api/products/:slug` — Get a single product

**Example:** `GET /api/products/iphone-17-pro`

**Response:** the full product object matching the slug.

---

### `PUT /api/products/:slug/variants/:storage` — Update pricing/stock (admin)

**Example:** `PUT /api/products/iphone-17-pro/variants/256GB`

**Payload:**

```json
{ "price": 120000, "mrp": 130000, "stock": 10 }
```

**Response:** Updated product object.

---

## 🧱 Schema (MongoDB / Mongoose)

### Product schema (`backend/models/Product.js`)

- `name` (String) — required
- `slug` (String) — required, unique
- `variant` (String) — legacy single-variant field
- `price` (Number) — required
- `mrp` (Number)
- `variants` (Array)
  - `storage` (String) — required
  - `price` (Number) — required
  - `mrp` (Number) — required
  - `stock` (Number)
- `image` (String)
- `colors` (Array of strings)
- `colorImages` (Array)
  - `color` (String) — required
  - `image` (String) — required
- `emiPlans` (Array)
  - `monthlyPayment` (Number)
  - `tenure` (Number)
  - `interestRate` (String)
  - `cashback` (Number)

---

## 🚀 Deployment Notes

### Backend (Render / similar)

- Make sure `MONGODB_URI` is set in the environment variables.
- The API is mounted at `/api`.

### Frontend (Vercel / Netlify / similar)

- Set `VITE_API_BASE_URL` to your backend’s `/api` URL (e.g. `https://your-backend.onrender.com/api`).

---

## 🧪 Testing the backend

From any machine, you can confirm the backend is working:

```bash
curl https://<your-backend-domain>/api/products
```

If you see a JSON array of products, the backend and DB are connected correctly.
