# Ankit Kumar Portfolio v2.0

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02?style=flat-square&logo=greensock)](https://greensock.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Vercel-Deploy-black?style=flat-square&logo=vercel)](https://ankitxr.vercel.app)
[![Netlify](https://img.shields.io/badge/Netlify-Deploy-00C7B7?style=flat-square&logo=netlify)](https://ankitx.netlify.app)

A premium, cinematic portfolio website built to showcase high-end motion design, fluid color transitions, and a mobile-first responsive architecture.

## Live Access

The portfolio is mirrored across two production environments for maximum availability:
- **Primary**: [ankitxr.vercel.app](https://ankitxr.vercel.app)
- **Secondary**: [ankitx.netlify.app](https://ankitx.netlify.app)

## Key Features

- **Cinematic Background Engine**: Custom dual-layer cross-fade system that smoothly transitions through curated color palettes using a 5-second blend hand-off.
- **Interactive Stacking Layout**: Responsive "Sticky" project cards that stack vertically, providing a high-impact editorial showcase.
- **Precision Motion Control**: Sophisticated word-reveal animations and scroll-triggered physics elements powered by GSAP.
- **Atmospheric "Breathing" System**: Very subtle background scale and hue shifts that create a living environment.
- **Optimized Performance**: Lightweight architecture achieved by pruning unused UI components and streamlining third-party dependencies.

## Built With

- **Framework**: Next.js 14 (App Router)
- **Styling**: Vanilla Tailwind CSS
- **Animation**: GSAP (ScrollTrigger) with Lenis Smooth Scroll
- **Icons**: Lucide React
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ankitxrishav/Portfolio_v2.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

- `src/app`: Page routing and core layout orchestration.
- `src/components`: Modular UI components (Hero, Projects, Journey, etc.).
- `src/components/ui`: Custom animation wrappers and layout utilities.
- `src/data`: Structured content for projects and historical timeline.
- `public`: Static assets and media files.

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

Developed by [Ankit Kumar](https://github.com/ankitxrishav)
