# ScanBorrow Frontend

## Overview

ScanBorrow Frontend is a React-based user interface for the QR-Based Smart Library Borrowing System. It provides separate interfaces for students and administrators.

---

## Technology Stack

* React.js
* Tailwind CSS
* React Router DOM
* Axios
* React Toastify
* html5-qrcode
* Lucide React Icons

---

## Student Features

### Authentication

* Student Login

### Dashboard

* Borrowed Books Count
* Total Transactions
* Next Due Date
* Current Borrowed Books

### Search Books

* View all books
* View available copies

### QR Borrowing

* Mobile QR Code Scanning
* Real-time Book Borrowing

### My Books

* View currently borrowed books

### History

* View borrowing history

---

## Admin Features

### Dashboard

* Library statistics
* Active borrowers
* Recent transactions

### Books

* View library catalogue

### Book Copies

* View physical copies and QR codes

### Transactions

* View borrowing records

---

## Environment Variables

Create a `.env` file:

```env
VITE_BACKEND_URL=http://localhost:8000/api/auth
VITE_STUDENT_BACKEND_URL=http://localhost:8000/api/student
VITE_ADMIN_BACKEND_URL=http://localhost:8000/api/admin
VITE_BOOKS_BACKEND_URL=http://localhost:8000/api/books
```

---

## Installation

```bash
npm install
npm run dev
```

---

## Phase 1 Scope

Implemented:

* Authentication
* Dashboard
* Search Books
* QR Borrowing
* History
* Admin Panel

Not Implemented:

* Return Books
* Fine Management
* Notifications
* Reservations
