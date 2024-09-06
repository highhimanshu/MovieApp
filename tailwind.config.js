/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        golden: "#a28023",
        pblack: "#111827",
      },
      backgroundImage: {
        loginbg: "url('../assets/bg-image.jpg')",
      },
    },
  },
  plugins: [],
};
