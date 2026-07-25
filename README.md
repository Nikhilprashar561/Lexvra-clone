# AuraAgency - Full-Stack Next.js 14 Web Application

A complete, production-ready Full-Stack Agency website and Admin Management Portal built with **Next.js App Router**, **TypeScript**, **Tailwind CSS**, **Shadcn UI**, **MongoDB / Mongoose**, **Zod Validation**, and **Recharts Data Visualization**.

---

## Key Features

### Public Agency Website
- **Modern Responsive Design**: Default white background with black typography, customizable dark mode toggle.
- **Hero Section & Metrics**: Animated badges, stats counters, key capabilities, and clear call-to-action flows.
- **Services Showcase**: Interactive feature grid highlighting agency offerings.
- **Portfolio & Gallery**: Dynamic showcase fetched from Next.js API with lightbox view.
- **Careers & Job Board**: Interactive open positions, department filters, and full application modal with resume upload & Zod validation.
- **Contact Page**: Contact form with server-side & client-side Zod validation, fast toast feedback, and agency contact details.

### Hidden Admin Portal (`/admin`)
- **Route Protection & JWT Auth**: Secured with HTTP-only cookies and JWT secret verification.
- **One-time Admin Initialization**: Automatically detects if admin is registered (`/admin/login`).
- **Overview Dashboard & Analytics**:
  - Recharts Area Chart for monthly inquiries & application trends.
  - Recharts Donut Chart for department distribution.
  - Live metric counters for Contacts, Job Applications, Active Jobs, and Showcase Items.
- **Contact Inquiries Inbox**: Searchable table of inquiries with detailed view modal.
- **Job Applications Manager**: Candidate review table, resume download link, applicant profile viewer.
- **Job Postings CRUD**: Add, edit, and delete job openings using Shadcn Dialog forms.
- **Gallery Manager**: Upload new showcase projects (image file/url, title, description) and delete existing items.

---

## Tech Stack & Libraries

- **Framework**: Next.js 14 (App Router, Server API Route Handlers)
- **Language**: TypeScript (`strict: true`)
- **Styling**: Tailwind CSS, CSS Variables for Shadcn UI
- **Theme**: `next-themes` (Light mode by default, Dark mode toggleable)
- **Components**: Shadcn UI primitives (Button, Card, Input, Textarea, Badge, Dialog, Table, Select)
- **Icons**: `lucide-react`
- **Charts**: `recharts`
- **Database**: MongoDB + Mongoose (with connection pooling helper for serverless routes)
- **Validation**: `zod`
- **Notifications**: `sonner`

---

## Environment Configuration (`.env`)

Create a `.env` file in the root folder with the following variables:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/agency_db
ADMIN_JWT_SECRET=your_secure_admin_jwt_secret_key

# Cloudinary (Optional - system falls back to data URLs if missing)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_CLOUD_API_KEY=your_api_key
CLOUDINARY_CLOUD_API_SECRET=your_api_secret
```

---

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Access Admin Portal**:
   Navigate to [http://localhost:3000/admin/login](http://localhost:3000/admin/login).

4. **Production Build**:
   ```bash
   npm run build
   npm run start
   ```
