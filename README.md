# Proyecto Semestral - Tienda de Camisetas de Fútbol

Este proyecto es un sitio web de e-commerce para la venta de camisetas de fútbol. Está desarrollado con **Node.js** y **Express** en el backend, y **React** en el frontend. La base de datos utilizada es **MySQL**.

---

## Tabla de contenidos

- [Proyecto Semestral - Tienda de Camisetas de Fútbol](#proyecto-semestral---tienda-de-camisetas-de-fútbol)
  - [Tabla de contenidos](#tabla-de-contenidos)
  - [Descripción del Proyecto](#descripción-del-proyecto)
  - [Requisitos](#requisitos)
  - [Configuración del Proyecto](#configuración-del-proyecto)
    - [Paso 1: Clonar el repositorio](#paso-1-clonar-el-repositorio)
    - [Paso 2: Instalar dependencias del backend](#paso-2-instalar-dependencias-del-backend)
    - [Paso 3: Instalar dependencias del frontend](#paso-3-instalar-dependencias-del-frontend)
    - [Paso 4: Configurar la base de datos local](#paso-4-configurar-la-base-de-datos-local)
    - [Paso 5: Configurar el archivo `.env`](#paso-5-configurar-el-archivo-env)
    - [Paso 6: Iniciar el servidor backend](#paso-6-iniciar-el-servidor-backend)
    - [Paso 7: Iniciar el frontend](#paso-7-iniciar-el-frontend)
    - [Paso 8: Acceder a la aplicación](#paso-8-acceder-a-la-aplicación)
  - [Tecnologías utilizadas](#tecnologías-utilizadas)

---

## Descripción del Proyecto

Este proyecto es una tienda en línea que permite a los usuarios comprar camisetas de fútbol. Incluye:
- Registro y autenticación de usuarios.
- Listado de camisetas con la posibilidad de filtrarlas por equipo y liga.
- Funcionalidad de carrito de compras para los usuarios autenticados.
- Multilenguaje (español e inglés) y diseño responsive siguiendo las pautas de Material UI.

---

## Requisitos

Asegúrate de tener instalados los siguientes programas en tu máquina:
- **Node.js**: https://nodejs.org/
- **XAMPP** o **MySQL Workbench** para MySQL
- **Git**

---

## Configuración del Proyecto

### Paso 1: Clonar el repositorio

Clona este repositorio en tu máquina local usando Git.

```bash
git clone https://github.com/tu_usuario/proyecto-semestral.git
cd proyecto-semestral
```

### Paso 2: Instalar dependencias del backend
Navega a la carpeta **backend** e instala las dependencias usando **npm**.

```bash
cd backend
npm install
```

### Paso 3: Instalar dependencias del frontend
Navega a la carpeta **client** e instala las dependencias usando **npm**.
```bash
cd client
npm install
```

### Paso 4: Configurar la base de datos local
Crea una base de datos en MySQL Workbench o XAMPP llamada `tienda_camisetas`.
Usa el archivo `create_database.sql` que se encuentra en la carpeta `sql/` para crear las tablas necesarias.


### Paso 5: Configurar el archivo `.env`
Cada miembro del equipo recibirá un archivo `.env` que debe ser configurado en la carpeta backend/. Este archivo contiene las credenciales para la base de datos y otras variables de entorno necesarias.

Ejemplo de contenido del archivo .env:
```env
DB_HOST="localhost"
DB_USER="root"
DB_PASSWORD=""
DB_NAME="tienda_camisetas"
PORT="5000"
JWT_SECRET=""
```

### Paso 6: Iniciar el servidor backend
Una vez configurada la base de datos y el archivo `.env`, navega a la carpeta backend y ejecuta el servidor Node.js.
```bash
cd backend
node server.js
```

### Paso 7: Iniciar el frontend
Navega a la carpeta client y ejecuta el servidor React.
```bash
cd client
npm start
```

### Paso 8: Acceder a la aplicación
- El backend estará corriendo en: http://localhost:5000
- El frontend estará disponible en: http://localhost:3000


---

## Tecnologías utilizadas

**Frontend**
- React: Librería para construir interfaces de usuario.
- Material UI: Librería de componentes para React con estilo moderno y responsivo.
' i18next: Librería para implementar multilenguaje en React.

**Backend**
- Node.js: Entorno de ejecución de JavaScript para el backend.
- Express: Framework web para Node.js.
- bcrypt: Para cifrar las contraseñas de los usuarios.
- jsonwebtoken (JWT): Para manejar la autenticación de usuarios.