import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        rose: {
          400: "#e11d48",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme.colors.gray[200],
            a: {
              color: theme.colors.rose[400],
              "&:hover": {
                color: theme.colors.rose[300],
              },
            },
            h1: {
              color: theme.colors.white,
              fontWeight: "700",

              paddingBottom: "0.25rem",
              marginTop: "1.5rem",
              marginBottom: "1rem",
            },
            h2: {
              color: theme.colors.white,
              fontWeight: "700",

              paddingBottom: "0.25rem",
              marginTop: "1.5rem",
              marginBottom: "1rem",
            },
            h3: {
              color: theme.colors.white,
              fontWeight: "600",
              marginTop: "1.5rem",
              marginBottom: "0.75rem",
            },
            h4: {
              color: theme.colors.white,
              fontWeight: "600",
              marginTop: "1.25rem",
              marginBottom: "0.75rem",
            },
            p: {
              color: theme.colors.gray[300],
              marginTop: "1rem",
              marginBottom: "1rem",
            },
            code: {
              color: theme.colors.rose[400],
              backgroundColor: theme.colors.gray[900],
              padding: "0.25rem 0.4rem",
              borderRadius: "0.25rem",
              fontWeight: "400",
              fontFamily: "monospace",
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
            pre: {
              backgroundColor: theme.colors.gray[900],
              color: theme.colors.gray[300],
              borderWidth: "1px",
              borderColor: theme.colors.gray[700],
              borderRadius: "0.375rem",
              padding: "0.75rem 1rem",
              marginTop: "1rem",
              marginBottom: "1rem",
              overflowX: "auto",
            },
            "pre code": {
              backgroundColor: "transparent",
              padding: "0",
              color: "inherit",
            },
            blockquote: {
              color: theme.colors.gray[400],
              borderLeftWidth: "4px",
              borderLeftColor: theme.colors.rose[400],
              fontStyle: "italic",
              paddingLeft: "1rem",
              backgroundColor: theme.colors.gray[800],
              opacity: "0.8",
              borderRadius: "0 0.25rem 0.25rem 0",
            },
            ul: {
              listStyleType: "disc",
              paddingLeft: "1.5rem",
              marginTop: "1rem",
              marginBottom: "1rem",
            },
            ol: {
              listStyleType: "decimal",
              paddingLeft: "1.5rem",
              marginTop: "1rem",
              marginBottom: "1rem",
            },
            li: {
              marginTop: "0.25rem",
              marginBottom: "0.25rem",
            },
            "li > ul, li > ol": {
              marginTop: "0.25rem",
              marginBottom: "0.25rem",
            },
            strong: {
              color: theme.colors.white,
              fontWeight: "600",
            },
            hr: {
              borderColor: theme.colors.gray[700],
              marginTop: "2rem",
              marginBottom: "2rem",
            },
            table: {
              width: "100%",
              tableLayout: "auto",
              textAlign: "left",
              marginTop: "1.25rem",
              marginBottom: "1.25rem",
              borderCollapse: "collapse",
            },
            thead: {
              borderBottomWidth: "1px",
              borderBottomColor: theme.colors.gray[700],
            },
            "thead th": {
              color: theme.colors.white,
              fontWeight: "600",
              padding: "0.5rem 0.75rem",
              backgroundColor: theme.colors.gray[800],
            },
            "tbody tr": {
              borderBottomWidth: "1px",
              borderBottomColor: theme.colors.gray[800],
            },
            "tbody td": {
              padding: "0.5rem 0.75rem",
            },
          },
        },
        invert: {
          css: {
            "--tw-prose-body": theme.colors.gray[200],
            "--tw-prose-headings": theme.colors.white,
            "--tw-prose-lead": theme.colors.gray[300],
            "--tw-prose-links": theme.colors.rose[400],
            "--tw-prose-bold": theme.colors.white,
            "--tw-prose-counters": theme.colors.gray[400],
            "--tw-prose-bullets": theme.colors.gray[400],
            "--tw-prose-hr": theme.colors.gray[700],
            "--tw-prose-quotes": theme.colors.gray[400],
            "--tw-prose-quote-borders": theme.colors.rose[400],
            "--tw-prose-captions": theme.colors.gray[400],
            "--tw-prose-code": theme.colors.rose[400],
            "--tw-prose-pre-code": theme.colors.gray[300],
            "--tw-prose-pre-bg": theme.colors.gray[900],
            "--tw-prose-th-borders": theme.colors.gray[700],
            "--tw-prose-td-borders": theme.colors.gray[800],
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
