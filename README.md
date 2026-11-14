# ESCALONES

ESCALONES es una plataforma web desarrollada para una imprenta, librería y espacio de coworking con atención las 24 horas.

El proyecto surge con el objetivo de centralizar en un mismo sistema diferentes necesidades, especialmente de estudiantes y personas que trabajan o estudian fuera de sus hogares. La plataforma permite realizar pedidos de impresión, comprar productos de librería, realizar reservas y gestionar distintos servicios desde un mismo lugar.

## Funcionalidades principales

- Registro e inicio de sesión de usuarios.
- Gestión de usuarios y cuentas.
- Pedidos de impresión online.
- Carga y gestión de archivos para impresión.
- Tienda online de productos de librería.
- Gestión de productos y categorías.
- Reservas del espacio de coworking.
- Reservas de mesas y juegos.
- Gestión de pedidos y reservas.
- Pagos mediante Mercado Pago.
- Formularios de contacto.
- Envío de correos electrónicos.
- Generación y visualización de documentos PDF.

## Estructura del proyecto

El proyecto se encuentra dividido en dos aplicaciones principales:

- `escalone/` — Frontend desarrollado con React y Vite.
- `escalone-api/` — Backend/API desarrollado con PHP y Laravel.

## Aplicación móvil

ESCALONES también cuenta con una aplicación móvil
desarrollada con React Native y Expo.

Repositorio:
https://github.com/pablonnovillo/Escalones-Mobile

## Tecnologías utilizadas

### Frontend

- React 19
- Vite 7
- JavaScript
- Bootstrap 5
- React Router DOM
- Axios
- React Toastify
- Flatpickr / React Flatpickr
- Card Validator
- jsPDF
- PDF.js
- Popper.js
- Mercado Pago SDK para React

### Backend

- PHP 8.2+
- Laravel 12
- Laravel Sanctum
- JWT Auth
- PHPMailer
- Mercado Pago SDK para PHP

### Base de datos

- MySQL

## Integraciones y librerías principales

- Mercado Pago — procesamiento de pagos.
- Laravel Sanctum / JWT Auth — autenticación y seguridad.
- PHPMailer — envío de correos electrónicos.
- Axios — comunicación entre frontend y API.
- Bootstrap — diseño y componentes de interfaz.
- React Router DOM — navegación del frontend.
- React Toastify — notificaciones al usuario.
- Flatpickr / React Flatpickr — selección y gestión de fechas.
- Card Validator — validación de datos de tarjetas.
- jsPDF / PDF.js — generación y visualización de documentos PDF.
- Popper.js — posicionamiento de componentes de interfaz.

## Requisitos previos

Para ejecutar el proyecto localmente se requiere tener instalado:

- Node.js y npm
- PHP 8.2 o superior
- Composer
- XAMPP
- MySQL

## Cómo ejecutar el proyecto

### 1. Base de datos

Abrir XAMPP e iniciar los servicios:

- Apache
- MySQL

Luego ingresar desde el navegador a:

```text
http://localhost/phpmyadmin
```

Verificar que exista la base de datos utilizada por ESCALONES.

La configuración de conexión con MySQL se realiza mediante el archivo `.env` del backend.

### 2. Backend

Abrir una terminal e ingresar a la carpeta del backend:

```bash
cd escalone-api
```

Instalar las dependencias:

```bash
composer install
```

Ejecutar las migraciones de la base de datos:

```bash
php artisan migrate
```

Cargar los datos iniciales:

```bash
php artisan db:seed
```

Iniciar el servidor de Laravel:

```bash
php artisan serve
```

Si todo se ejecuta correctamente, el backend estará disponible normalmente en:

```text
http://127.0.0.1:8000
```

### 3. Frontend

Abrir otra terminal e ingresar a la carpeta del frontend:

```bash
cd escalone
```

Instalar las dependencias:

```bash
npm install
```

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

Si todo se ejecuta correctamente, Vite mostrará una dirección similar a:

```text
http://localhost:5173
```

### 4. Acceso al sistema

Con el backend y frontend ejecutándose, abrir en el navegador:

```text
http://localhost:5173
```

El frontend desarrollado en React se comunica con la API desarrollada en Laravel para acceder a las funcionalidades y datos del sistema.

## Variables de entorno

El proyecto utiliza variables de entorno para configurar la conexión con la base de datos y diferentes servicios externos.

Por seguridad, los archivos `.env` que contienen credenciales reales no se incluyen en el repositorio.

El archivo `.env.example` del backend puede utilizarse como referencia para realizar la configuración necesaria.

## Arquitectura del sistema

ESCALONES utiliza una arquitectura cliente-servidor.

El frontend web está desarrollado con React y Vite,
mientras que la aplicación móvil utiliza React Native
y Expo.

Ambas aplicaciones se comunican con una API REST
desarrollada con Laravel, encargada de procesar
las solicitudes, gestionar la lógica de negocio
y acceder a la base de datos MySQL.

## Puertos utilizados

| Servicio | Puerto |
|---|---|
| Frontend (React + Vite) | 5173 |
| Backend (Laravel) | 8000 |
| MySQL | 3306 |

## Estado actual del proyecto

ESCALONES se encuentra actualmente en desarrollo.

La plataforma web cuenta con una parte importante de sus funcionalidades implementadas y se continúa trabajando en las ultimas mejoras y comprobar que todo funcione correctamente.  

## Autor

**Pablo Novillo**

Proyecto académico — Analista de Sistemas.
