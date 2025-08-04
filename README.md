# Dental Center Management Dashboard

A full-featured web application for managing patients, appointments, and treatment records — designed for Admins and Patients with role-based access and clean user interface.

🔗 **Live Demo**: [https://dental-center-management-dashboard-kappa.vercel.app/](https://dental-center-management-dashboard-kappa.vercel.app/)

---

## Features

###  Admin View
- Secure Admin Login
- Manage Patients (Add / Edit / Delete)
- View and schedule Appointments
- Upload & preview file attachments
- Monthly / Weekly Calendar View
- Dashboard summary: Revenue, Appointment stats, Top Patients
- Export appointments to CSV
- Reset sample data for quick testing
- Toast notifications across actions
- Session timeout & logout flow

### Patient View
- Secure Patient Login
- View only their own appointments
- See upcoming appointments
- View appointment history with:
  - Reason
  - Amount
  - Status
  - Attached documents

---

##  Tech Stack

| Layer       | Technology                     |
|------------|---------------------------------|
| Frontend   | React (Vite)                    |
| Routing    | React Router DOM                |
| State      | React Context API               |
| Styling    | Custom CSS                      |
| Auth       | Role-based using `localStorage` |
| Forms      | Validated with toasts & logic   |
| File Upload| base64 with live previews       |
| Calendar   | `react-calendar`                |
| Notifications | `react-toastify`             |
| Export     | CSV download (custom utility)   |

---

## Folder Structure

```
src/
├── components/          # Reusable UI components (Navbar, AdminHeader, etc.)
├── context/             # AuthContext for login/session management
├── pages/               # Role-based pages: Dashboard, Login, Calendar, Patients, etc.
├── utils/               # Helper functions (e.g., CSV export)
├── localStorageInit.js  # Sample dataset initialization
├── index.css            # Global styles
└── main.jsx             # App entry
```

---

##  Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/your-username/dental-center-management-dashboard.git
cd dental-center-management-dashboard
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

> The app will start at `http://localhost:5173`

---

## Sample Credentials

### Admin
```
Email: admin@entnt.in
Password: admin123
```

### Patient (Example)
```
Email: ananya@entnt.in
Password: patient123
```

> More patients are pre-filled in the localStorage with realistic Indian data.

---

## Deployment

App is deployed using **Vercel**.  
Build command: `npm run build`  
Output folder: `dist`

---

## Technical Decisions

- Used **Context API** for simplicity and lightweight global state.
- Implemented **custom CSS** for full control and responsiveness.
- **react-calendar** for appointment calendar with highlight & toggle view.
- Opted for **toast notifications** for user feedback without cluttering the UI.
- Used **base64 encoding** for file uploads to persist inside localStorage (as required).
- Designed with **component reuse** and responsive layout throughout.

---

## Known Issues / Scope

- No backend/API — relies entirely on `localStorage`
- Auth is local, not secure for production
- File uploads are not persisted across browsers
- Responsive for desktop view; mobile responsiveness is basic

---

## 📬 Submission

Please find the final submission:

- ✅ Live Link: [https://dental-center-management-dashboard-kappa.vercel.app/](https://dental-center-management-dashboard-kappa.vercel.app/)
- ✅ GitHub Repo: [https://github.com/your-username/dental-center-management-dashboard](https://github.com/your-username/dental-center-management-dashboard)
