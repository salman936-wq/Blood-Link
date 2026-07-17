# Theme setup (add to your existing project)

Tomar next.js setup already ache, shudhu eigulo add/merge kore dio — na hole custom
colors, fonts, ar animation classes kaj korbe na.

## 1. `tailwind.config.js` — merge into your existing config

```js
theme: {
  extend: {
    fontFamily: {
      display: ["var(--font-display)", "serif"],
      body: ["var(--font-body)", "sans-serif"],
    },
    colors: {
      primary: { DEFAULT: "#DC2626", light: "#EF4444" },
      secondary: "#EF4444",
    },
    keyframes: {
      pulseline: { "0%": { strokeDashoffset: "1000" }, "100%": { strokeDashoffset: "0" } },
      heartbeat: {
        "0%, 100%": { transform: "scale(1)" },
        "14%": { transform: "scale(1.15)" },
        "28%": { transform: "scale(1)" },
        "42%": { transform: "scale(1.15)" },
        "70%": { transform: "scale(1)" },
      },
      floatSlow: { "0%, 100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-10px)" } },
    },
    animation: {
      pulseline: "pulseline 2.4s linear infinite",
      heartbeat: "heartbeat 1.8s ease-in-out infinite",
      floatSlow: "floatSlow 5s ease-in-out infinite",
    },
  },
},
daisyui: {
  themes: [{
    bloodlink: {
      primary: "#DC2626", secondary: "#EF4444", accent: "#DC2626",
      neutral: "#111827", "base-100": "#FFFFFF",
      info: "#3B82F6", success: "#16A34A", warning: "#D97706", error: "#DC2626",
    },
  }],
},
```

## 2. `app/globals.css` — add these on top of your existing file

```css
@import url("https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500&family=Inter:wght@400;500;600;700;800&display=swap");

:root {
  --font-display: "Fraunces", serif;
  --font-body: "Inter", sans-serif;
}

.glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.container-app { @apply max-w-7xl mx-auto px-6; }
.section { @apply py-24; }

.vital-line path { stroke-dasharray: 1000; }
```

## 3. npm install (kichu notun package lagbe na, but confirm eigulo installed ache)

```bash
npm install lucide-react daisyui
```

`next`, `react`, `react-dom`, `tailwindcss`, `postcss`, `autoprefixer` already thakar kotha, tumi bolecho setup done.

---

**Design signature:** shob page-e ekta recurring "vital-line" (heartbeat pulse) motif
use hoyeche — hero background-e faint, section divider-e animated, notification dot-e
heartbeat pulse. Eta literal to blood/pulse, generic gradient blob na.

**Typography:** Fraunces (display, headings) + Inter (body/UI) — editorial-medical feel,
generic SaaS sans-only look theke alada.
