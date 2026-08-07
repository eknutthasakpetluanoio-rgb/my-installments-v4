# PayNest v1

> Modern Installment Management System

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Status](https://img.shields.io/badge/status-development-orange)
![License](https://img.shields.io/badge/license-MIT-green)

---

# Overview

PayNest เป็นระบบจัดการสัญญาผ่อนที่พัฒนาด้วย Vanilla JavaScript โดยเน้น

- ความเร็ว
- ความเรียบง่าย
- Mobile First
- Progressive Web App (PWA)
- Responsive Design
- Clean Architecture
- Production Ready

ระบบถูกออกแบบให้สามารถใช้งานแบบ Offline และรองรับการ Sync กับ Firebase ในอนาคต

---

# Features

- Dashboard
- Hero Summary
- Summary Cards
- Contract Management
- Payment History
- Installment Progress
- Search
- Filter
- Sort
- LocalStorage
- Firebase Sync (v2)
- Offline Support
- Install as App

---

# Technology Stack

- HTML5
- CSS3
- Vanilla JavaScript (ES Modules)
- PWA
- LocalStorage
- Firebase

---

# Design Language

Theme

- Piano Black
- Glass UI
- Minimal
- Mobile First

Components

- Hero Card
- Summary Cards
- Contract Cards
- Progress Bar
- Floating Action Button
- Bottom Navigation

---

# Folder Structure

```text
PayNest/
│
├── README.md
├── CHANGELOG.md
├── LICENSE
├── .gitignore
│
├── index.html
├── manifest.json
├── sw.js
│
├── assets/
│   ├── icons/
│   ├── images/
│   └── fonts/
│
├── css/
│   ├── variables.css
│   ├── base.css
│   ├── layout.css
│   ├── components.css
│   ├── utilities.css
│   └── responsive.css
│
├── js/
│   ├── config.js
│   ├── main.js
│   ├── storage.js
│   ├── router.js
│   │
│   ├── models/
│   ├── services/
│   ├── ui/
│   └── utils/
```

---

# Architecture

```
UI

↓

Services

↓

Models

↓

Storage

↓

LocalStorage

↓

Firebase
```

---

# Data Model

## Contract

- id
- customerName
- phone
- productName
- totalPrice
- downPayment
- installmentAmount
- installmentCount
- startDate
- dueDay
- status
- note
- createdAt
- updatedAt

## Payment

- id
- contractId
- amount
- paymentDate
- note
- createdAt

## Settings

- currency
- theme
- notification
- version

---

# Development Rules

- Production Ready
- Clean Architecture
- Mobile First
- No Framework
- ES Modules
- Responsive
- Semantic HTML
- Reusable Components

---

# Build Roadmap

## Build 0

- Project Foundation

## Build 1

- CSS Foundation
- HTML Foundation
- JavaScript Foundation

## Build 2

- Contract CRUD
- Payment CRUD
- Dashboard

## Build 3

- Firebase
- Offline