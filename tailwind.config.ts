import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],

  theme: {
    extend: {
      /* ── Colors (همه از CSS variable می‌خونن) ── */
      colors: {
        background:  "var(--background)",
        "background-subtle": "var(--background-subtle)",
        "background-muted":  "var(--background-muted)",

        foreground:  "var(--foreground)",
        "foreground-muted":  "var(--foreground-muted)",
        "foreground-subtle": "var(--foreground-subtle)",

        card:        "var(--card)",
        "card-foreground": "var(--card-foreground)",
        popover:     "var(--popover)",
        "popover-foreground": "var(--popover-foreground)",

        border:      "var(--border)",
        "border-strong": "var(--border-strong)",

        primary: {
          DEFAULT:    "var(--primary)",
          hover:      "var(--primary-hover)",
          active:     "var(--primary-active)",
          subtle:     "var(--primary-subtle)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT:    "var(--secondary)",
          hover:      "var(--secondary-hover)",
          active:     "var(--secondary-active)",
          subtle:     "var(--secondary-subtle)",
          foreground: "var(--secondary-foreground)",
        },

        muted: {
          DEFAULT:    "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT:    "var(--accent)",
          foreground: "var(--accent-foreground)",
        },

        success: { DEFAULT: "var(--success)", subtle: "var(--success-subtle)" },
        warning: { DEFAULT: "var(--warning)", subtle: "var(--warning-subtle)" },
        danger:  { DEFAULT: "var(--danger)",  subtle: "var(--danger-subtle)"  },
        info:    { DEFAULT: "var(--info)",    subtle: "var(--info-subtle)"    },
      },

      /* ── Typography ── */
      fontFamily: {
        sans: ["Estedad", "system-ui", "-apple-system", "sans-serif"],
        mono: ["ui-monospace", "Cascadia Code", "Fira Code", "monospace"],
      },
      fontSize: {
        xs:   ["0.75rem",  { lineHeight: "1rem" }],
        sm:   ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem",     { lineHeight: "1.65rem" }],
        lg:   ["1.125rem", { lineHeight: "1.75rem" }],
        xl:   ["1.25rem",  { lineHeight: "1.75rem" }],
        "2xl":["1.5rem",   { lineHeight: "2rem" }],
        "3xl":["1.875rem", { lineHeight: "2.25rem" }],
        "4xl":["2.25rem",  { lineHeight: "2.5rem" }],
        "5xl":["3rem",     { lineHeight: "1.2" }],
        "6xl":["3.75rem",  { lineHeight: "1.1" }],
        "7xl":["4.5rem",   { lineHeight: "1.05" }],
      },

      /* ── Border radius ── */
      borderRadius: {
        sm:   "var(--radius-sm)",
        md:   "var(--radius-md)",
        lg:   "var(--radius-lg)",
        xl:   "var(--radius-xl)",
        "2xl":"var(--radius-2xl)",
        full: "var(--radius-full)",
      },

      /* ── Box shadows ── */
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        none: "none",
      },

      /* ── Spacing extras ── */
      spacing: {
        "4.5": "1.125rem",
        "13":  "3.25rem",
        "15":  "3.75rem",
        "18":  "4.5rem",
        "22":  "5.5rem",
      },

      /* ── Animations ── */
      animation: {
        "fade-up":        "fade-up 0.55s cubic-bezier(0.22,1,0.36,1) forwards",
        "fade-in":        "fade-in 0.45s ease-out forwards",
        "slide-in-right": "slide-in-right 0.45s cubic-bezier(0.22,1,0.36,1) forwards",
        "slide-in-left":  "slide-in-left  0.45s cubic-bezier(0.22,1,0.36,1) forwards",
        float:            "float 4s ease-in-out infinite",
        "spin-slow":      "spin-slow 8s linear infinite",
        "ping-once":      "ping-once 0.8s ease-out forwards",
        "skeleton":       "skeleton-shimmer 1.6s ease-in-out infinite",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(30px)" },
          to:   { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-left": {
          from: { opacity: "0", transform: "translateX(-30px)" },
          to:   { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-8px)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to:   { transform: "rotate(360deg)" },
        },
        "ping-once": {
          "0%":      { transform: "scale(1)",   opacity: "1" },
          "80%, 100%":{ transform: "scale(1.6)", opacity: "0" },
        },
        "skeleton-shimmer": {
          "0%":   { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },

      /* ── Transitions ── */
      transitionTimingFunction: {
        spring: "cubic-bezier(0.22, 1, 0.36, 1)",
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      transitionDuration: {
        fast: "150ms",
        base: "200ms",
        slow: "300ms",
        slower: "500ms",
      },

      /* ── Container ── */
      container: {
        center: true,
        padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" },
        screens: { sm: "640px", md: "768px", lg: "1024px", xl: "1280px", "2xl": "1440px" },
      },
    },
  },

  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),   // برای صفحات بلاگ/مقاله
  ],
};

export default config;