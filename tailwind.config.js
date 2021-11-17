/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  purge: ['./public/index.html', './src/**/!(tailwind).{ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Noto Sans'],
    },
    extend: {
      colors: {
        accent: {
          start: 'var(--accent-start)',
          via: 'var(--accent-via)',
          end: 'var(--accent-end)',
        },
      },
    },
  },
}
