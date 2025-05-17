/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // colores base
        body: 'var(--color-body)',
        'body-end': 'var(--color-body-end)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',

        // extras
        accent: 'var(--color-accent)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        danger: 'var(--color-danger)',
        muted: 'var(--color-muted)',

        // texto/iconos en los colores bases
        'on-body': 'var(--color-on-body)',
        'on-primary': 'var(--color-on-primary)',
        'on-secondary': 'var(--color-on-secondary)',
      },
    },
  },
  plugins: [],
};
