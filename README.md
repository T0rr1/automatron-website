# Automatron.ai Website

A modern, fully responsive website for Automatron.ai - an AI automation studio specializing in beginner-to-intermediate automation services for solo business owners and small teams.

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui (built on Radix UI)
- **Theme**: next-themes for dark/light mode
- **Forms**: React Hook Form with Zod validation
- **Code Quality**: ESLint, Prettier, TypeScript strict mode

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd automatron-website
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Copy environment variables:
```bash
cp .env.example .env.local
```

4. Update environment variables in `.env.local` with your actual values.

5. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js 14 App Router
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles and CSS variables
├── components/
│   ├── ui/                # shadcn/ui components
│   └── theme-provider.tsx # Theme provider component
├── lib/
│   └── utils.ts           # Utility functions
└── types/
    └── index.ts           # TypeScript type definitions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Features

- ✅ Next.js 14 with App Router
- ✅ TypeScript with strict mode
- ✅ Tailwind CSS with custom design system
- ✅ Dark/Light theme support
- ✅ shadcn/ui components
- ✅ ESLint and Prettier configuration
- ✅ Environment variables setup
- ✅ Responsive design system
- ✅ Accessibility-focused development

## Design System

The project includes a custom design system with:

- **Brand Colors**: Custom blue palette for primary branding
- **Automation Colors**: Green palette for automation-related elements
- **Typography**: Inter font with proper font loading
- **Animations**: Custom keyframes for smooth interactions
- **Responsive Breakpoints**: Mobile-first approach

## Development Guidelines

1. **TypeScript**: Use strict mode and proper type definitions
2. **Components**: Follow shadcn/ui patterns for consistency
3. **Styling**: Use Tailwind CSS classes with the custom design system
4. **Accessibility**: Ensure WCAG AA compliance
5. **Performance**: Optimize images, fonts, and bundle size

## Environment Variables

See `.env.example` for required environment variables:

- `NEXT_PUBLIC_APP_URL` - Application URL
- `RESEND_API_KEY` - Email service API key
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` - Analytics domain
- `SENTRY_DSN` - Error monitoring DSN

## License

Private - All rights reserved