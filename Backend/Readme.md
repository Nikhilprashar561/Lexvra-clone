# Backend API Guide

This backend is built for the company website with a simple Express + TypeScript + MongoDB structure.

## Run locally

1. Install dependencies
   ```bash
   npm install
   ```
2. Create a `.env` file with the required values
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   ADMIN_JWT_SECRET=your_admin_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_CLOUD_API_KEY=your_api_key
   CLOUDINARY_CLOUD_API_SECRET=your_api_secret
   ```
3. Start the server
   ```bash
   npm run dev
   ```

## Public APIs

These APIs can be used without admin login.

- Contact form
  - `POST /api/v1/contact/create-contact`
- Gallery list
  - `GET /api/v1/gallery/get-gallery`
- Job openings list
  - `GET /api/v1/careers/get-job-openings`
- Apply for a job
  - `POST /api/v1/careers/apply-for-job/:id`

## Admin APIs

These APIs require admin authentication using a JWT cookie named `accessToken`.

### Admin auth
- `POST /api/v1/admin/register`
- `POST /api/v1/admin/login`

### Admin monitoring
- `GET /api/v1/admin/contacts`
- `GET /api/v1/admin/applications`

### Admin job management
- `POST /api/v1/careers/new-job-opening`
- `PUT /api/v1/careers/update-job-opening/:id`
- `DELETE /api/v1/careers/delete-job-opening/:id`

### Admin gallery upload
- `POST /api/v1/gallery/create-gallery`

## Notes

- Admin account creation is one-time only.
- Admin login sets the secure cookie automatically.
- Gallery and resume uploads are sent to Cloudinary.
