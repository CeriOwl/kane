<h1 align="center">金 Kane</h1>
<p align="center"><i>Your money, working in silence</i></p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite" />
  <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss" />
  <img src="https://img.shields.io/badge/Framer_Motion-11-0055FF?logo=framer" />
</p>

---

## Overview

Kane is a personal finance tracking app that helps you monitor your money across multiple accounts. Built with React 19, TypeScript, and Vite, it stores everything locally in your browser via IndexedDB — no server, no sign-ups, just your data on your machine.

## Features

- **Multi-step onboarding** — Register your name and accounts through an animated flow
- **Dashboard** — View total balance, APR performance, and daily/monthly/yearly earnings
- **Accounts page** — Manage multiple accounts with custom names, balances, and expected yields
- **Bottom navigation** — Quick access to Home, Accounts, Moves, Cards, and Insights
- **Persistent storage** — All data saved locally via IndexedDB
- **Route protection** — Redirects unauthenticated users to the registration flow
- **Framer Motion animations** — Smooth transitions between pages and steps

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Language | TypeScript 5 |
| Bundler | Vite 8 |
| Styling | Tailwind CSS 4 |
| Routing | React Router 7 |
| Storage | IndexedDB (via raw API) |
| Animation | Framer Motion 11 |
| Icons | Lucide React |
| UUID | uuid |

## Project Structure

```
src/
├── App.tsx                       # Root routing configuration
├── main.tsx                      # Entry point (BrowserRouter wrapper)
├── index.css                     # Global styles / Tailwind
│
├── components/
│   ├── header.tsx                # Top app bar (user avatar, title, notifications)
│   ├── footer.tsx                # Bottom navigation (5 tabs)
│   └── layout/
│       └── Layout.tsx            # Page shell: Header + Outlet + Footer
│
├── lib/
│   ├── types.ts                  # TypeScript interfaces (User, Account)
│   ├── dbUser.ts                 # IndexedDB operations for users
│   ├── dbAccount.ts              # IndexedDB operations for accounts
│   └── routes/
│       └── ProtectedRoute.tsx    # Auth guard → redirects to /register
│
└── pages/
    ├── Register.tsx              # 2-step onboarding (name → account details)
    ├── Dashboard.tsx             # Main dashboard (balance, APR, earnings)
    └── Accounts.tsx              # Account list / management
```

## Getting Started

```bash
pnpm install
pnpm dev
```

Opens at `http://localhost:5173`.

## Build

```bash
pnpm build    # Outputs to dist/
```
