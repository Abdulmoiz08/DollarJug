# DollarJug

DollarJug is a full-stack e-commerce web application built with the MERN stack. It provides a product browsing and shopping experience with customer accounts, cart management, checkout, payment processing, and an admin area for managing store operations.

## Features

### Customer
- Browse the product catalogue and view product details.
- Search and explore products in the shop.
- Register and log in to an account.
- Add products to the shopping cart and manage quantities.
- Proceed through the checkout flow.
- View profile and order-related pages.
- Access About, Contact, Return Policy, and Disclaimer pages.

### Admin
- Admin dashboard.
- Create, edit, and delete products.
- Upload product images.
- View and manage customer orders.
- Update order statuses.
- View registered users.
- Access analytics endpoints.

### Payments and backend
- Stripe Checkout Session integration.
- Server-side product and stock checks when creating a checkout session.
- JWT-based route protection and admin authorization middleware.
- MongoDB database integration.
- Image uploads handled with Multer and served from the backend uploads directory.

## Tech Stack

| Area | Technologies |
|---|---|
| Frontend | React, Vite, React Router |
| Styling | Tailwind CSS, DaisyUI |
| State management | Redux Toolkit, React Redux |
| HTTP requests | Axios |
| Backend | Node.js, Express |
| Database | MongoDB, Mongoose |
| Authentication | JSON Web Token (JWT), bcrypt |
| Payments | Stripe |
| File uploads | Multer |
| Other | CORS, dotenv, Nodemon |

## Project Structure

```text
DollarJug/
├── backend/
│   ├── config/          # Database and upload configuration
│   ├── controller/      # Request handlers and business logic
│   ├── middleware/      # Authentication and admin middleware
│   ├── model/           # Mongoose models
│   ├── routes/          # API routes
│   ├── uploads/         # Uploaded files (local development)
│   ├── index.js         # Express application entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── admin/       # Admin screens
│   │   ├── components/  # Reusable UI components
│   │   ├── context/     # Authentication context
│   │   ├── pages/       # Customer-facing pages
│   │   ├── redux/       # Redux store and slices
│   │   └── App.jsx
│   └── package.json
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/) (a current LTS version is recommended)
- npm
- A MongoDB database (local MongoDB or MongoDB Atlas)
- A Stripe account and API keys if you want to test the payment integration

### 1. Clone the repository

```bash
git clone https://github.com/Abdulmoiz08/DollarJug.git
cd DollarJug
```

### 2. Install dependencies

From the project root, run:

```bash
npm run install-all
```

This installs the root, backend, and frontend dependencies.

### 3. Configure environment variables

Create a `.env` file inside the `backend/` directory:

```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
STRIPE_SECRET_KEY=your_stripe_secret_key
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

Replace the example values with your own credentials and configuration.

**Important:** Never commit real API keys, database credentials, or other secrets to GitHub. Keep your `.env` file private.

### 4. Run the application

From the project root:

```bash
npm run dev
```

This starts:
- Backend API using Nodemon.
- Frontend development server using Vite.

The frontend normally runs at [http://localhost:5173](http://localhost:5173), and the backend uses the port configured in `backend/.env` (shown as `5000` above).

You can also start each part separately:

**Backend**
```bash
cd backend
npm run dev
```

**Frontend**
```bash
cd frontend
npm run dev
```

## API Routes

The backend mounts the following route groups:

| Route | Purpose |
|---|---|
| `/api/auth` | Registration, login, and admin user listing |
| `/api/products` | Product listing, details, and admin product management |
| `/api/orders` | Order creation, order retrieval, and status updates |
| `/api/payments` | Stripe checkout session creation and payment verification |
| `/api/analytics` | Admin analytics |

Some endpoints require authentication, and administrative operations require admin authorization.

### Payment endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/payments/order` | Create a Stripe Checkout Session |
| POST | `/api/payments/verify` | Verify a Checkout Session payment status |

## Available Scripts

### Root
| Command | Description |
|---|---|
| `npm run install-all` | Install root, backend, and frontend dependencies |
| `npm run dev` | Run backend and frontend concurrently |
| `npm run build` | Run the frontend build |
| `npm start` | Start the backend |

### Frontend
| Command | Description |
|---|---|
| `npm run dev` | Start Vite development server |
| `npm run build` | Build the frontend for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

### Backend
| Command | Description |
|---|---|
| `npm run dev` | Start backend with Nodemon |
| `npm start` | Start backend with Node.js |

## Deployment Notes

Configure the frontend and backend environments separately according to your hosting provider.

Backend environment variables:
- `PORT`
- `MONGO_URL`
- `STRIPE_SECRET_KEY`
- `FRONTEND_URL`
- `NODE_ENV`

Set `FRONTEND_URL` to the deployed frontend's origin in production. Add the deployed frontend origin to the backend CORS configuration if it is different from the configured origins.

For production, use a persistent or external image-storage solution for uploaded product images. Local filesystem uploads may not persist across redeployments or on hosts with ephemeral filesystems.

## Security

- Do not expose `STRIPE_SECRET_KEY` or MongoDB credentials in frontend code.
- Keep environment files out of version control.
- Use HTTPS in production.
- Protect admin routes and validate user input on the server.
- Review payment verification and order-creation flows before accepting real payments.

## Author

**Abdul Moiz Awan**

- GitHub: [@Abdulmoiz08](https://github.com/Abdulmoiz08)

---

If you find a bug or have a suggestion, feel free to open an issue in this repository.
