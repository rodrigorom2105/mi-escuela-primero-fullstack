# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite, HMR)
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

No test suite is configured.

## Architecture

This is a React 19 + Vite SPA for **+Educación** (Mexicanos Primero Jalisco), a donation-matching platform connecting schools with donors in Jalisco, Mexico.

### Routing (`src/App.jsx`)

| Path | Page |
|------|------|
| `/` | Home |
| `/catalogo` | Catalog (browse school needs) |
| `/proyecto/:id` | Project detail |
| `/donar` | Donation form |
| `/gracias` | Thank You page (post-submission) |
| `/admin` | Admin panel |

### Data layer (`src/data/`)

All data is **static, in-memory JS arrays** — no backend or API:
- `necesidades.js` — school needs/projects. All 15 items have: id, escuela, municipio, categoria, subcategoria, propuesta, cantidad, unidad, estado, prioridad, progreso, beneficiarios, imagenPrincipal, galeria, descripcion. Status value is `"En espera de apoyo"`.
- `aplicaciones.js` — donor applications (id, nombre, instancia, tipoDonativo, escuelaDestino, estado, fecha, ...). Schema varies by donation type.

Both files are imported directly into pages. When adding projects or applications, edit these files.

### Key patterns

- **Page structure**: every page wraps content with `<Navbar />` and `<Footer />` components, imports its own CSS from `src/styles/`.
- **Catalog filtering**: `catalog.jsx` filters `necesidades` client-side by `busqueda`, `municipio`, `categoria`, and `subcategoria`. Subcategory options are derived dynamically from data when a category is selected.
- **Donation flow**: `ProjectDetail.jsx` passes the full `proyecto` object via React Router `state` (`navigate('/donar', { state: { proyecto } })`). `form.jsx` reads it with `useLocation()` to show a context banner and pre-fill the destination school and donation type. The form works standalone (no state) as a general donation form.
- **Dynamic form**: `form.jsx` shows/hides field groups based on `entityType`, `donationType`, and `logistics` state. Uses `mapCategoriaToDonationType()` to map project subcategory strings to form values.
- **Admin tabs**: `admin.jsx` has 4 tabs — Resumen, Proyectos, Aplicaciones, Cargar datos. Applications are held in local state (`useState(aplicacionesData)`) so statuses can be updated dynamically. "Editar", "Progreso", and "+ Agregar proyecto" are UI-only stubs.
- **Admin notifications**: Bell icon in admin hero shows count of pending applications, opens a dropdown linking to each one.
- **ProjectDetail**: looks up a project by `useParams().id`. `selectedImg` state is initialized directly from `proyecto?.imagenPrincipal` (no useEffect). Includes WhatsApp share and Google Maps iframe.
- **Verification badge**: `src/components/VerificationBadge.jsx` — reusable pill badge used in catalog and project detail to communicate that needs are managed by Mexicanos Primero Jalisco.

### Styling

Each page and component has a dedicated CSS file in `src/styles/`. Global CSS variables (colors, font) in `index.css`. **Bootstrap 5 is installed** (`bootstrap` + `react-bootstrap`) and imported in `main.jsx` before `index.css`. Custom CSS overrides Bootstrap's defaults — do not rely on Bootstrap's default button colors, use the existing CSS variable classes instead.

### Admin link

The Admin panel link (`/admin`) is in the **footer** (PLATAFORMA column), not the navbar. It is styled with reduced opacity to keep it subtle.
