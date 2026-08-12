# 👓 Óptica Lentes J.L.

Aplicación web Full Stack desarrollada para la gestión y presencia digital
de Óptica Lentes J.L.

El sistema cuenta con un sitio web público y un panel administrativo protegido
para gestionar la información de la óptica.

---

## 🚀 Tecnologías utilizadas

### Frontend

- React
- Vite
- React Router
- Axios
- CSS
- React Icons

### Backend

- Java 21
- Spring Boot
- Spring Data JPA
- Spring Security
- BCrypt
- JWT
- Maven

### Base de datos

- MySQL

### Herramientas

- Visual Studio Code
- IntelliJ IDEA
- MySQL Workbench
- Postman
- Git
- GitHub

---

## 🧩 Funcionalidades

### Sitio público

- Página principal de la óptica
- Sección de servicios
- Productos destacados
- Promociones
- Testimonios
- Información de contacto
- Acceso al login administrativo

### Panel administrativo

- Inicio de sesión de administrador
- Autenticación mediante JWT
- Rutas administrativas protegidas
- Dashboard administrativo
- Gestión de productos
- Creación de productos
- Edición de productos
- Eliminación de productos
- Control de inventario
- Cierre de sesión

---

## 🏗️ Arquitectura

El proyecto utiliza una arquitectura Full Stack separando frontend,
backend y base de datos.

```text
Usuario
   │
   ▼
React + Vite
   │
   │ HTTP / JSON
   ▼
API REST
   │
   ▼
Spring Boot
   │
   ├── Controller
   │
   ├── Service
   │
   ├── Repository
   │
   └── Security / JWT
   │
   ▼
JPA / Hibernate
   │
   ▼
MySQL
```

## Ejecución local

El frontend no se conecta directamente a MySQL. El flujo correcto es:

```text
React (5173) -> Spring Boot (8080) -> MySQL (3306)
```

1. Verifica que el servicio MySQL esté iniciado y que exista la base de datos
   `optica_lentes_jl`.
2. Inicia el backend desde IntelliJ con estas variables de entorno:
   `DB_PASSWORD`, `JWT_SECRET`, `ADMIN_EMAIL` y `ADMIN_PASSWORD`.
3. Confirma que `http://localhost:8080/api/products` responde antes de iniciar
   el frontend.
4. En otra terminal, inicia React:

```powershell
cd frontend
npm run dev
```

Durante el desarrollo, Vite redirige automáticamente las solicitudes hechas a
`/api` hacia `http://localhost:8080`.
