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