# 🚀 Advanced AI Automation Agency Website

A futuristic, fully responsive AI agency website featuring 3D animations, real-time interactions, and advanced automation features.

## 🎨 Features

### Visual Design
- **Glassmorphism UI** - Modern frosted glass panels with blur effects
- **Cyberpunk Theme** - Dark theme with neon cyan, purple, and pink accents
- **3D Interactive Orb** - JARVIS-inspired AI visualization using Three.js
- **Particle System** - Mouse-reactive animated particles with network connections
- **Cursor Trail** - Glowing trail effect following the cursor

### Interactive Sections
- **Hero Section** - Eye-catching introduction with 3D orb
- **Services Section** - Four core AI automation services
- **Features Section** - Six advanced technology features
- **AI Assistant Demo** - Live chatbot simulation with typing effects
- **Analytics Dashboard** - Real-time metrics with animated counters
- **Pricing Section** - Three pricing tiers with toggle
- **Testimonials** - Client success stories carousel
- **Contact Form** - Interactive contact section with validation

### Animations & Effects
- Smooth scroll-based animations
- Hover effects and transitions
- Loading screen with boot sequence
- Typing effect simulation
- Animated counters
- 3D camera movements

## 🛠 Tech Stack

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Advanced animations
- **GSAP** - Animation library

### 3D & Graphics
- **Three.js** - 3D graphics
- **React Three Fiber** - React Three.js renderer
- **@react-three/drei** - Useful helpers for Three.js

### Utilities
- **Zustand** - State management
- **React Intersection Observer** - Scroll triggers
- **Axios** - HTTP client

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd "agency website"

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── Navigation.tsx       # Top navigation
│   ├── 3d/
│   │   └── AIOrb.tsx       # 3D orb component
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── AIAssistantSection.tsx
│   │   ├── DashboardSection.tsx
│   │   ├── PricingSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── ContactSection.tsx
│   └── effects/
│       ├── ParticleBackground.tsx
│       ├── CursorTrail.tsx
│       ├── LoadingScreen.tsx
│       ├── TypingEffect.tsx
│       └── AnimatedCounter.tsx
├── package.json
├── tailwind.config.js
├── next.config.js
└── tsconfig.json
```

## 🎯 Customization

### Colors
Edit `tailwind.config.js` to customize colors:
```js
colors: {
  'cyber-black': '#0a0e27',
  'cyber-blue': '#00d4ff',
  'cyber-purple': '#a78bfa',
  'cyber-pink': '#ec4899',
}
```

### Animations
Modify animation speeds in component files or `globals.css`

### Content
Update text and data directly in each component file

## 📦 Build & Deploy

### Build for Production
```bash
npm run build
npm start
```

### Export Static HTML
```bash
npm run export
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 🔧 Performance Optimization

- Image optimization with Next.js
- Code splitting with dynamic imports
- GPU-accelerated animations
- Responsive particle count
- Lazy loading for sections

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

## 📝 License

MIT License - feel free to use this project for commercial purposes

## 🤝 Contributing

Feel free to fork and submit pull requests

## 📞 Support

For issues and questions, please open an issue in the repository

---

**Made with ❤️ using Next.js, React, and Three.js**
