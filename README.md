# ESCALONES

ESCALONES es una plataforma web desarrollada para una imprenta, librería y espacio de coworking con atención las 24 horas.

El proyecto surge con el objetivo de centralizar en un mismo sistema diferentes necesidades, especialmente de estudiantes y personas que trabajan o estudian fuera de sus hogares. La plataforma permite gestionar pedidos de impresión, comprar productos de librería, realizar reservas y gestionar distintos servicios desde un mismo lugar.

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

## Integraciones

- Mercado Pago — procesamiento de pagos.
- PHPMailer — envío de correos electrónicos.
- Laravel Sanctum / JWT — autenticación y seguridad.
- Axios — comunicación entre frontend y API.
- jsPDF / PDF.js — generación y visualización de documentos PDF.

## Requisitos previos

Para ejecutar el proyecto localmente se requiere:

- Node.js y npm
- PHP 8.2 o superior
- Composer
- MySQL
- XAMPP o entorno equivalente

## Cómo ejecutar el proyecto

### Frontend

Ingresar a la carpeta:

```bash
cd escalone
```

Instalar las dependencias:

```bash
npm install
```

Ejecutar el servidor de desarrollo:

```bash
npm run dev
```

El frontend se ejecutará mediante Vite, normalmente en:

```text
http://localhost:5173
```

### Backend

Ingresar a la carpeta:

```bash
cd escalone-api
```

Instalar las dependencias de PHP:

```bash
composer install
```

Configurar el archivo `.env` con los datos correspondientes a la base de datos y demás servicios utilizados.

Ejecutar Laravel:

```bash
php artisan serve
```

## Base de datos

El sistema utiliza MySQL como motor de base de datos.

La configuración de conexión se realiza mediante las variables correspondientes del archivo `.env` del backend.

Por seguridad, los archivos `.env` con credenciales reales no se incluyen en el repositorio.

## Estado del proyecto

ESCALONES se encuentra actualmente en desarrollo.

La plataforma web cuenta con una parte importante de sus funcionalidades implementadas. Como evolución futura del proyecto se contempla complementar el sistema con una aplicación móvil.

## Autor

**Pablo Novillo**

Proyecto académico — Analista de Sistemas.
