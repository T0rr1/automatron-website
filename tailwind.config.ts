import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
  	screens: {
  		xs: '475px',
  		sm: '640px',
  		md: '768px',
  		lg: '1024px',
  		xl: '1280px',
  		'2xl': '1536px'
  	},
  	container: {
  		center: true,
  		padding: {
  			DEFAULT: '1rem',
  			sm: '2rem',
  			lg: '4rem',
  			xl: '5rem',
  			'2xl': '6rem'
  		},
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			// Semantic design tokens
  			bg: "var(--bg)",
  			surface: "var(--surface)",
  			text: "var(--text)",
  			muted: {
  				DEFAULT: "var(--muted)",
  				foreground: "var(--muted)"
  			},
  			border: "var(--border)",
  			accent: "var(--accent)",
  			"accent-foreground": "var(--accent-foreground)",
  			
  			// Status colors
  			success: { 
  				DEFAULT: "var(--success)", 
  				foreground: "var(--success-fg)" 
  			},
  			warning: { 
  				DEFAULT: "var(--warning)", 
  				foreground: "var(--warning-fg)" 
  			},
  			error: { 
  				DEFAULT: "var(--error)", 
  				foreground: "var(--error-fg)" 
  			},
  			
  			// Legacy compatibility
  			background: "var(--bg)",
  			foreground: "var(--text)",
  			primary: {
  				DEFAULT: "var(--accent)",
  				foreground: "var(--accent-foreground)"
  			},
  			secondary: {
  				DEFAULT: "var(--surface)",
  				foreground: "var(--text)"
  			},
  			card: {
  				DEFAULT: "var(--surface)",
  				foreground: "var(--text)"
  			},
  			brand: {
  				'50': 'hsl(var(--brand-50))',
  				'100': 'hsl(var(--brand-100))',
  				'200': 'hsl(var(--brand-200))',
  				'300': 'hsl(var(--brand-300))',
  				'400': 'hsl(var(--brand-400))',
  				'500': 'hsl(var(--brand-500))',
  				'600': 'hsl(var(--brand-600))',
  				'700': 'hsl(var(--brand-700))',
  				'800': 'hsl(var(--brand-800))',
  				'900': 'hsl(var(--brand-900))'
  			},
  			automation: {
  				'50': 'hsl(var(--automation-50))',
  				'100': 'hsl(var(--automation-100))',
  				'200': 'hsl(var(--automation-200))',
  				'300': 'hsl(var(--automation-300))',
  				'400': 'hsl(var(--automation-400))',
  				'500': 'hsl(var(--automation-500))',
  				'600': 'hsl(var(--automation-600))',
  				'700': 'hsl(var(--automation-700))',
  				'800': 'hsl(var(--automation-800))',
  				'900': 'hsl(var(--automation-900))'
  			},
  			glass: {
  				light: 'rgba(255, 255, 255, 0.1)',
  				dark: 'rgba(0, 0, 0, 0.1)'
  			}
  		},
  		fontSize: {
  			xs: [
  				'0.75rem',
  				{
  					lineHeight: '1rem'
  				}
  			],
  			sm: [
  				'0.875rem',
  				{
  					lineHeight: '1.25rem'
  				}
  			],
  			base: [
  				'1rem',
  				{
  					lineHeight: '1.5rem'
  				}
  			],
  			lg: [
  				'1.125rem',
  				{
  					lineHeight: '1.75rem'
  				}
  			],
  			xl: [
  				'1.25rem',
  				{
  					lineHeight: '1.75rem'
  				}
  			],
  			'2xl': [
  				'1.5rem',
  				{
  					lineHeight: '2rem'
  				}
  			],
  			'3xl': [
  				'1.875rem',
  				{
  					lineHeight: '2.25rem'
  				}
  			],
  			'4xl': [
  				'2.25rem',
  				{
  					lineHeight: '2.5rem'
  				}
  			],
  			'5xl': [
  				'3rem',
  				{
  					lineHeight: '1'
  				}
  			],
  			'6xl': [
  				'3.75rem',
  				{
  					lineHeight: '1'
  				}
  			],
  			'7xl': [
  				'4.5rem',
  				{
  					lineHeight: '1'
  				}
  			],
  			'8xl': [
  				'6rem',
  				{
  					lineHeight: '1'
  				}
  			],
  			'9xl': [
  				'8rem',
  				{
  					lineHeight: '1'
  				}
  			],
  			'display-sm': [
  				'2.25rem',
  				{
  					lineHeight: '2.5rem',
  					fontWeight: '600'
  				}
  			],
  			'display-md': [
  				'2.875rem',
  				{
  					lineHeight: '3.25rem',
  					fontWeight: '600'
  				}
  			],
  			'display-lg': [
  				'3.75rem',
  				{
  					lineHeight: '4.25rem',
  					fontWeight: '600'
  				}
  			],
  			'display-xl': [
  				'4.5rem',
  				{
  					lineHeight: '5rem',
  					fontWeight: '600'
  				}
  			]
  		},
  		fontFamily: {
  			sans: [
  				'var(--font-inter)',
  				'system-ui',
  				'-apple-system',
  				'BlinkMacSystemFont',
  				'Segoe UI',
  				'Roboto',
  				'sans-serif'
  			],
  			mono: [
  				'var(--font-mono)',
  				'Consolas',
  				'Monaco',
  				'Courier New',
  				'monospace'
  			],
  			display: [
  				'var(--font-inter)',
  				'system-ui',
  				'sans-serif'
  			]
  		},
  		spacing: {
  			'18': '4.5rem',
  			'88': '22rem',
  			'128': '32rem',
  			'144': '36rem'
  		},
  		borderRadius: {
  			DEFAULT: "8px",
  			lg: "8px",
  			xl: "12px",
  			"2xl": "16px",
  			full: "9999px"
  		},
  		boxShadow: {
  			card: "0 1px 2px rgb(0 0 0 / .05), 0 8px 24px rgb(0 0 0 / .06)",
  			glow: "0 0 0 1px hsl(156 72% 45% / .35), 0 8px 30px hsl(156 72% 45% / .25)",
  			focus: "0 0 0 4px var(--ring)",
  			none: "none"
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			'fade-in': {
  				from: {
  					opacity: '0',
  					transform: 'translateY(10px)'
  				},
  				to: {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			'fade-in-up': {
  				from: {
  					opacity: '0',
  					transform: 'translateY(20px)'
  				},
  				to: {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			'slide-in': {
  				from: {
  					transform: 'translateX(-100%)'
  				},
  				to: {
  					transform: 'translateX(0)'
  				}
  			},
  			'slide-in-right': {
  				from: {
  					transform: 'translateX(100%)'
  				},
  				to: {
  					transform: 'translateX(0)'
  				}
  			},
  			'scale-in': {
  				from: {
  					opacity: '0',
  					transform: 'scale(0.9)'
  				},
  				to: {
  					opacity: '1',
  					transform: 'scale(1)'
  				}
  			},
  			'bounce-subtle': {
  				'0%, 100%': {
  					transform: 'translateY(0)'
  				},
  				'50%': {
  					transform: 'translateY(-5px)'
  				}
  			},
  			'pulse-soft': {
  				'0%, 100%': {
  					opacity: '1'
  				},
  				'50%': {
  					opacity: '0.8'
  				}
  			},
  			'shimmer': {
  				'0%': {
  					transform: 'translateX(-100%)'
  				},
  				'100%': {
  					transform: 'translateX(100%)'
  				}
  			},
  			'float-slow': {
  				'0%, 100%': {
  					transform: 'translateY(0px) rotate(0deg)'
  				},
  				'50%': {
  					transform: 'translateY(-10px) rotate(3deg)'
  				}
  			},
  			'float-medium': {
  				'0%, 100%': {
  					transform: 'translateY(0px) rotate(0deg)'
  				},
  				'50%': {
  					transform: 'translateY(-8px) rotate(-2deg)'
  				}
  			},
  			'float-fast': {
  				'0%, 100%': {
  					transform: 'translateY(0px) rotate(0deg)'
  				},
  				'50%': {
  					transform: 'translateY(-6px) rotate(1deg)'
  				}
  			},
  			'float-gentle': {
  				'0%, 100%': {
  					transform: 'translateY(0px) rotate(0deg)'
  				},
  				'50%': {
  					transform: 'translateY(-12px) rotate(2deg)'
  				}
  			},
  			fadeUp: {
  				'0%': { opacity: '0', transform: 'translateY(12px)' },
  				'100%': { opacity: '1', transform: 'translateY(0)' },
  			},
  			pop: { '0%': { transform: 'scale(.98)' }, '100%': { transform: 'scale(1)' } },
		shine: { '0%': { transform: 'translateX(-200%)' }, '100%': { transform: 'translateX(200%)' } },
  			aurora: {
  				'0%': { transform: 'translateY(0) rotate(0deg)' },
  				'100%': { transform: 'translateY(-4%) rotate(360deg)' },
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'fade-in': 'fade-in 0.5s ease-out',
  			'fade-in-up': 'fade-in-up 0.6s ease-out',
  			'slide-in': 'slide-in 0.3s ease-out',
  			'slide-in-right': 'slide-in-right 0.3s ease-out',
  			'scale-in': 'scale-in 0.2s ease-out',
  			'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
  			'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
  			'shimmer': 'shimmer 2s ease-in-out infinite',
  			'float-slow': 'float-slow 4s ease-in-out infinite',
  			'float-medium': 'float-medium 3s ease-in-out infinite',
  			'float-fast': 'float-fast 2.5s ease-in-out infinite',
			'float-gentle': 'float-gentle 5s ease-in-out infinite',
			fadeUp: 'fadeUp .55s ease-out forwards',
			pop: 'pop .12s ease-out',
			shimmer: 'shimmer 2s linear infinite',
			float: 'float 6s ease-in-out infinite',
			aurora: 'aurora 18s linear infinite'
  		},
  		transitionTimingFunction: {
  			'ease-out-back': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  			'ease-in-back': 'cubic-bezier(0.36, 0, 0.66, -0.56)',
  			'ease-in-out-back': 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
  		},
  		backdropBlur: {
  			xs: '2px'
  		},
  		zIndex: {
  			'60': '60',
  			'70': '70',
  			'80': '80',
  			'90': '90',
  			'100': '100'
  		}
  	}
  },
  plugins: [
    // @ts-ignore
    require("tailwindcss-animate"),
    require("@tailwindcss/line-clamp"),
  ],
} satisfies Config

export default config