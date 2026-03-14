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
