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



Absolutely! I love that you want to **learn while building** — that’s the best way. Let me walk you through everything we’re going to do for the **Project Creation Feature**, with full explanation and guidance as if you’re building it on your own 🚀

---

## 🛠️ Goal: Project Creation Feature

> Let every logged-in user create multiple "Projects" (like GitHub repos).

Each project will store logs, metrics, and alerts in the future — but for now we’ll just focus on:

- Creating a new project (API + form)
- Listing the user’s projects in the dashboard

---

## 🧠 What You’ll Learn

- How to define relational models in Prisma
- How to expose secure NestJS routes for logged-in users
- How to create modules, services, and controllers in NestJS
- How to protect routes with `AuthGuard` + extract the current user
- How to POST and GET data in Next.js using fetch
- How to show a modal + form using ShadCN UI

---

## 🗂️ Here’s the Plan (Split into Learnable Steps)

### ✅ Step 1: [Done]
- Define `Project` model in `schema.prisma`
- Add relation to `User` model
- Run `npx prisma migrate dev --name init-project-model`

---

### 🧱 Step 2: Create `projects` module in NestJS

This will include:
- `project.controller.ts` → defines routes
- `project.service.ts` → handles logic (DB create, find)
- `project.module.ts` → groups everything

You’ll learn:
- How to organize features in NestJS
- How to create services that use Prisma

---

### 🔐 Step 3: Add AuthGuard + Current User to route

> Protect all routes so only logged-in users can create/get their own projects.

You’ll learn:
- How to extract `user` from JWT using a custom decorator
- How to pass userId into Prisma query

---

### 📮 Step 4: Implement Project Creation & List APIs

**POST** `/projects`
- Takes `name`, `description`
- Uses `user.id` as `ownerId`

**GET** `/projects`
- Returns all projects where `ownerId === user.id`

You’ll learn:
- How to handle POST bodies
- How to return filtered data
- How to use DTOs (optional)

---

### 🎨 Step 5: Next.js UI for Projects

- Create a **Create Project** modal with a form using ShadCN Dialog
- Show list of projects in dashboard
- Call API endpoints from frontend using `fetch`

You’ll learn:
- Client-side form state
```


24-04-27 -->

Nice — you’ve implemented **add** and **delete** project APIs and frontend flows, which is a great milestone!

### Let’s talk about the **next logical feature** for your DevOps Monitoring SaaS:

---

### ✅ Current Features Done:
- Google OAuth login with JWT & cookies
- Authenticated project creation and deletion
- Project listing (assumed via `GET /project`)

---

### 🧩 Next Feature: **Add SDK Integration Setup for Each Project**

Your users should be able to integrate your SDK into their app, similar to how Sentry or Vercel give you a snippet or API key to send logs/errors.

#### Step-by-step:

1. **Generate Project API Key**
   - Generate a unique key per project (e.g., UUID or JWT-style)
   - Save it in the DB as `project.apiKey`
   - You can show this on the frontend project detail page
   - Endpoint: `GET /project/:id/key` (protected)
   - Optional: `POST /project/:id/rotate-key` (to regenerate key)

2. **Create SDK Client (start simple)**
   - A simple `fetch()` based client in JavaScript/TypeScript
   - It can send errors or logs to your backend like:
     ```ts
     sdk.captureError("Something went wrong")
     sdk.log("User clicked checkout")
     ```

3. **Create a New Route: `/events`**
   - Accept POST requests from your SDK
   - Store the event (in `events` table: `id`, `projectId`, `type`, `message`, `timestamp`, etc.)
   - Authenticate using the `apiKey` in headers

4. **Create Dashboard UI**
   - Show a project detail page
   - List recent logs/events with filters

---

### After That:
- Add filters and pagination to event logs
- Add log levels (info, warning, error)
- Add charts or metrics (later)

---

### Bonus:
Want me to write the **DB schema + endpoints** for the event logging feature next?

Let’s keep the momentum going — this is getting real!