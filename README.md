# Remedicart – Online Pharmacy Platform

> **Simplifying the way you buy medicines**

A full-stack medical e-commerce platform built with **React + Vite** on the frontend and **Supabase** as the backend.

---

## 🚀 Tech Stack

| Layer       | Technology                         |
|-------------|-------------------------------------|
| Frontend    | React 18 + Vite                    |
| Routing     | React Router DOM v6                |
| Backend     | Supabase (Auth + PostgreSQL DB)    |
| Styling     | Vanilla CSS (custom design system) |
| State       | React Context (Auth + Cart)        |

---

## 📁 Folder Structure

```
remedicart-app/
├── src/
│   ├── admin/               # Admin panel pages
│   │   ├── AdminLayout.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminProducts.jsx
│   │   ├── AdminOrders.jsx
│   │   └── AdminUsers.jsx
│   ├── assets/              # Static assets (logo etc.)
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx/css
│   │   ├── Footer.jsx/css
│   │   ├── ProductCard.jsx/css
│   │   ├── SearchBar.jsx/css
│   │   └── CategoryFilter.jsx/css
│   ├── context/             # React Context providers
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   ├── pages/               # Route pages
│   │   ├── Home.jsx/css
│   │   ├── ProductListing.jsx/css
│   │   ├── ProductDetails.jsx/css
│   │   ├── Cart.jsx/css
│   │   └── Auth.jsx/css
│   ├── services/            # Supabase API layer
│   │   ├── supabase.js
│   │   ├── authService.js
│   │   ├── productService.js
│   │   ├── orderService.js
│   │   └── userService.js
│   ├── App.jsx              # Root component + routing
│   ├── main.jsx             # Entry point
│   └── index.css            # Global CSS design system
├── .env                     # Environment variables (DO NOT COMMIT)
├── .env.example             # Safe template for env vars
└── index.html
```

---

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Copy your Project URL and Anon Key
3. Edit `.env` file:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Set Up Database Tables

Run the following SQL in your **Supabase SQL Editor**:

```sql
-- PRODUCTS TABLE
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  category TEXT CHECK (category IN ('tablets','syrups','capsules','vitamins','skincare','devices')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- USERS TABLE (mirrors auth.users)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ORDERS TABLE
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','processing','shipped','delivered','cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 4. Set Up Row Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Products: anyone can read, only admins write
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Admin manage products" ON products FOR ALL
  USING (EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin'));

-- Users: users can read own profile
CREATE POLICY "Users read own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users insert own profile" ON users FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Admin read all users" ON users FOR SELECT
  USING (EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin'));

-- Orders: users manage own orders, admins see all
CREATE POLICY "Users manage own orders" ON orders FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Admin manage all orders" ON orders FOR ALL
  USING (EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin'));
```

### 5. Make Yourself an Admin

After registering on the app, run in Supabase SQL Editor:

```sql
UPDATE users SET role = 'admin' WHERE email = 'your@email.com';
```

### 6. Start Development Server

```bash
npm run dev
```

---

## 📄 Pages & Routes

| Route              | Component           | Access     |
|--------------------|---------------------|------------|
| `/`                | Home                | Public     |
| `/products`        | ProductListing      | Public     |
| `/products/:id`    | ProductDetails      | Public     |
| `/cart`            | Cart                | Public     |
| `/auth`            | Auth (Login/Reg)    | Public     |
| `/admin`           | AdminDashboard      | Admin only |
| `/admin/products`  | AdminProducts       | Admin only |
| `/admin/orders`    | AdminOrders         | Admin only |
| `/admin/users`     | AdminUsers          | Admin only |

---

## 🎨 Design System

Colors inspired by the Remedicart logo:

| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | `#1a2d5a` | Navy blue – main brand |
| `--color-teal` | `#5bbcb8` | Teal – accents, CTA |
| `--color-coral` | `#f06b8b` | Coral – secondary accent |
| `--color-orange` | `#f0a04b` | Warm orange – highlights |
