# Ticketo 🎟️

A full-stack Event Ticket Booking & Management Platform where organizers can create events, attendees can purchase tickets securely, and admins can moderate the platform.

## 📋 Project Requirements

**Requirement Document:**

https://docs.google.com/document/d/1BHW20BQy6gArwIcOpgWjYrqbcJ4rm-tgvXgFJ1pO0CQ/edit?usp=sharing

---

## 🚀 Clone Starter Branch

```bash
git clone -b starter https://github.com/NS-Sheam/ticketo-client.git
```

## 🚀 Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

in your browser to view the application.

---

# 🎯 Project Overview

Ticketo is a role-based event management and ticketing platform that enables organizers to create and manage events, attendees to book tickets securely using Stripe, and admins to oversee platform operations.

### System Roles

- Attendee
- Organizer
- Admin

---

# ✨ Core Features

## 🔐 Authentication & Authorization

### Authentication

- Email & Password Login
- Google Authentication
- Session Persistence
- BetterAuth Integration

### Authorization

- Role-Based Access Control (RBAC)
- Protected Routes
- Middleware Security
- HTTP-only Cookies

---

## 🏢 Organization Management

Organizers can:

- Create organization profiles
- Upload logos
- Add organization websites
- Manage organization details

---

## 🎫 Event Management

Features include:

- Create Events
- Update Events
- Delete Events
- Event Approval Workflow

Event Information:

- Title
- Banner
- Category
- Location
- Date
- Ticket Price
- Available Seats
- Description

Event Status:

- Pending
- Approved
- Rejected

---

## 💳 Ticket Booking System

Attendees can:

- Browse Events
- View Event Details
- Select Ticket Quantity
- Purchase Tickets via Stripe

Booking Flow:

```text
Select Event
      ↓
Create Booking
      ↓
Stripe Checkout
      ↓
Payment Success
      ↓
Verification
      ↓
Booking Stored
```

---

## ⭐ Premium Upgrade System

Organizers can upgrade to Premium for a one-time payment.

Premium Benefits:

- Remove Event Creation Limits
- Access Advanced Organizer Features

Payment Gateway:

- Stripe

---

# 🌐 Public Pages

## Home Page

- Hero Banner
- Featured Events
- Featured Organizations
- Statistics Section
- Framer Motion Animations

## Events Page

- Event Listing
- Search by Title
- Filter by Category
- Filter by Location
- Pagination

## Event Details Page

- Full Event Information
- Ticket Purchase Interface
- Pricing Information
- Availability Status

---

# 📊 Dashboard Features

## Attendee Dashboard

- Overview Statistics
- Profile Management
- Booking History
- Payment History
- Upcoming Events

## Organizer Dashboard

- Revenue Overview
- Organization Settings
- Add Event
- Manage Events
- Booking Management

## Admin Dashboard

- Platform Analytics
- User Management
- Event Moderation
- Transaction Monitoring
- System Overview

---

# 💰 Payment System

## Event Ticket Payments

- Stripe Checkout Session
- Secure Payment Flow
- Payment Verification
- Booking Storage

## Premium Upgrade Payments

- Stripe Integration
- Payment Verification
- Premium Status Activation

---

# 🔍 Search & Filtering

### Search

- Event Title Search using MongoDB Regex

### Filters

- Category Filter
- Location Filter

### Pagination

Server-side pagination using:

```js
skip();
limit();
```

---

# 🛡️ Security Features

- JWT Authentication
- HTTP-only Cookies
- Route Protection Middleware
- Role-Based Access Control
- Secure API Endpoints
- Environment Variable Protection

---

# 🗄️ Database Collections

### Users

```js
name;
email;
image;
role;
isBlocked;
isPremium;
createdAt;
```

### Organizations

```js
organizationName;
logo;
website;
description;
organizerEmail;
status;
```

### Events

```js
title;
banner;
category;
location;
date;
ticketPrice;
availableSeats;
description;
status;
organizationId;
organizerEmail;
```

### Bookings

```js
eventId;
eventTitle;
attendeeEmail;
quantity;
amount;
paymentStatus;
transactionId;
bookingDate;
```

### Payments

```js
userEmail;
amount;
transactionId;
paymentStatus;
paidAt;
```

---

# 🔄 System Flow

```text
User
 ↓
Authentication
 ↓
Role Assignment
 ↓
Dashboard Routing
 ↓
Organization Creation
 ↓
Event Creation
 ↓
Attendee Browsing
 ↓
Ticket Booking
 ↓
Stripe Payment
 ↓
Verification
 ↓
Bookings & Payments Storage
 ↓
Admin Moderation
```

---

## 🛠️ Tech Stack

### Frontend

- Next.js
- React
- Tailwind CSS
- Framer Motion

### Backend

- Node.js
- Express.js
- MongoDB

### Authentication

- BetterAuth

### Payments

- Stripe

---

## 📄 License

This project is created for educational and portfolio purposes.
