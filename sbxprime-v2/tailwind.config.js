/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#1FB462", // SBX Prime logo green
          dark: "#0F8746",
          teal: "#25A9E0", // mockup gradient end
          mint: "#35DFA9", // mockup gradient start
        },
        ink: {
          DEFAULT: "#0F1F17", // deep forest ink (text / dark sections)
          surface: "#16291F",
        },
        mist: "#E7F1EB", // page shell
        card: "#FFFFFF",
      },
      borderColor: {
        glow: "rgba(31,180,98,0.20)",
        hairline: "#DDEDE3",
      },
      fontFamily: {
        // Original SBX Prime site uses DM Sans throughout
        display: ['"DM Sans"', "system-ui", "sans-serif"],
        body: ['"DM Sans"', "system-ui", "sans-serif"],
        mono: ['"DM Sans"', "system-ui", "sans-serif"],
      },
      maxWidth: {
        shell: "76rem",
      },
    },
  },
  plugins: [],
};
