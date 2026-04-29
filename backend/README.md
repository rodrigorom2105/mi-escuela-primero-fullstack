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

This project follows a **layered architecture**: Route → Service → Repository. Data flows strictly downward — no layer skips another.

```
HTTP Request
     |
     v
[ Router ]          src/routes/
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

> **Note:** Routes that require custom HTTP logic (e.g. `auth.routes.ts`, `donaciones.controller.ts`) use a dedicated `src/controllers/` layer between the router and the service. Standard CRUD routes skip this layer and use `crud-handlers` directly (see below).

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

Maps HTTP methods and URL paths to handler functions using `crud-handlers` factories (see below). No business logic lives here.

```ts
escuelasRouter.get("/",    makeGetAll(listEscuelas))
escuelasRouter.get("/:id", makeGetById(findEscuelaById))
escuelasRouter.post("/",   requireAuth, makeCreate(createEscuela))
```

---

### 2. `crud-handlers` — `src/lib/crud-handlers.ts`

A set of **factory functions** that eliminate boilerplate from route definitions. Each factory wraps a service call in a consistent Express handler: it parses inputs, calls the service, and returns the appropriate HTTP response (including error handling).

Every route in the project uses one of these factories, keeping route files concise and uniform.

#### Available factories

| Factory | HTTP verb | Service signature | Success response |
|---|---|---|---|
| `makeGetAll(service)` | `GET /` | `() => Promise<T[]>` | `200` + array |
| `makeGetById(service, parseId?)` | `GET /:id` | `(id) => Promise<T \| null>` | `200` + object, `404` if null |
| `makeCreate(service, status?)` | `POST /` | `(body) => Promise<T>` | `201` + object |
| `makeCreateNested(service, parseId?)` | `POST /:id/sub` | `(id, body) => Promise<T \| null>` | `201` + object, `404` if null |
| `makeUpdate(service, parseId?)` | `PATCH /:id` | `(id, body) => Promise<T>` | `200` + object |
| `makeDelete(service, parseId?)` | `DELETE /:id` | `(id) => Promise<void>` | `204` no content |

#### `parseId` parameter

By default all factories parse the URL `:id` segment with `Number`. Pass `String` as the second argument when the primary key is a UUID or string:

```ts
aliadosRouter.get("/:id", makeGetById(findAliadoById, String))
```

#### `makeCreateNested`

Used for routes like `POST /:id/needs` where the handler needs both the parent resource ID and the request body:

```ts
escuelasRouter.post("/:id/needs", requireAuth, makeCreateNested(addNecesidadToEscuela))
// addNecesidadToEscuela(escuelaId, body) → null if parent not found → 404
```

#### Error handling

| Situation | Status |
|---|---|
| Invalid (non-numeric) id | `400` |
| Resource not found (service returns `null`) | `404` |
| Validation / business error (service throws) | `400` |
| Unexpected server error | `500` |

---

### 3. Service — `src/services/`

Contains the **business logic** of the application. Service functions:
- Orchestrate calls to one or more repository functions.
- Apply rules, transformations, or validations beyond raw data access.
- Are fully decoupled from HTTP (no `Request`/`Response` objects).

```ts
// src/services/necesidades.service.ts
export async function addNecesidadToEscuela(escuelaId: number, body: Record<string, unknown>) {
  const escuela = await getEscuelaById(escuelaId)
  if (!escuela) return null                                   // parent not found → route returns 404
  return createNecesidad({ ...body, plantel_id: escuela.plantel_id })
}
```

---

### 4. Repository — `src/repositories/`

The only layer that talks to the database. Repository functions:
- Use the Supabase client to run queries.
- Return raw data or throw errors — no HTTP concerns, no business logic.

```ts
// Example: fetch a single school by primary key
supabase.from("escuelas").select("*").eq("id", id).maybeSingle()
```

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
│   ├── supabase.ts                 # Supabase client instance
│   └── crud-handlers.ts            # Route handler factories
├── middleware/
│   └── auth.middleware.ts          # requireAuth guard
├── routes/                         # URL → handler mappings
├── controllers/                    # HTTP layer for complex routes
├── services/                       # Business logic
└── repositories/                   # Database queries
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
