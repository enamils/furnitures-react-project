# 🛋️ FURNITURES REACT PROJECT

A modern e-commerce furniture website with blog management system, built with React, TypeScript, and Node.js.

> **Based on**: [ThemeWagon Furni Template](https://themewagon.github.io/furni/index.html)  
> **Enhanced with**: Full-stack features including authentication, cart management, blog CMS, and order processing.

## 📁 Project Structure

```
furnitures-react-project/
├── backend/          # REST API - Node.js + Express
└── frontend/         # SPA - React + TypeScript + Vite
```

## 🚀 Technologies

### Frontend
- **React 19** with TypeScript
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **React Router** - Routing
- **TanStack Query** - Data fetching & caching
- **React Hot Toast** - Notifications
- **Context API** - State management (Auth & Cart)

### Backend
- **Node.js** + **Express** - REST API
- **JSON files** - Data storage
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Testing
- **Vitest** - Unit & Component tests
- **React Testing Library** - Component testing
- **Playwright** - E2E tests (Chromium, Firefox, WebKit)

## ✨ Features

### 🔐 Authentication & Authorization
- User registration with email & password validation
- Login with JWT token-based authentication
- Protected routes for authenticated users
- Auto-logout on token expiration

### 🛒 E-commerce
- **Product catalog** with detailed views
- **Shopping cart** with add/remove/update quantity
- **Checkout process** with order form validation
- **Order confirmation** with order ID tracking
- Cart persists across sessions

### 📝 Blog Management (CMS)
- **Create posts** with title, author, and image selection
- **Edit posts** - Update existing blog posts
- **Delete posts** - Remove posts with confirmation modal
- **View posts** - Display on home page (Recent Blog) and dedicated blog page
- **Protected routes** - Only authenticated users can create/edit/delete posts

### 📄 Additional Pages
- **Home** - Hero section, featured products, recent blog posts, testimonials
- **Shop** - Full product catalog
- **About Us** - Team presentation
- **Services** - Services showcase
- **Contact** - Contact form

### 🎨 UI Components
- Responsive design (mobile, tablet, desktop)
- Reusable components (Buttons, Inputs, Modals, Accordions, Sliders)
- Loading states & skeletons
- Error handling with user-friendly messages
- Toast notifications for user feedback

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
npm start
```
✅ Backend runs on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
✅ Frontend runs on `http://localhost:5173`

**⚠️ Important**: Both servers must be running simultaneously.

## 🧪 Testing

### Unit & Component Tests (Vitest)

```bash
cd frontend

# Run tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

**Tested Components**:
- UI Components: Button, Input, Select, Modal, Accordion, Slider, InfoBlock, ErrorBlock, SuccessBlock
- Feature Components: Logout, BlogPost, Cart

### E2E Tests (Playwright)

```bash
cd frontend

# Run all E2E tests
npm run test:e2e

# Run with UI mode
npm run test:e2e:ui

# Run in headed mode (see browser)
npm run test:e2e:headed

# Debug mode
npm run test:e2e:debug

# View test report
npm run test:e2e:report
```

**E2E Test Scenarios**:
1. **Authentication Flow** (`auth-complete-scenario.spec.ts`)
   - Register → Login → Logout → Re-login

2. **Blog Management** (`blog-post-management.spec.ts`)
   - Register → Create post → Edit post → Delete post

3. **Purchase Flow** (`complete-purchase-flow.spec.ts`)
   - Login/Register → Add product to cart → Update quantity → Checkout → Order confirmation

## 🎯 User Flow

### Creating & Managing Blog Posts

1. **Registration**: Create an account on `/login` page
2. **Login**: Authenticate with email & password
3. **Navigate to Blog**: Go to `/blog` page
4. **Create Post**: Click "Create a New Post" button
5. **Fill Form**: Enter title, author, select an image
6. **Submit**: Post appears in Recent Blog section
7. **Edit**: Click "Edit post" to modify
8. **Delete**: Click "Delete post" and confirm in modal

### Shopping & Checkout

1. **Browse**: Visit `/shop` page
2. **Add to Cart**: Click product to add to cart
3. **View Cart**: Go to `/cart` page
4. **Update**: Modify quantities with +/- buttons
5. **Checkout**: Click "Proceed to checkout"
6. **Fill Form**: Enter shipping & billing information
7. **Place Order**: Submit order and receive confirmation

## 📂 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create new post (Auth required)
- `PATCH /api/posts/:id` - Update post (Auth required)
- `DELETE /api/posts/:id` - Delete post (Auth required)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order by ID

### Teams
- `GET /api/teams` - Get team members

## 🔧 Development Commands

### Frontend
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend
```bash
npm start            # Start server on port 5000
```

## 📝 Notes

- All blog post operations (create, edit, delete) require authentication
- Cart data persists in localStorage
- JWT tokens expire after 1 hour
- E2E tests run on 3 browsers: Chromium, Firefox, and WebKit
- Backend uses JSON files for data storage (no database required)


## 📄 License

This project is open source and available for educational purposes.
