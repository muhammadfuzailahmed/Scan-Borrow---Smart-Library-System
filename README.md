# ScanBorrow Frontend

## Overview

ScanBorrow Frontend is a React based user interface for the QR Based Smart Library Borrowing System. It provides separate interfaces for students and administrators.

The frontend allows students to search books, borrow books through QR scanning, return books through QR scanning, view overdue warnings, check fines, and track borrowing history. Administrators can monitor library statistics, transactions, fines, defaulters, and circulation reports through a dedicated admin panel.

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
* Overdue Warning Section
* Overdue Toast Notification

### Search Books

* View all books
* View available copies

### QR Borrowing

* Mobile QR Code Scanning
* Real-time Book Borrowing
* Borrowing validation messages

### My Books

* View currently borrowed books
* Return borrowed books
* Open return QR code page

### QR Return

* Scan return QR code using mobile device
* Confirm book return
* Show return success modal
* Show fine amount after return
* Show no fine message when returned on time

### Fine Display

* Fine shown after book return
* Fine displayed based on late return calculation

### History

* View borrowing and return history

---

## Admin Features

### Dashboard

* Library statistics
* Total books
* Total copies
* Available copies
* Issued copies
* Total transactions
* Active borrowers
* Overdue borrowers
* Total fine
* Recent transactions

### Books

* View library catalogue

### Book Copies

* View copies and QR codes
* View copy availability status

### Transactions

* View borrowing and return records
* View transaction status
* View return date
* View fine amount per transaction

### Reports

* Most Borrowed Books
* Defaulters List
* Fine Report
* Recent Transactions

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

To run the frontend on the local network for mobile QR scanning:

```bash
npm run dev -- --host
```

---

## Implemented Scope

### Assignment 1

* Authentication
* Student Dashboard
* Search Books
* QR Borrowing
* My Books
* History
* Admin Dashboard
* Books Page
* Book Copies Page
* Transactions Page

### Assignment 2

* QR based Book Return
* Return Success Modal
* Fine Calculation Display
* Overdue Warning Section
* Overdue Toast Notification
* Admin Dashboard Metrics
* Fine Display in Transactions
* Admin Reports Page
* Most Borrowed Books Report
* Defaulters List
* Fine Report
* Recent Transactions Report
