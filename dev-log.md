## ✅ Day 1 - Set Up User & Project Schema

- Set up PostgreSQL with Prisma and Supabase for my DevOps Monitoring SaaS.
- Defined core models: `User` and `Project`
  - Each user can own multiple projects (1:N relationship)
  - Each project has `name`, `description`, timestamps, and an `ownerId`
- This sets the foundation for everything:
  - All logs, metrics, alerts will be scoped to a project
  - Future: Invite teammates, manage integrations per project

```prisma
model User {
  id        String    @id @default(uuid())
  email     String    @unique
  projects  Project[]
}

model Project {
  id        String   @id @default(uuid())
  name      String
  owner     User     @relation(fields: [ownerId], references: [id])
  ownerId   String
}


# 🚀 DevOps Monitoring SaaS - Progress Log

This document tracks the development progress of the DevOps Monitoring SaaS MVP built using **Next.js (App Router)** and **NestJS** in a **monorepo** setup.

---

## ✅ Features Completed

### 1. 🔐 Authentication (Google OAuth via Auth0)
- Implemented Google social login using **Auth0** in the frontend.
- Configured **NestJS backend** to validate JWTs from Auth0 using RS256 (JWKS endpoint).
- Synced authenticated users to our Postgres DB upon login.
- Persisted JWT in browser cookies using `auth_token` with `HttpOnly: false` and proper path.

### 2. 🛡️ Route Protection (Next.js Middleware)
- Created a `middleware.ts` to guard protected routes like `/dashboard`.
- Checks for `auth_token` cookie and redirects to `/login` if absent.
- Validates token expiration and redirects to login if token is invalid/expired.
- Decoded JWT inside middleware to extract user data (`email`, `name`) and attached it to request headers.

### 3. 🖼️ Basic Pages Setup (Frontend)
- Created `/login` page with Auth0 login button.
- Created `/dashboard` page showing protected content.
- Redirects correctly based on auth status (login or dashboard).
- Middleware works seamlessly with App Router (`src/app/**`).

### 4. 🧪 Dev Experience Improvements
- Enabled `ts-node-dev` for hot-reloading in NestJS backend (`start:dev`).
- Fixed cookie access issues in `useAuth` hook by using proper format and cookie utils.
- Removed use of `getServerSideProps` (not allowed in App Router) and switched to **middleware-based protection**.

---

## 🔄 Current Status

- Auth system complete and working.
- Middleware protection in place.
- User is correctly synced to DB after login.
- Dashboard route shows only for logged-in users.
- Able to retrieve JWT info like name/email from middleware or token decode.

---

## 📦 Folder Overview (So Far)

