<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Cliente Gateway
El gateway es el punto de conexión entre el cliente y nuestros microservicios. Es el encargado de manejar las peticiones entrantes, redireccionarlas a los microservicios correspondientes y devolver las respuestas.

## Dev

1. Clonar el repositorio
```bash
git clone 
```
2. Instalar dependencias
```bash
pnpm install
```
3. Crear un archivo `.env` basado en el `.env.template`
4. Tener levantados los microservicios que se van a consumir
5. Levantar el proyecto con
```bash
pnpm start:dev
```

## Nats
```bash
docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
```