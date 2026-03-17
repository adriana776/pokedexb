# Pokedex Backend - NestJS

Este es el backend del proyecto Pokedex, construido con [NestJS](https://nestjs.com/) y MongoDB.

## Requisitos Previos

Para poder ejecutar e interactuar con este proyecto en tu entorno local, necesitas tener instalados:

- **[Node.js](https://nodejs.org/)** (v18 o superior recomendado)
- **[Docker Desktop](https://www.docker.com/products/docker-desktop/)** (para levantar la base de datos de MongoDB fácilmente)

---

## Instrucciones de Instalación y Ejecución

Sigue estos pasos para arrancar el backend en tu entorno local:

### 1. Abrir o clonar la carpeta del proyecto

Abre tu terminal en la ruta principal del proyecto (la carpeta `pokedexb`).

### 2. Instalar las dependencias

Ejecuta el siguiente comando para instalar todos los paquetes de Node.js necesarios:
```bash
npm install
```

### 3. Levantar la Base de Datos

El proyecto utiliza Docker Compose para crear un contenedor con MongoDB. Asegúrate de tener Docker corriendo en tu sistema y ejecuta:
```bash
docker-compose up -d
```
*Esto descargará la imagen de Mongo y levantará un contenedor en el puerto `27017`, usando la ruta local `./mongo` para que no se pierdan tus datos al apagar el contenedor.*

### 4. Variables de Entorno

Si existe un archivo llamado `.env.template`, duplícalo y renómbralo a `.env`. (Por el momento la app se conecta a `mongodb://localhost:27017/nest-pokemon`).

### 5. Ejecutar la Aplicación

Para arrancar el servidor en modo de desarrollo con recarga automática (Watch mode):
```bash
npm run start:dev
```
*La aplicación estará corriendo en el puerto 3000 por defecto.*

### 6. Llenar la Base de Datos (Seed)

Una vez que la aplicación esté levantada, la base de datos estará vacía. Puedes llenarla con datos de prueba consumiendo el endpoint especial para "Seeding".

Abre tu navegador, Postman o usa cURL para realizar una petición **GET** a esta URL:
```text
http://localhost:3000/api/v2/seed
```
*Esto ejecutará el servicio que puebla automáticamente tu base de datos con Pokémon.*

---

## Comandos Útiles de NestJS y Docker

- `npm run start:dev` - Ejecuta la app en modo desarrollo.
- `npm run build` - Construye y compila el código a Javascript (`/dist/`).
- `npm run start:prod` - Ejecuta la versión de producción ya compilada.
- `docker-compose down` - Apaga y borra el contenedor de la base de datos de MongoDB.
