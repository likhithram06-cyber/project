import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        'cinema': ['Orbitron', 'monospace'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
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
        // Virtual Classroom Custom Colors
        golden: {
          50: "hsl(var(--golden-50))",
          100: "hsl(var(--golden-100))",
          200: "hsl(var(--golden-200))",
          300: "hsl(var(--golden-300))",
          400: "hsl(var(--golden-400))",
          500: "hsl(var(--golden-500))",
          600: "hsl(var(--golden-600))",
          700: "hsl(var(--golden-700))",
          800: "hsl(var(--golden-800))",
          900: "hsl(var(--golden-900))",
          DEFAULT: "hsl(var(--golden-glow))",
          soft: "hsl(var(--golden-soft))",
          dark: "hsl(var(--golden-dark))",
        },
        classroom: {
          bg: "hsl(var(--classroom-bg))",
          overlay: "hsl(var(--classroom-overlay))",
          border: "hsl(var(--classroom-border))",
        },
        avatar: {
          frame: "hsl(var(--avatar-frame))",
          glow: "hsl(var(--avatar-glow))",
        },
        speaking: {
          pulse: "hsl(var(--speaking-pulse))",
          indicator: "hsl(var(--speaking-indicator))",
        },
        connection: {
          strong: "hsl(var(--connection-strong))",
          medium: "hsl(var(--connection-medium))",
          weak: "hsl(var(--connection-weak))",
        },
        transcript: {
          ai: "hsl(var(--transcript-ai))",
          user: "hsl(var(--transcript-user))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-cinematic': 'linear-gradient(135deg, hsl(var(--classroom-bg)) 0%, hsl(var(--golden-dark)) 100%)',
        'gradient-golden': 'linear-gradient(45deg, hsl(var(--golden-400)) 0%, hsl(var(--golden-600)) 100%)',
        'gradient-avatar': 'radial-gradient(ellipse at center, hsl(var(--avatar-glow)) 0%, transparent 70%)',
        'noise': "url('data:image/svg+xml,%3Csvg%20width%3D%22100%25%22%20height%3D%22100%25%22%20viewBox%3D%220%200%201000%201000%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%221%22%20/%3E%3C/filter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url%28%23noise%29%22%20opacity%3D%220.03%22%20/%3E%3C/svg%3E')",
      },
      boxShadow: {
        'cinematic': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        'golden-glow': '0 0 20px hsl(var(--golden-glow) / 0.3)',
        'avatar-glow': '0 0 30px hsl(var(--avatar-glow) / 0.4)',
        'speaking-pulse': '0 0 0 6px hsl(var(--speaking-pulse) / 0.3)',
        'classroom': '0 8px 32px 0 rgba(0, 0, 0, 0.36)',
      },
      backdropBlur: {
        'classroom': '16px',
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
        // Video Call Animations
        "golden-pulse": {
          "0%, 100%": {
            opacity: "1",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "0.8",
            transform: "scale(1.05)",
          },
        },
        "speaking-indicator": {
          "0%, 100%": {
            boxShadow: "0 0 0 0 hsl(var(--speaking-pulse) / 0.7)",
          },
          "50%": {
            boxShadow: "0 0 0 8px hsl(var(--speaking-pulse) / 0)",
          },
        },
        "connection-ripple": {
          "0%": {
            transform: "scale(0.8)",
            opacity: "1",
          },
          "100%": {
            transform: "scale(2.4)",
            opacity: "0",
          },
        },
        "slide-in-right": {
          "0%": {
            transform: "translateX(100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        "slide-out-right": {
          "0%": {
            transform: "translateX(0)",
            opacity: "1",
          },
          "100%": {
            transform: "translateX(100%)",
            opacity: "0",
          },
        },
        "zoom-in": {
          "0%": {
            transform: "scale(0.95)",
            opacity: "0",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },
        "avatar-breathing": {
          "0%, 100%": {
            transform: "scale(1) translateY(0px)",
          },
          "50%": {
            transform: "scale(1.02) translateY(-2px)",
          },
        },
        "float": {
          "0%, 100%": { 
            transform: "translateY(0px)" 
          },
          "50%": { 
            transform: "translateY(-20px)" 
          },
        },
        "fade-in": {
          "0%": { 
            opacity: "0", 
            transform: "translateY(20px)" 
          },
          "100%": { 
            opacity: "1", 
            transform: "translateY(0)" 
          },
        },
        "text-shimmer": {
          "0%": {
            backgroundPosition: "-200% center",
          },
          "100%": {
            backgroundPosition: "200% center",
          },
        },
        "border-glow": {
          "0%, 100%": {
            borderColor: "hsl(var(--golden-400) / 0.3)",
            boxShadow: "0 0 10px hsl(var(--golden-400) / 0.2)",
          },
          "50%": {
            borderColor: "hsl(var(--golden-400) / 0.6)",
            boxShadow: "0 0 20px hsl(var(--golden-400) / 0.4)",
          },
        },
        "particle-float": {
          "0%": {
            transform: "translateY(0px) rotate(0deg)",
            opacity: "0",
          },
          "10%": {
            opacity: "1",
          },
          "90%": {
            opacity: "1",
          },
          "100%": {
            transform: "translateY(-100px) rotate(360deg)",
            opacity: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        // Video Call Animations
        "golden-pulse": "golden-pulse 2s ease-in-out infinite",
        "speaking-indicator": "speaking-indicator 1.5s ease-out infinite",
        "connection-ripple": "connection-ripple 1s ease-out infinite",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "slide-out-right": "slide-out-right 0.3s ease-out",
        "zoom-in": "zoom-in 0.2s ease-out",
        "avatar-breathing": "avatar-breathing 4s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "fade-in": "fadeIn 0.5s ease-in-out",
        "text-shimmer": "text-shimmer 3s ease-in-out infinite",
        "border-glow": "border-glow 2s ease-in-out infinite",
        "particle-float": "particle-float 3s ease-in-out infinite",
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      fontSize: {
        'xxs': '0.625rem',
        '3xl': '1.75rem',
        '4xl': '2.5rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
        '7xl': '4.5rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      gradientColorStops: {
        'golden-start': 'hsl(var(--golden-400))',
        'golden-end': 'hsl(var(--golden-600))',
        'classroom-start': 'hsl(var(--classroom-bg))',
        'classroom-end': 'hsl(var(--golden-dark))',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function({ addUtilities }: any) {
      addUtilities({
        '.text-gradient-golden': {
          background: 'linear-gradient(45deg, hsl(var(--golden-400)), hsl(var(--golden-600)))',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.bg-noise': {
          backgroundImage: "url('data:image/svg+xml,%3Csvg%20width%3D%22100%25%22%20height%3D%22100%25%22%20viewBox%3D%220%200%201000%201000%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%221%22%20/%3E%3C/filter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url%28%23noise%29%22%20opacity%3D%220.03%22%20/%3E%3C/svg%3E')",
        },
        '.backdrop-blur-classroom': {
          'backdrop-filter': 'blur(16px)',
        },
        '.border-golden-glow': {
          'border-image': 'linear-gradient(45deg, hsl(var(--golden-400)), hsl(var(--golden-600))) 1',
        },
      })
    }
  ],
} satisfies Config;