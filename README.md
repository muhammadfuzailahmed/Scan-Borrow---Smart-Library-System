# ScanBorrow Frontend

## Overview

ScanBorrow Frontend is a React based user interface for the QR Based Smart Library Borrowing System. It provides separate interfaces for students and administrators.

The frontend allows students to search books, borrow books through QR scanning, return books through QR scanning, view overdue warnings, check fines, track borrowing history, view personalized recommendations, and securely access the system using JWT based authentication. Administrators can monitor library statistics, manage books and book copies, view transactions, reports, fines, defaulters, recommendations, and activity logs through a dedicated admin panel.

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

## Authentication & Security

### JWT Authentication

* Login with secure backend authentication
* Access token stored in HTTP only cookies
* Refresh token stored in HTTP only cookies
* Authenticated API requests using `withCredentials`
* Secure logout functionality
* Local userId dependency removed from protected API flow

### Role Based Access

* Student panel access for students
* Admin panel access for administrators
* Protected API requests for student and admin routes

---

## Student Features

### Authentication

* Student Login
* Secure Logout

### Dashboard

* Borrowed Books Count
* Total Transactions
* Next Due Date
* Current Borrowed Books
* Overdue Warning Section
* Overdue Toast Notification
* Recommended Books Section

### Search Books

* View all books
* View available copies
* View book details

### QR Borrowing

* Mobile QR Code Scanning
* Real time Book Borrowing
* Borrowing validation messages
* Duplicate borrowing prevention
* Borrowing limit validation

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

### Overdue Warning

* Overdue books shown on dashboard
* Pending fine shown for overdue books
* Toast notification for overdue books

### History

* View borrowing and return history

### Recommendations

* View recommended books
* Recommendations based on borrowed categories
* Recommendations also include popular library books

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
* View total copies
* View available copies
* View issued copies
* Add new book
* Edit book
* Delete book with safety validation

### Book Copies

* View copies and QR codes
* View copy availability status
* Add new book copy
* Delete book copy with safety validation
* Duplicate copy code validation
* Duplicate QR code validation

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
* Activity Logs

### Activity Logs

* View login activity
* View failed login attempts
* View book issue logs
* View book return logs
* View fine generation logs

---

## Environment Variables

Create a `.env` file:

```env
VITE_BACKEND_URL=http://localhost:8000/api/auth
VITE_STUDENT_BACKEND_URL=http://localhost:8000/api/student
VITE_ADMIN_BACKEND_URL=http://localhost:8000/api/admin
VITE_BOOKS_BACKEND_URL=http://localhost:8000/api/books
```

For mobile QR scanning through the same network, replace `localhost` with your laptop IP address:

```env
VITE_BACKEND_URL=http://YOUR_LAPTOP_IP:8000/api/auth
VITE_STUDENT_BACKEND_URL=http://YOUR_LAPTOP_IP:8000/api/student
VITE_ADMIN_BACKEND_URL=http://YOUR_LAPTOP_IP:8000/api/admin
VITE_BOOKS_BACKEND_URL=http://YOUR_LAPTOP_IP:8000/api/books
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

### Additional Enhancements

* JWT based frontend authentication flow
* Secure logout integration
* Role based access support
* Recommended Books section
* Activity Logs tab in Reports
* Admin Add Book UI
* Admin Edit Book UI
* Admin Delete Book UI
* Admin Add Book Copy UI
* Admin Delete Book Copy UI
* Updated protected API requests using cookies

---

## Testing Summary

The following frontend workflows have been tested:

* Student login
* Secure logout
* Student dashboard loading
* Search books page
* QR borrowing
* My Books page
* QR return page
* Fine display after return
* Overdue warning section
* Borrowing history
* Recommended books section
* Admin dashboard
* Books page
* Add book
* Edit book
* Delete book
* Book copies page
* Add book copy
* Delete book copy
* Transactions page
* Reports page
* Activity logs tab

---

## Authors

Muhammad Fuzail Ahmed

Roll No: 2024F-BCS-069

Section: A

DBMS PBL Project

QR Based Smart Library Borrowing System
