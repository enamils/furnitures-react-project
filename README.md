# 🛋️ FURNITURES REACT PROJECT

A modern e-commerce furniture website with blog management system, built with React, TypeScript, and Supabase.

> **Based on**: [ThemeWagon Furni Template](https://themewagon.github.io/furni/index.html)  
> **Enhanced with**: Full-stack features including authentication, cart management, blog CMS, and order processing.

## 📁 Project Structure

```
furnitures-react-project/
├── frontend/         # SPA - React + TypeScript + Vite
└── scripts/          # Migration & setup scripts (archived)
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

### Backend (Supabase)
- **PostgreSQL** - Database
- **Supabase Auth** - Authentication
- **Supabase Storage** - Image hosting
- **Row Level Security** - Data protection

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
- Supabase account (free tier available at [supabase.com](https://supabase.com))

### Supabase Setup

1. **Create a Supabase project** at [https://supabase.com/dashboard](https://supabase.com/dashboard)

2. **Run the SQL schema** from [MIGRATION_SUPABASE.md](MIGRATION_SUPABASE.md) in your Supabase SQL Editor to create tables

3. **Configure environment variables**:
```bash
cd frontend
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

Get these from: **Supabase Dashboard** → **Settings** → **API**

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
✅ Frontend runs on `http://localhost:5173`

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

## 📂 Database Structure

### Tables
- **products** - Product catalog
- **teams** - Team members
- **posts** - Blog posts (with user_id for author tracking)
- **orders** - Customer orders
- **images** - Selectable images for blog posts

### Storage Buckets
- **products** - Product images
- **teams** - Team member photos
- **posts** - Blog post images

### Authentication
- Managed by Supabase Auth
- Row Level Security (RLS) policies applied
- Users can only modify their own posts

For detailed schema, see [MIGRATION_SUPABASE.md](MIGRATION_SUPABASE.md)

## 🔧 Development Commands

### Frontend
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 📝 Notes

- All blog post operations (create, edit, delete) require authentication
- Cart data persists in localStorage
- Authentication managed by Supabase Auth
- E2E tests run on 3 browsers: Chromium, Firefox, and WebKit
- Images hosted on Supabase Storage
- PostgreSQL database with Row Level Security


## 📄 License

This project is open source and available for educational purposes.
