# 🚀 Sitio Web de la Facultad de Ingeniería Informática - CUJAE

[![Estado del Proyecto](https://img.shields.io/badge/Estado-_En_Desarrollo-orange?style=for-the-badge&logo=git&logoColor=white)](https://github.com/rodnye/inf-cujae-website)

[![EvenNode Deploy Status](https://img.shields.io/github/actions/workflow/status/rodnye/inf-cujae-website/evennode.yml?label=EvenNode%20Host&style=for-the-badge&logo=icloud&logoColor=white)](https://github.com/rodnye/inf-cujae-website/actions/workflows/evennode.yml)

> Demo: http://informatica-cujae-demo.eu-4.evennode.com

Version web moderna del sitio de la Facultad de Ingeniería Informática de la CUJAE. Contruido para la Jornada Científica Estudiantil 2024-2025 de la Universidad

## ✨ Stack

- **React 19** + Next.js 15 basado en la arquitectura App Router
- Tailwind CSS
- Framer Motion para animaciones
- TypeScript
- ESLint + Prettier para calidad de código
- pnpm como gestor de paquetes

## ⚙️ Instalación

1. Clonar el repositorio
2. Instalar dependencias:

```bash
pnpm install
# o
npm install
```

## 🚦 Comandos útiles

| Comando       | Descripción                                           |
| ------------- | ----------------------------------------------------- |
| `pnpm dev`    | Inicia servidor de desarrollo (http://localhost:3000) |
| `pnpm build`  | Genera versión de producción para deploy              |
| `pnpm start`  | Inicia servidor de producción 🚀                      |
| `pnpm lint`   | Ejecuta análisis de código                            |
| `pnpm format` | Formatea el código automáticamente                    |

## 🌐 Desarrollo

1. Iniciar el entorno:

```bash
pnpm dev
```

2. Abrir en el navegador:  
   🔗 [http://localhost:3000](http://localhost:3000)

## 🤝 Contribución

Sigue las guías de estilo y asegúrate de ejecutar los linters antes de enviar cambios.

```bash
pnpm format && pnpm lint
```
