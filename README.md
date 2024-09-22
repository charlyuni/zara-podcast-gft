# Zara Podcast App

Este proyecto es una aplicación de podcasts desarrollada con **Next.js**, **TypeScript** y **Tailwind CSS**. La aplicación permite listar los podcasts más populares, obtener detalles de los podcasts y reproducir episodios específicos. Utiliza la API de iTunes para obtener los datos de los podcasts.

## Características

- **Listar podcasts**: Visualiza una lista de los podcasts más populares en la categoría de tecnología.
- **Detalles del podcast**: Muestra la información detallada de un podcast específico, como la descripción y los episodios disponibles.
- **Reproducción de episodios**: Permite reproducir episodios de podcast directamente en la aplicación.
- **Soporte para varios entornos**: El proyecto está configurado para manejar entornos de desarrollo y producción.

## Tecnologías utilizadas

- **Next.js**: Framework de React para desarrollo del lado del servidor (SSR) y generación de sitios estáticos (SSG).
- **TypeScript**: Superconjunto de JavaScript que agrega tipado estático.
- **Tailwind CSS**: Framework de CSS para estilos rápidos y personalizados.
- **React Query**: Gestión eficiente de datos y caché.
- **ESLint**: Linter para mantener el código limpio y consistente.
- **Jest**: Framework de pruebas para asegurarse de que la aplicación funcione correctamente.
- **iTunes API**: API pública de iTunes para obtener información sobre podcasts.

## Instalación y uso

### Prerrequisitos

- **Node.js** (versión 14 o superior)
- **npm** o **yarn**

### Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/charlyuni/zara-podcast-gft
   cd zara-podcast-app
   ```

2. Instalar dependencias:

   ```bash
   npm install
   # o
   yarn install
   ```

3. Configurar entornos:

   Crea archivos `.env.development` y `.env.production` con las siguientes variables:

   - **NEXT_PUBLIC_BASE_URL**=https://itunes.apple.com/
   - **NEXT_PUBLIC_CORS_PROXY**=https://api.allorigins.win/raw?url=

4. Iniciar en modo desarrollo:

   ```bash
   npm run dev
   # o
   yarn dev
   ```

   La aplicación estará disponible en [http://localhost:3000](http://localhost:3000) o en el puerto disponible.

### Scripts disponibles

- **`npm run dev`**: Ejecuta la aplicación en modo de desarrollo.
- **`npm run build`**: Compila la aplicación para producción.
- **`npm start`**: Inicia la aplicación en modo producción después de haber ejecutado `build`.
- **`npm run lint`**: Ejecuta ESLint para verificar la consistencia del código.
- **`npm run test`**: Ejecuta las pruebas con Jest.

## Despliegue

Puedes ver la aplicación en producción aquí: [https://zara-podcast-gft.vercel.app/](https://zara-podcast-gft.vercel.app/)

---

### Autor

Desarrollado por **Charlyuni**.

