# Sistema de Gestión Empresarial

Este proyecto es un sistema de gestión empresarial desarrollado con Next.js y Supabase.

## Requisitos

- Node.js 18.x o superior
- npm o pnpm

## Configuración

1. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
\`\`\`

2. Instala las dependencias:

\`\`\`bash
npm install
# o
pnpm install
\`\`\`

## Desarrollo

Para iniciar el servidor de desarrollo:

\`\`\`bash
npm run dev
# o
pnpm dev
\`\`\`

## Construcción

Para construir la aplicación para producción:

\`\`\`bash
npm run build
# o
pnpm build
\`\`\`

## Ejecución en producción

Para iniciar la aplicación en modo producción:

\`\`\`bash
npm start
# o
pnpm start
\`\`\`

## Docker

Para construir y ejecutar la aplicación con Docker:

\`\`\`bash
docker-compose up --build
\`\`\`

## Estructura del proyecto

- `app/`: Rutas y páginas de la aplicación (App Router de Next.js)
- `components/`: Componentes React reutilizables
- `lib/`: Utilidades y configuraciones
- `public/`: Archivos estáticos
- `styles/`: Estilos globales
- `types/`: Definiciones de tipos TypeScript
