# 👓 Óptica Lentes J.L.

Aplicación web Full Stack para la presencia digital y la gestión administrativa de **Óptica Lentes J.L.** El proyecto incluye un sitio público para clientes, catálogo de productos, sistema de agendamiento conectado a MySQL y un panel administrativo protegido.

## 🌐 Aplicación en producción

- **Frontend (Vercel):** https://optica-lentes-jl.vercel.app
- **Backend API (Railway):** https://optica-lentes-jl-production.up.railway.app
- **Endpoint público de productos:** https://optica-lentes-jl-production.up.railway.app/api/products
- **Base de datos:** MySQL alojado en Railway.
- **Repositorio:** GitHub (`main` es la rama utilizada para producción).

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

### DevOps / Producción

- Git y GitHub
- Railway para Spring Boot y MySQL
- Vercel para React + Vite
- Variables de entorno para credenciales, URLs y configuración sensible
- Despliegue automático desde la rama `main`

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
- Productos iniciales creados automáticamente si todavía no existen.
- Formato de precios en pesos colombianos.
- Alertas de productos con pocas existencias.
- Cierre de sesión.

## Arquitectura local

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

El frontend nunca se conecta directamente a MySQL. Todas las operaciones pasan por la API REST del backend.

## Arquitectura de producción

```text
                    INTERNET
                       │
                       ▼
              React + Vite
                  Vercel
                       │
                       │ HTTPS / JSON
                       ▼
                Spring Boot
                  Railway
                       │
                       │ JDBC
                       ▼
                    MySQL
                  Railway
```

### Flujo de producción

1. El usuario entra a la aplicación publicada en Vercel.
2. React utiliza `VITE_API_URL` para comunicarse con la API pública de Railway.
3. Spring Boot procesa autenticación, productos, citas y reglas de negocio.
4. JPA / Hibernate se comunica con MySQL en Railway.
5. Las credenciales y secretos se mantienen en variables de entorno y no en GitHub.

## Modelo de citas

Las citas se almacenan en la tabla `appointments` con la información del paciente, fecha, hora, estado, motivo de cancelación y fechas de auditoría.

Estados disponibles:

- `PENDING`: cita activa y pendiente de atención.
- `CANCELLED`: cita cancelada cuyo horario vuelve a estar disponible.

La combinación de fecha, hora y ocupación activa está protegida por una restricción única en MySQL. Esto evita que dos solicitudes simultáneas reserven el mismo horario.

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

## Requisitos para ejecutar el proyecto localmente

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

Hibernate crea o actualiza las tablas al iniciar el backend mediante `spring.jpa.hibernate.ddl-auto=update`.

### 2. Variables de entorno del backend

Configura las siguientes variables en IntelliJ, Windows o en la terminal donde iniciarás Spring Boot:

| Variable | Descripción |
| --- | --- |
| `DB_PASSWORD` | Contraseña del usuario de MySQL |
| `JWT_SECRET` | Secreto utilizado para firmar los tokens JWT |
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

### 3. Variable de entorno del frontend

Crea `frontend/.env`:

```env
VITE_API_URL=http://localhost:8080/api
```

El archivo `.env` local no debe contenerse en GitHub. El archivo `.env.example` sirve como referencia.

### 4. Backend

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

Comprueba que el backend responda en:

```text
http://localhost:8080/api/products
```

### 5. Frontend

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

React obtiene la URL base de la API desde `VITE_API_URL`.

## Preparación para producción

### Build del frontend

```powershell
cd frontend
npm run build
```

Vite genera la versión optimizada en:

```text
frontend/dist/
```

### Empaquetado del backend

Con Java 21 y `JAVA_HOME` configurado:

```powershell
cd backend
.\mvnw.cmd clean package
```

Maven genera el ejecutable de Spring Boot en:

```text
backend/target/backend-0.0.1-SNAPSHOT.jar
```

## Despliegue del backend y MySQL en Railway

El repositorio es un monorepo:

```text
Optica-Lentes-JL/
├── backend/
└── frontend/
```

Para el servicio Spring Boot en Railway se configuró:

```text
Branch: main
Root Directory: /backend
Target Port: 8080
```

### Variables del backend en Railway

El servicio `Optica-Lentes-JL` utiliza:

| Variable | Uso |
| --- | --- |
| `DB_URL` | URL JDBC de MySQL en Railway |
| `DB_USERNAME` | Usuario MySQL |
| `DB_PASSWORD` | Contraseña MySQL |
| `JWT_SECRET` | Firma de tokens JWT |
| `ADMIN_EMAIL` | Correo del administrador |
| `ADMIN_PASSWORD` | Contraseña del administrador |
| `FRONTEND_URL` | Dominio permitido por CORS |

Las variables de conexión se enlazan con el servicio MySQL de Railway mediante referencias internas, evitando copiar credenciales al código.

Ejemplo conceptual:

```text
DB_USERNAME -> MySQL.MYSQLUSER
DB_PASSWORD -> MySQL.MYSQLPASSWORD
DB_URL      -> jdbc:mysql://HOST:PORT/DATABASE
```

El backend público queda disponible en:

```text
https://optica-lentes-jl-production.up.railway.app
```

## Despliegue del frontend en Vercel

Vercel está conectado al mismo repositorio de GitHub y utiliza:

```text
Branch: main
Root Directory: frontend
Framework Preset: Vite
Node.js: 22.x
Build Command: npm run build
Output Directory: dist
```

Variable de producción:

```env
VITE_API_URL=https://optica-lentes-jl-production.up.railway.app/api
```

Frontend público:

```text
https://optica-lentes-jl.vercel.app
```

## CORS en producción

El backend limita las solicitudes al dominio configurado mediante `FRONTEND_URL`.

En Railway:

```text
FRONTEND_URL=https://optica-lentes-jl.vercel.app
```

Esto permite que el frontend desplegado en Vercel consuma de forma controlada la API de Spring Boot desplegada en Railway.

## Despliegue automático con GitHub

La rama de producción es:

```text
main
```

El flujo habitual para publicar una actualización es:

```powershell
git status
git add .
git commit -m "Descripcion del cambio"
git push origin main
```

Después del `push`:

```text
GitHub main
     │
     ├──► Railway → recompila y despliega el backend
     │
     └──► Vercel → recompila y despliega el frontend
```

No es necesario mantener VS Code, IntelliJ, MySQL Workbench ni el computador encendidos para que la aplicación de producción continúe funcionando.

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
- Las contraseñas se almacenan mediante BCrypt.
- Los secretos se gestionan mediante variables de entorno.
- Los datos de entrada se validan tanto en React como en Spring Boot.
- MySQL protege los horarios contra reservas simultáneas.
- Las excepciones de la agenda generan respuestas HTTP comprensibles.
- La configuración CORS limita el acceso al origen definido para el frontend.
- El frontend nunca accede directamente a MySQL.
- Railway mantiene el backend y MySQL independientes del entorno local.
- Vercel sirve el frontend optimizado mediante HTTPS.

## Estado del proyecto

```text
Frontend React / Vercel       ✅ Online
Backend Spring Boot / Railway ✅ Online
MySQL / Railway               ✅ Online
GitHub main                   ✅ Sincronizado
```

**Óptica Lentes J.L. se encuentra desplegada y funcional en producción.**
