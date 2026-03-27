/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        vwa: {
          background: "#F5EEE4",
          primary: "#1D5B6B", // bleu pétrole
          accent: "#C78C3B", // or / ocre
          dark: "#3B261D", // marron profond
          terracotta: "#C44B34",
          green: "#4B7A3D",
          blueSoft: "#2F7188",

          // >>> ajout pour les tags / badges
          primarySoft: "rgba(29, 91, 107, 0.08)",
          primarySoftHover: "rgba(29, 91, 107, 0.12)",
        },
      },
    },
  },
  plugins: [],
};
