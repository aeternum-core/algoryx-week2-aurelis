# AURELIS — Digital Experience Studio
> **Algoryx UI/UX Internship — Week 02: Scroll-Based Animated Landing Page**  
> Directed & Engineered by **Likith V Gowda** (Bangalore, India HQ)

---

## 🌌 Overview
**AURELIS** is a modern, production-grade scroll-based animated creative landing page designed and developed for the Algoryx UI/UX Internship. It demonstrates high-fidelity tactile interaction, multi-layer depth physics, and seamless responsiveness across all screen sizes (from 320px mobile devices up to 4K displays).

---

## ✨ Key Features & Architectural Highlights

1. **Dual Cinematic Themes (Dark & Light Mode)**
   - **Dark Mode**: Deep obsidian canvas (`#08080a`) with glowing atmospheric liquid crystal meshes, luminous glass cards, and violet/cyan refractions.
   - **Light Mode**: Multi-dimensional silk canvas with 5-tier dynamic radial gradient orbs (Indigo, Cyan, Neon Rose, Fuchsia, and Amber Solar Warmth) with zero flat/empty white zones.

2. **Persistent Atmospheric Background Engine**
   - **5-Layer Dynamic Liquid Crystal Mesh** (`LiquidCrystal.tsx`): Real-time generative canvas creating smooth, fluid ambient orbs that seamlessly transition across the entire page during scroll.
   - **Interactive Particle Constellation** (`ParticleField.tsx`): 60 FPS canvas with soft mouse repulsion physics, responsive density scaling, and connecting constellation vectors.

3. **Prismatic 3D Sculpture** (`DigitalSculpture.tsx`)
   - Real-time mathematical 3D icosahedron rendering with depth-sorted triangular facet refractions, specular sparkle glints, rotational physics, and responsive camera projection.

4. **Multi-Plane Spatial Parallax Depth** (`ParallaxShowcase.tsx`)
   - Scroll-linked camera matrices transforming 2D card layouts into multi-layer spatial depth with spring-damped parallax interpolation.

5. **Curated Sections & Interactive Modules**
   - **Hero**: Kinetic typography (`SplitText`), live telemetry status bar, spatial badges, and magnetic CTA buttons.
   - **About**: Architectural philosophy with glassmorphic craft pillar cards and hover transformations.
   - **Services**: Interactive discipline cards with expandable deliverables accordion drawers.
   - **Telemetry & Stats**: Viewport-triggered animated numeric counters for verified studio benchmarks.
   - **Selected Work**: Interactive live simulations (data telemetry graphs, rotating brand emblems, speed archives) with deep-dive modal preview.
   - **Process Timeline**: Structured vertical milestone system with phase deliverables.
   - **Testimonials**: Quiet editorial carousel with verified review metrics.
   - **Pricing**: Flexible billing mode switcher (Fixed Project vs. Sprint Retainer) with feature checklists.
   - **Validated Contact Form**: Client-side schema checking with real-time feedback and state management.
   - **Studio Footer**: Live Bangalore IST studio clock and navigation map.

---

## 🛠️ Technology Stack
- **Framework**: React 19 + TypeScript
- **Bundler & Dev Server**: Vite
- **Styling**: TailwindCSS v4 + Vanilla CSS Design System
- **Animation & Physics**: Framer Motion (Kinetic Typography, Scroll Velocity, Springs, Magnetic Interactions)
- **Icons**: Lucide React
- **Typography**: Syne, Plus Jakarta Sans, JetBrains Mono

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or later)
- npm / yarn / pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/aeternum-core/algoryx-week2-aurelis.git

# Navigate into the project folder
cd algoryx-week2-aurelis/aurelis

# Install dependencies
npm install

# Start local development server
npm run dev
```

### Production Build
```bash
# Build and typecheck production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 👨‍💻 Author & Credits
- **Developer**: Likith V Gowda
- **Role**: Principal Creative Technologist / Intern
- **Program**: Algoryx UI/UX Internship (Week 02)
- **Location**: Bangalore, Karnataka, India
