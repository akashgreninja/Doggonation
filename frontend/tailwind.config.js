/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
   
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    // spacing: {
    //   '1': '200px',
    //   '2': '12px',
    //   '3': '16px',
    //   '4': '24px',
    //   '5': '32px',
    //   '6': '48px',
    // },
   
    extend: {
      colors: {
        clifford: "#da373d",
      },
      height: {
        // "3/4": "60px",
        forgif: "30rem",
        // "footer-height": "16rem",
        lastsectionh:"10vw"
      },
      width: {
        forgif: "70vw",
        lastsectionw:"30vw"
      },
      margin: {
        "4/5": "13rem",
        check: "10%",
        test: "10%",
        fortest2:"20%",
        bottommargin:"70px"
      },
      backgroundColor: {
        "chakranti-200": "rgb(15 15 15)",
        "footer-400": "rgb(22 21  23)",
      },
      backgroundImage: {
        "garvi-background": "url('./images/1120_Slice-Illos-2-copy.gif')",
      },
      fontSize: {
        bigg: "6rem",
        smoller: "2rem",
        medium: "3rem",
      },
      fontFamily: {
        sans: ["CustomFont", "Helvetica", "Arial", "sans-serif"],
      },
      keyframes: {
        bounce: {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0)" },
        },
        pulse:{
          "0%" : {transform: "scale(1)"},
          "50%" : {transform: "scale(1.5)"},
          "100%" : {transform: "scale(1)"}
          
        },
        opacity:{
          "0%" : {opacity: "0"},
          "50%" : {opacity: "1"},
          "100%" : {opacity: "0"}
        }
      },
      
      
      animation: {
        bounce: "bounce 1s infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        opacity: " opacity 1s fade-in "
      },
    },
  },
  plugins: [],
};
