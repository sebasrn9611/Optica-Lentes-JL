# 👓 Óptica Lentes J.L.

Aplicación web Full Stack para la presencia digital y la gestión administrativa
de Óptica Lentes J.L. El proyecto incluye un sitio público para clientes, un
sistema de agendamiento conectado a MySQL y un panel administrativo protegido.

## Tecnologías

### Frontend

- React 19
- Vite
- React Router
- Axios
- CSS responsive
- React Icons

### Backend

- Java 21
- Spring Boot
- Spring Data JPA / Hibernate
- Spring Security
- JWT
- BCrypt
- Maven

### Base de datos

- MySQL 8

## Funcionalidades

### Sitio público

- Página principal responsive de la óptica.
- Barra de navegación y acceso al inicio de sesión administrativo.
- Presentación de servicios, productos, promociones y testimonios.
- Guías para orientar a los clientes.
- Información de contacto y acceso directo a WhatsApp.
- Catálogo de productos consultado desde Spring Boot y MySQL.

### Agendamiento de citas

- Formulario accesible desde el botón **Agendar cita**.
- Registro de nombre, apellido, cédula, celular y correo electrónico.
- Validación de datos en el frontend y en el backend.
- Calendario con consulta de disponibilidad en tiempo real.
- Horarios en intervalos de 30 minutos.
- Atención de lunes a sábado:
  - 8:00 a. m. a 12:00 m.
  - 2:00 p. m. a 6:00 p. m.
- Reservas permitidas hasta con tres meses de anticipación.
- Bloqueo de fechas pasadas y domingos.
- Prevención de dobles reservas desde la aplicación y la base de datos.
- Confirmación visual después de guardar la cita.
- Liberación automática del horario cuando una cita es cancelada.
- Conservación del historial de cancelaciones.

### Panel administrativo

- Inicio de sesión del administrador.
- Autenticación mediante JWT.
- Contraseñas protegidas con BCrypt.
- Rutas administrativas protegidas.
- Dashboard con información obtenida desde la API.
- Conteo de citas pendientes, citas de hoy, próximas y canceladas.
- Consulta de los datos de contacto de cada paciente.
- Filtros para citas pendientes, canceladas o todas.
- Reagendamiento según la disponibilidad actual.
- Cancelación de citas con motivo opcional.
- Gestión de productos:
  - creación;
  - consulta;
  - edición;
  - eliminación;
  - control de inventario.
- Alertas de productos con pocas existencias.
- Cierre de sesión.

## Arquitectura

```text
Cliente o administrador
        │
        ▼
React + Vite (5173)
        │
        │ HTTP / JSON
        ▼
API REST - Spring Boot (8080)
        │
        ├── Controllers
        ├── Services
        ├── Repositories
        ├── Validación
        └── Spring Security / JWT
        │
        ▼
JPA / Hibernate
        │
        ▼
MySQL (3306)
```

El frontend nunca se conecta directamente a MySQL. Todas las operaciones pasan
por la API REST del backend.

## Modelo de citas

Las citas se almacenan en la tabla `appointments` con la información del
paciente, fecha, hora, estado, motivo de cancelación y fechas de auditoría.

Estados disponibles:

- `PENDING`: cita activa y pendiente de atención.
- `CANCELLED`: cita cancelada cuyo horario vuelve a estar disponible.

La combinación de fecha, hora y ocupación activa está protegida por una
restricción única en MySQL. Esto evita que dos solicitudes simultáneas reserven
el mismo horario.

## Endpoints principales

### Públicos

| Método | Endpoint | Descripción |
| --- | --- | --- |
| `GET` | `/api/products` | Consulta el catálogo de productos |
| `GET` | `/api/testimonials` | Consulta los testimonios |
| `POST` | `/api/testimonials` | Registra un testimonio |
| `GET` | `/api/appointments/availability?date=AAAA-MM-DD` | Consulta horarios libres |
| `POST` | `/api/appointments` | Registra una cita |
| `POST` | `/api/auth/login` | Inicia sesión como administrador |

### Administrativos

Estos endpoints requieren `Authorization: Bearer <token>`.

| Método | Endpoint | Descripción |
| --- | --- | --- |
| `GET` | `/api/appointments` | Lista las citas |
| `GET` | `/api/appointments/stats` | Consulta los indicadores de la agenda |
| `PUT` | `/api/appointments/{id}/reschedule` | Reagenda una cita |
| `PUT` | `/api/appointments/{id}/cancel` | Cancela una cita |
| `POST` | `/api/products` | Crea un producto |
| `PUT` | `/api/products/{id}` | Actualiza un producto |
| `DELETE` | `/api/products/{id}` | Elimina un producto |

## Requisitos para ejecutar el proyecto

- Java 21
- Node.js y npm
- MySQL 8
- Git

## Configuración local

### 1. Base de datos

Inicia MySQL y crea la base de datos si todavía no existe:

```sql
CREATE DATABASE optica_lentes_jl;
```

Hibernate crea o actualiza las tablas al iniciar el backend mediante
`spring.jpa.hibernate.ddl-auto=update`.

### 2. Variables de entorno

Configura las siguientes variables en IntelliJ o en la terminal donde iniciarás
Spring Boot:

| Variable | Descripción |
| --- | --- |
| `DB_PASSWORD` | Contraseña del usuario de MySQL |
| `JWT_SECRET` | Secreto seguro utilizado para firmar los tokens |
| `ADMIN_EMAIL` | Correo del administrador inicial |
| `ADMIN_PASSWORD` | Contraseña del administrador inicial |

Variables opcionales:

| Variable | Valor predeterminado |
| --- | --- |
| `DB_URL` | `jdbc:mysql://127.0.0.1:3306/optica_lentes_jl` |
| `DB_USERNAME` | `root` |
| `PORT` | `8080` |
| `FRONTEND_URL` | `http://localhost:5173` |

No guardes contraseñas ni secretos reales dentro del repositorio.

### 3. Backend

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

Comprueba que el backend responda en:

```text
http://localhost:8080/api/products
```

### 4. Frontend

En otra terminal:

```powershell
cd frontend
npm install
npm run dev
```

Abre la aplicación en:

```text
http://localhost:5173
```

Durante el desarrollo, Vite redirige las solicitudes hechas a `/api` hacia
Spring Boot en el puerto `8080`.

## Pruebas y verificación

### Backend

```powershell
cd backend
.\mvnw.cmd test
```

Las pruebas cubren, entre otros casos:

- carga completa del contexto de Spring Boot;
- exclusión de horarios ya reservados;
- rechazo de reservas duplicadas;
- liberación del horario al cancelar;
- bloqueo del reagendamiento de citas canceladas.

### Frontend

```powershell
cd frontend
npm run lint
npm run build
```

## Seguridad y estabilidad

- Los endpoints administrativos requieren un JWT válido con rol `ADMIN`.
- Los datos de entrada se validan tanto en React como en Spring Boot.
- MySQL protege los horarios contra reservas simultáneas.
- Las excepciones de la agenda generan respuestas HTTP comprensibles.
- Tomcat utiliza un directorio local de trabajo y no depende de carpetas
  temporales compartidas de Windows.
- La configuración CORS limita el acceso al origen definido para el frontend.
