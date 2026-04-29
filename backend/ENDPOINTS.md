# Endpoints de la API

Base URL: `http://localhost:3000`

Los endpoints marcados con `[Auth]` requieren el header:
```
Authorization: Bearer <access_token>
```

---

## Auth (`/auth`)

| Método | Ruta | Descripción | Usado en |
|--------|------|-------------|----------|
| POST | `/auth/register` | Crea una cuenta de usuario en Supabase Auth | Panel Admin |
| POST | `/auth/login` | Inicia sesión y retorna tokens | Panel Admin |
| POST | `/auth/logout` | Cierra la sesión del usuario | Panel Admin |
| POST | `/auth/refresh` | Renueva el access token usando el refresh token | Panel Admin |

### POST `/auth/register`
```json
{
  "email": "admin@ejemplo.com",
  "password": "contraseña123",
  "name": "Nombre Admin"
}
```
**Respuesta:** `{ "user": { ... } }`

### POST `/auth/login`
```json
{
  "email": "admin@ejemplo.com",
  "password": "contraseña123"
}
```
**Respuesta:** `{ "access_token": "...", "refresh_token": "..." }`

### POST `/auth/logout`
```json
{
  "access_token": "..."
}
```
**Respuesta:** `204 No Content`

### POST `/auth/refresh`
```json
{
  "refresh_token": "..."
}
```
**Respuesta:** `{ "access_token": "...", "refresh_token": "..." }`

---

## Municipios (`/municipios`)

Tabla: `municipios`

| Método | Ruta | Auth | Descripción | Usado en |
|--------|------|------|-------------|----------|
| GET | `/municipios` | No | Lista todos los municipios | Catálogo / Filtros |
| GET | `/municipios/:id` | No | Obtiene un municipio por ID | Catálogo |
| POST | `/municipios` | Sí | Crea un nuevo municipio | Panel Admin |
| PATCH | `/municipios/:id` | Sí | Actualiza datos de un municipio | Panel Admin |
| DELETE | `/municipios/:id` | Sí | Elimina un municipio | Panel Admin |

### Body POST / PATCH
```json
{
  "nombre": "Zapopan"
}
```

---

## Planteles (`/planteles`)

Tabla: `planteles`

| Método | Ruta | Auth | Descripción | Usado en |
|--------|------|------|-------------|----------|
| GET | `/planteles` | No | Lista todos los planteles | Catálogo |
| GET | `/planteles/:id` | No | Obtiene un plantel por ID | Catálogo |
| POST | `/planteles` | Sí | Crea un nuevo plantel | Panel Admin |
| PATCH | `/planteles/:id` | Sí | Actualiza datos de un plantel | Panel Admin |
| DELETE | `/planteles/:id` | Sí | Elimina un plantel | Panel Admin |

### Body POST / PATCH
```json
{
  "municipio_id": 1,
  "nombre": "Justo Sierra",
  "direccion": "Agustín Melgar 1509, Zapopan",
  "ubicacion": "https://maps.app.goo.gl/..."
}
```

---

## Escuelas (`/escuelas`)

Tabla: `escuelas`

| Método | Ruta | Auth | Descripción | Usado en |
|--------|------|------|-------------|----------|
| GET | `/escuelas` | No | Lista todas las escuelas | Catálogo |
| GET | `/escuelas/:id` | No | Obtiene una escuela por ID | Catálogo / Detalle |
| GET | `/escuelas/:id/needs` | No | Lista las necesidades de una escuela | Catálogo / Detalle |
| POST | `/escuelas` | Sí | Crea una nueva escuela | Panel Admin |
| POST | `/escuelas/:id/needs` | Sí | Agrega una necesidad a una escuela | Panel Admin |
| PATCH | `/escuelas/:id` | Sí | Actualiza datos de una escuela | Panel Admin |
| DELETE | `/escuelas/:id` | Sí | Elimina una escuela | Panel Admin |

### Body POST `/escuelas`
```json
{
  "plantel_id": 1,
  "nombre": "Justo Sierra",
  "cct": "14DPR0060O",
  "nivel_educativo": "Primaria",
  "modalidad": "SEP-General",
  "turno": "Matutino",
  "sostenimiento": "Federalizado",
  "personal_escolar": 21,
  "estudiantes": 558
}
```

### Body POST `/escuelas/:id/needs`
```json
{
  "subcategoria_id": 3,
  "propuesta": "Pelotas de futbol",
  "cantidad": 5,
  "unidad": "Piezas",
  "estado": "Aun no cubierto",
  "detalles": "Para uso en educación física"
}
```

### Body PATCH `/escuelas/:id`
Mismos campos que POST, todos opcionales.

---

## Categorías (`/categorias`)

Tabla: `categorias`

| Método | Ruta | Auth | Descripción | Usado en |
|--------|------|------|-------------|----------|
| GET | `/categorias` | No | Lista todas las categorías | Catálogo / Filtros |
| GET | `/categorias/:id` | No | Obtiene una categoría por ID | Catálogo |
| POST | `/categorias` | Sí | Crea una nueva categoría | Panel Admin |
| PATCH | `/categorias/:id` | Sí | Actualiza una categoría | Panel Admin |
| DELETE | `/categorias/:id` | Sí | Elimina una categoría | Panel Admin |

### Body POST / PATCH
```json
{
  "nombre": "Material"
}
```

---

## Subcategorías (`/subcategorias`)

Tabla: `subcategorias`

| Método | Ruta | Auth | Descripción | Usado en |
|--------|------|------|-------------|----------|
| GET | `/subcategorias` | No | Lista todas las subcategorías | Catálogo / Filtros |
| GET | `/subcategorias/:id` | No | Obtiene una subcategoría por ID | Catálogo |
| POST | `/subcategorias` | Sí | Crea una nueva subcategoría | Panel Admin |
| PATCH | `/subcategorias/:id` | Sí | Actualiza una subcategoría | Panel Admin |
| DELETE | `/subcategorias/:id` | Sí | Elimina una subcategoría | Panel Admin |

### Body POST / PATCH
```json
{
  "categoria_id": 3,
  "nombre": "Material didáctico"
}
```

---

## Necesidades (`/necesidades`)

Tabla: `necesidades`

| Método | Ruta | Auth | Descripción | Usado en |
|--------|------|------|-------------|----------|
| GET | `/necesidades` | No | Lista todas las necesidades | Catálogo |
| GET | `/necesidades/progreso` | No | Retorna la cantidad cubierta por necesidad (donaciones completadas) | Catálogo / Barras de progreso |
| GET | `/necesidades/:id` | No | Obtiene una necesidad por ID | Catálogo / Detalle |
| GET | `/necesidades/:id/donaciones` | No | Lista las donaciones materiales asociadas a una necesidad | Catálogo / Detalle |
| POST | `/necesidades` | Sí | Crea una nueva necesidad | Panel Admin |
| PATCH | `/necesidades/:id` | Sí | Actualiza una necesidad | Panel Admin |
| DELETE | `/necesidades/:id` | Sí | Elimina una necesidad | Panel Admin |

### Body POST / PATCH
```json
{
  "plantel_id": 1,
  "subcategoria_id": 5,
  "propuesta": "Pizarrones",
  "cantidad": 5,
  "unidad": "Piezas",
  "estado": "Aun no cubierto",
  "detalles": "Para aulas de primer y segundo grado"
}
```

**Respuesta `/necesidades/progreso`:**
```json
[
  { "need_id": 12, "cantidad_cubierta": 3 },
  { "need_id": 7,  "cantidad_cubierta": 10 }
]
```

---

## Aliados (`/aliados`)

Tabla: `aliados`

| Método | Ruta | Auth | Descripción | Usado en |
|--------|------|------|-------------|----------|
| POST | `/aliados` | No | Registra un nuevo aliado (formulario público) | Formulario Aliados |
| GET | `/aliados` | Sí | Lista todos los aliados | Panel Admin |
| GET | `/aliados/:id` | Sí | Obtiene un aliado por ID | Panel Admin |
| PATCH | `/aliados/:id` | Sí | Actualiza datos de un aliado | Panel Admin |
| DELETE | `/aliados/:id` | Sí | Elimina un aliado | Panel Admin |

### Body POST / PATCH
```json
{
  "nombre": "Empresa XYZ",
  "contacto": "Juan Pérez",
  "email": "juan@xyz.com",
  "telefono": "3312345678",
  "tipo": "Empresa"
}
```

---

## Donaciones materiales (`/donaciones`)

Tabla: `donaciones`

| Método | Ruta | Auth | Descripción | Usado en |
|--------|------|------|-------------|----------|
| POST | `/donaciones/submit` | No | Envía el formulario completo de donación material (llama RPC `submit_donacion`) | Formulario Donación |
| POST | `/donaciones` | No | Crea una donación directamente | Panel Admin |
| GET | `/donaciones` | Sí | Lista todas las donaciones (incluye datos de aliado y escuela) | Panel Admin |
| GET | `/donaciones/:id` | Sí | Obtiene una donación por ID | Panel Admin |
| PATCH | `/donaciones/:id` | Sí | Actualiza el estado u otros campos de una donación | Panel Admin |
| DELETE | `/donaciones/:id` | Sí | Elimina una donación | Panel Admin |

### Body POST `/donaciones/submit`
Payload completo del formulario de donación; se pasa directamente a la función de BD `submit_donacion`:
```json
{
  "aliado_id": "uuid-del-aliado",
  "escuela_id": 3,
  "necesidad_id": 12,
  "cantidad": 5,
  "estado": "pendiente",
  "notas": "Entrega en enero"
}
```

### Body POST `/donaciones`
```json
{
  "aliado_id": "uuid-del-aliado",
  "escuela_id": 3,
  "cantidad": 5,
  "estado": "pendiente",
  "notas": "Observaciones opcionales"
}
```

### Body PATCH `/donaciones/:id`
```json
{
  "estado": "completada"
}
```

---

## Donación–Necesidad (`/donacion-necesidades`)

Tabla: `donacion_necesidades` (tabla pivote que vincula `donaciones` ↔ `necesidades`)

| Método | Ruta | Auth | Descripción | Usado en |
|--------|------|------|-------------|----------|
| GET | `/donacion-necesidades` | Sí | Lista todos los registros de la tabla pivote | Panel Admin |
| GET | `/donacion-necesidades/:id` | Sí | Obtiene un registro por ID | Panel Admin |
| POST | `/donacion-necesidades` | Sí | Crea una relación donación–necesidad | Panel Admin |
| PATCH | `/donacion-necesidades/:id` | Sí | Actualiza un registro | Panel Admin |
| DELETE | `/donacion-necesidades/:id` | Sí | Elimina un registro | Panel Admin |

### Body POST / PATCH
```json
{
  "donacion_id": "uuid-de-la-donacion",
  "necesidad_id": 12
}
```

---

## Donaciones económicas (`/donaciones-economicas`)

Tabla: `donaciones_economicas`

| Método | Ruta | Auth | Descripción | Usado en |
|--------|------|------|-------------|----------|
| POST | `/donaciones-economicas/submit` | No | Envía el formulario de donación económica (llama RPC `submit_donacion_economica`) | Formulario Donación Económica |
| POST | `/donaciones-economicas` | Sí | Crea una donación económica directamente | Panel Admin |
| GET | `/donaciones-economicas` | Sí | Lista todas las donaciones económicas (incluye aliado y escuela) | Panel Admin |
| GET | `/donaciones-economicas/:id` | Sí | Obtiene una donación económica por ID | Panel Admin |
| PATCH | `/donaciones-economicas/:id` | Sí | Actualiza el estado u otros campos | Panel Admin |
| DELETE | `/donaciones-economicas/:id` | Sí | Elimina una donación económica | Panel Admin |

### Body POST `/donaciones-economicas/submit`
Payload completo del formulario; se pasa directamente a la función de BD `submit_donacion_economica`:
```json
{
  "aliado_id": "uuid-del-aliado",
  "escuela_id": 3,
  "monto": 5000.00,
  "moneda": "MXN",
  "estado": "pendiente",
  "notas": "Transferencia bancaria"
}
```

### Body POST `/donaciones-economicas`
```json
{
  "aliado_id": "uuid-del-aliado",
  "escuela_id": 3,
  "monto": 5000.00,
  "moneda": "MXN",
  "estado": "pendiente",
  "notas": "Observaciones opcionales"
}
```

### Body PATCH `/donaciones-economicas/:id`
```json
{
  "estado": "completada"
}
```
