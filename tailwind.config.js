/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		fontFamily: {
  			display: ['var(--font-display)'],
  			heading: ['var(--font-heading)'],
  			body: ['var(--font-body)'],
  		},
  		borderRadius: {
  			lg: '8px',
  			md: '4px',
  			sm: '2px',
  			pill: '999px',
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--primary))',
  				'2': 'hsl(var(--accent))',
  				'3': 'hsl(var(--muted-foreground))',
  				'4': 'hsl(var(--secondary-foreground))',
  				'5': 'hsl(var(--destructive))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			},
  			/* RTM explicit colour palette for direct use */
  			rtm: {
  				cobalt: '#1B4FA0',
  				'cobalt-deep': '#0F3470',
  				'cobalt-light': '#4A78C2',
  				yellow: '#F4C430',
  				'yellow-deep': '#D9A91A',
  				'yellow-light': '#FBE38A',
  				cream: '#F2EBDE',
  				'cream-warm': '#EAE0CC',
  				'cream-soft': '#F8F3E8',
  				ink: '#1A1814',
  				'ink-soft': '#3D3933',
  				stone: '#8A8378',
  				'stone-light': '#C9C2B5',
  				white: '#FFFCF5',
  				success: '#2D7A3E',
  				warning: '#C97A1C',
  				danger: '#B83A26',
  			}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: { height: '0' },
  				to: { height: 'var(--radix-accordion-content-height)' }
  			},
  			'accordion-up': {
  				from: { height: 'var(--radix-accordion-content-height)' },
  				to: { height: '0' }
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
