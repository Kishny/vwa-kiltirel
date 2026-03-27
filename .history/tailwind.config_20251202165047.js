/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // au cas où
  ],
  theme: {
    extend: {
      colors: {
        // on les FLAT pour être sûr
        "vwa-background": "#F5EEE4",
        "vwa-primary": "#1D5B6B", // bleu pétrole
        "vwa-accent": "#C78C3B", // or / ocre
        "vwa-dark": "#3B261D", // marron profond
        "vwa-terracotta": "#C44B34",
        "vwa-green": "#4B7A3D",
        "vwa-blueSoft": "#2F7188",
      },
    },
  },
  plugins: [],
};
