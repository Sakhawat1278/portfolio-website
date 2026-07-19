# Sakhawat Hossain Sohan | Portfolio Website

A high-performance, premium portfolio built with React 19, Vite, and Framer Motion.

## 🚀 Hostinger Deployment Guide

This project has been adjusted for **Hostinger Business Web Hosting** or **Cloud Hosting** using the **Node.js Web Apps** feature.

### 1. Build the Project
First, generate the production build on your local machine:
```bash
npm run build
```
This creates a `dist` folder containing your optimized frontend.

### 2. Prepare Files for Upload
You need to upload the following files/folders to your Hostinger server (typically via File Manager or FTP):
- `dist/` (The entire folder)
- `server.js` (The Node.js entry point)
- `package.json`
- `package-lock.json`
- `.env` (Create this on the server for your SMTP credentials)

### 3. Configure Node.js on Hostinger hPanel
1.  Go to **Websites** -> **Manage** -> **Node.js**.
2.  Create a new **Node.js Web App**.
3.  Set the **Entry File** to `server.js`.
4.  Set the **App Root** to the directory where you uploaded the files.
5.  Click **Install Dependencies** (or run `npm install` via SSH).
6.  **Environment Variables:** Add the following in the hPanel Environment Variables section:
    - `SMTP_PASSWORD`: Your Hostinger email password.
    - `SMTP_USER`: `contact@sohanux.com`
    - `PORT`: 3000 (Hostinger usually manages this, but 3000 is default).

### 4. Start the Application
Once dependencies are installed, click **Run** or **Start**. Your website will now serve the React frontend and handle contact form submissions via the Express server.

---

## 🛠 Tech Stack
- **Frontend:** React 19, Vite, TypeScript, Framer Motion
- **Backend:** Node.js (Express), Nodemailer
- **Scrolling:** Lenis Smooth Scroll
- **Icons:** Custom SVGs
- **Theming:** Light/Dark Mode (CSS Variables)

## 📁 Directory Structure
- `src/`: React source code
- `api/`: Vercel/Netlify serverless functions (legacy/backup)
- `server.js`: Main server for Hostinger/VPS deployment
- `public/`: Static assets (images, videos, PDF)
- `dist/`: Compiled production build
