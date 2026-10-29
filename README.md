# Gabydev — Portfolio de Gabriel Agüero

Portfolio personal de Gabriel Agüero, desarrollador frontend e informático en salud.

🔗 **https://devgaby.dev**

## Stack

- [Astro](https://astro.build) (sitio estático)
- [Tailwind CSS v4](https://tailwindcss.com) + `@midudev/tailwind-animations`
- [EmailJS](https://www.emailjs.com) para el formulario de contacto

## Desarrollo

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # genera ./dist/
npm run preview   # sirve el build localmente
```

## Estructura

- `src/pages/index.astro` — única página; arma el sitio con las secciones.
- `src/sections/` — Header, Hero, Contacto y Footer.
- `src/components/` — TechStack, Projects (lista de proyectos) y ProjectsCard.
- `src/icons/` — íconos SVG como componentes Astro.
- `public/images/` — capturas de los proyectos.

Para agregar un proyecto, sumá una entrada al array `projects` en `src/components/Projects.astro` y su captura en `public/images/`.
