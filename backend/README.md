# mi-escuela-primero-backend

REST API for the Mi Escuela Primero project, built with **Express**, **TypeScript**, and **Supabase**.

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express 5
- **Language:** TypeScript
- **Database:** Supabase (PostgreSQL)
- **Dev server:** `tsx watch`

---

## Architecture

This project follows a **4-layer architecture**: Route → Controller → Service → Repository. Each layer has a single responsibility, and data flows strictly downward — no layer skips another.

```
HTTP Request
     |
     v
[ Router ]          src/routes/
     |
     v
[ Controller ]      src/controllers/
     |
     v
[ Service ]         src/services/
     |
     v
[ Repository ]      src/repositories/
     |
     v
[ Supabase Client ] src/lib/supabase.ts
     |
     v
  Database (PostgreSQL via Supabase)
```

---

## Entry Point

**`src/index.ts`**

The application starts here. It:
1. Loads environment variables via `dotenv`.
2. Creates the Express app and applies global middleware (`cors`, `express.json`).
3. Mounts routers on their base paths (e.g. `/escuelas`).
4. Starts the HTTP server on the configured `PORT`.

```ts
app.use("/escuelas", escuelasRouter)
app.listen(port, ...)
```

---

## Layer Breakdown

### 1. Router — `src/routes/`

Maps HTTP methods and URL paths to specific controller functions. No logic lives here.

```
GET  /escuelas       → getEscuelasController
GET  /escuelas/:id   → getEscuelaByIdController
POST /escuelas       → createEscuelaController
```

**File:** `src/routes/escuelas.routes.ts`

---

### 2. Controller — `src/controllers/`

Handles the HTTP boundary. Each controller function:
- Receives the raw `Request` and `Response` objects from Express.
- Parses and validates input from `req.params`, `req.body`, etc.
- Calls the appropriate service function.
- Sends the HTTP response (status code + JSON body).
- Catches errors and returns meaningful error responses.

Controllers know about HTTP — services and repositories do not.

**File:** `src/controllers/escuelas.controller.ts`

---

### 3. Service — `src/services/`

Contains the **business logic** of the application. Service functions:
- Orchestrate calls to one or more repository functions.
- Apply any rules, transformations, or validations that go beyond raw data access.
- Are fully decoupled from HTTP (no `Request`/`Response` objects).

Currently the service layer is thin (the domain is simple), but this is where logic like filtering, combining data from multiple tables, or enforcing business rules would live.

**File:** `src/services/escuelas.service.ts`

---

### 4. Repository — `src/repositories/`

The only layer that talks to the database. Repository functions:
- Use the Supabase client to run queries.
- Return raw data or throw errors — no HTTP concerns, no business logic.
- Keep all SQL/query logic in one place, making it easy to swap the data source later.

```ts
// Example: fetch a single school by primary key
supabase.from("escuelas").select("*").eq("id", id).maybeSingle()
```

**File:** `src/repositories/escuelas.repository.ts`

---

### 5. Supabase Client — `src/lib/supabase.ts`

A single shared instance of the Supabase client, initialized once at startup from environment variables:

```
SUPABASE_URL
SUPABASE_PUBLISHABLE_KEY
```

The client is created with `createClient` from `@supabase/supabase-js` and exported for use exclusively by the repository layer.

---

## Project Structure

```
src/
├── index.ts                        # Entry point, server setup
├── lib/
│   └── supabase.ts                 # Supabase client instance
├── routes/
│   └── escuelas.routes.ts          # URL → controller mappings
├── controllers/
│   └── escuelas.controller.ts      # HTTP parsing & response
├── services/
│   └── escuelas.service.ts         # Business logic
└── repositories/
    └── escuelas.repository.ts      # Database queries
```

---

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy the environment variables file and fill in your Supabase credentials:
   ```bash
   cp .env.example .env
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3000`.

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server with hot reload (`tsx watch`) |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run start` | Run the compiled production build |
