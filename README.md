# OfiGO — Backend

Plataforma para encontrar profesionales de oficios en Tucumán: plomeros, electricistas, pintores, cerrajeros y más.
Los clientes buscan, comparan y piden el servicio; los profesionales reciben y gestionan sus pedidos.

## 👥 Integrantes

* Medina, Lourdes Natalí
* Cura, Rocío Julieta
* Galván, Rocío Julieta

**Programación IV · Comisión 9**


## 📌 Descripción

Este repositorio es el **backend** de OfiGO, desarrollado con **NestJS** y **TypeScript**.

Es un servidor que recibe peticiones, las procesa y responde con datos en formato JSON. Está organizado en **módulos**, uno por cada tipo de dato que maneja la plataforma.

---

## 🛠️ Tecnologías utilizadas

* **NestJS** – Framework de Node.js para construir el servidor, organizado en módulos.
* **TypeScript** – JavaScript con tipos: cada variable y función indica qué dato recibe y qué devuelve.
* **Nest CLI** – Para crear el proyecto y generar los módulos con un comando.
* **Vitest** – Para los tests.

## ▶️ Instalación y ejecución

**Requisitos:** tener instalado [Node.js](https://nodejs.org) (incluye npm) y Git.

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/rocura26/TP3-programacion-c9.git
   ```

2. Entrar a la carpeta del proyecto:

   ```bash
   cd TP3-programacion-c9
   ```

3. Instalar las dependencias:

   ```bash
   npm install
   ```

4. Crear un archivo `.env` en la raíz con el puerto del servidor (no se sube al repositorio):

   ```
   PORT=3000
   ```

5. Levantar el servidor en modo desarrollo:

   ```bash
   npm run start:dev
   ```

6. Si en la terminal aparece `Nest application successfully started`, el servidor funciona. Se puede probar abriendo [http://localhost:3000](http://localhost:3000) en el navegador.

**Otros comandos:**

| Comando | Para qué sirve |
|---|---|
| `npm run build` | Compila el proyecto en la carpeta `dist` |
| `npm run start:prod` | Corre la versión compilada |
| `npm test` | Corre los tests |
| `npm run lint` | Revisa el código en busca de errores |

**Nest CLI (opcional):** para usar el comando `nest` directamente hay que instalarlo de forma global con `npm install -g @nestjs/cli`. Si no, se puede usar `npx nest ...`.

---

## 📁 Estructura de carpetas

```
src/
├── main.ts                 → Arranca el servidor
└── modules/
    ├── app/                → Módulo principal: une a todos los demás
    ├── auth/               → Inicio de sesión
    ├── users/              → Usuarios (clientes y profesionales)
    ├── pedidos/            → Pedidos de servicio
    └── categorias/         → Oficios (Plomería, Electricidad, Pintura…)
```

## 🧩 Módulos

Cada módulo se generó con:

```bash
npx nest g resource modules/nombre-modulo
```

eligiendo **REST API** y la generación de **CRUD**. Todos los módulos se registran en `src/modules/app/app.module.ts`.

| Módulo | Ruta | Para qué sirve |
|---|---|---|
| `auth` | `/auth` | Inicio de sesión de clientes y profesionales |
| `users` | `/users` | Cuentas de clientes y profesionales; los profesionales suman oficio, precio por hora, zona y descripción |
| `pedidos` | `/pedidos` | Pedidos de servicio, con dirección, fecha, descripción y estado |
| `categorias` | `/categorias` | Los oficios: Plomería, Electricidad, Pintura… |

Cada ruta tiene las cinco operaciones del CRUD:

| Método | Ruta | Acción |
|---|---|---|
| `POST` | `/pedidos` | Crear |
| `GET` | `/pedidos` | Listar todos |
| `GET` | `/pedidos/:id` | Ver uno |
| `PATCH` | `/pedidos/:id` | Modificar |
| `DELETE` | `/pedidos/:id` | Eliminar |

### Archivos de cada módulo

| Archivo | Qué hace |
|---|---|
| `*.controller.ts` | Define las rutas: recibe la petición y devuelve la respuesta |
| `*.service.ts` | Tiene la lógica: buscar, validar, guardar |
| `*.module.ts` | Une el controller y el service |
| `dto/` | Define qué datos se reciben al crear o modificar |
| `entities/` | Define la forma de cada dato (por ejemplo, qué campos tiene un pedido) |

## 🚧 Mejoras pendientes

* Completar los DTOs y las entities de cada módulo con sus campos.
* Reemplazar los textos de prueba de los services por la lógica real.
* Conectar una base de datos.

## 🌿 Forma de trabajo

Todos los integrantes clonan el repositorio y trabajan como colaboradores, cada uno en su propia rama. Los cambios se suben mediante **Pull Request** hacia `main`.

| Rama | Cuándo se usa | Ejemplo |
|---|---|---|
| `feature/...` | Se agrega algo nuevo | `feature/estructura-modulos` |
| `refactor/...` | Se reorganiza código sin cambiar lo que hace | `refactor/servicio-pedidos` |
| `fix/...` | Se corrige un error | `fix/login-auth` |
| `docs/...` | Se cambia documentación | `docs/readme` |
