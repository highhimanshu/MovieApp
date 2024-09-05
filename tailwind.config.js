/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-golden": "#DBC078",
        "primary-background": "#343131",
      },
      backgroundImage: {
        loginbg: "url('../assets/bg-image.jpg')",
      },
    },
  },
  plugins: [],
};
