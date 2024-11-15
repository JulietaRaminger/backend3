# Proyecto Backend de Adopción de Mascotas

Este proyecto es una API RESTful que permite gestionar usuarios y adopciones de mascotas. Está construido con Node.js y utiliza MongoDB para almacenar los datos. Además, el proyecto está Dockerizado y los endpoints están documentados con Swagger.

## Tecnologías Utilizadas

- **Node.js**: Para la ejecución del servidor y la lógica del backend.
- **Express.js**: Framework para gestionar las rutas y solicitudes HTTP.
- **MongoDB**: Base de datos NoSQL utilizada para almacenar los datos.
- **Mongoose**: ODM para interactuar con MongoDB de manera eficiente.
- **Swagger**: Para la documentación de las rutas de la API.
- **Docker**: Para la contenedorización del proyecto.
- **Jest**: Framework de testing utilizado para realizar pruebas funcionales.

## Endpoints Principales

### Users

- **POST /users**: Crea un nuevo usuario.
- **GET /users**: Obtiene todos los usuarios.
- **GET /users/:id**: Obtiene un usuario por ID.
- **PUT /users/:id**: Actualiza los datos de un usuario.
- **DELETE /users/:id**: Elimina un usuario.

### Adoption

- **POST /adoptions**: Crea una nueva adopción.
- **GET /adoptions**: Obtiene todas las adopciones.
- **GET /adoptions/:id**: Obtiene una adopción por ID.
- **PUT /adoptions/:id**: Actualiza una adopción.
- **DELETE /adoptions/:id**: Elimina una adopción.

## Docker

-- https://hub.docker.com/r/julietaraminger/adoption/tags

Este proyecto está Dockerizado. Para construir la imagen de Docker, ejecuta:
docker build -t adoption .

Para ejecutar el contenedor:
docker run --name app1 -p 3000:8080 adoption

Subida a Docker Hub
La imagen de Docker del proyecto se encuentra disponible en Docker Hub. Puedes obtenerla e instalarla con el siguiente comando:
-- docker pull julietaraminger/adoption:1.0.0


Instalación

Clona el repositorio:
git clone https://github.com/JulietaRaminger/backend3

Instala las dependencias:
npm install

Ejecuta el servidor:
npm start



### Detalles a personalizar:
1. **Docker Hub**: Asegúrate de reemplazar `tu_usuario_docker` con tu nombre de usuario de Docker Hub.
2. **Repositorio GitHub**: Reemplaza el enlace en `git clone` con el enlace correcto de tu repositorio.
3. **Licencia**: Si estás utilizando otra licencia diferente a MIT, puedes cambiarla según corresponda.

Este README cubre los aspectos clave de tu proyecto: instalación, ejecución, documentación de API con Swagger, Docker, pruebas y despliegue.

