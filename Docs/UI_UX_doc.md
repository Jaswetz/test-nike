# Nike Interactive Website - UI/UX Guidelines

## Brand Foundation

### Visual Identity

- **Primary Brand**: Nike Swoosh - iconic, bold, recognizable
- **Brand Promise**: "Just Do It" - empowerment, action, achievement
- **Brand Personality**: Bold, innovative, athletic, inspirational, premium
- **Target Audience**: Athletes, sneaker enthusiasts, fitness-conscious consumers

## Brand Guidelines Integration

- **Typography**: Nike Futura and Helvetica Neue
- **Color Palette**: Black, white, with accent colors (red, neon)
- **Visual Language**: Bold, minimalist, athletic-inspired
- **Iconography**: Nike Swoosh and sport-specific icons
- **Photography**: High-impact athlete imagery

### Typography Hierarchy

```css
/* Primary Typography */
--font-primary: "Nike Futura", "Helvetica Neue", sans-serif;
--font-secondary: "Helvetica Neue", Arial, sans-serif;
--font-mono: "SF Mono", "Monaco", monospace;

/* Font Weights */
--font-light: 300;
--font-regular: 400;
--font-medium: 500;
--font-bold: 700;
--font-black: 900;

/* Font Sizes */
--text-xs: 0.75rem; /* 12px */
--text-sm: 0.875rem; /* 14px */
--text-base: 1rem; /* 16px */
--text-lg: 1.125rem; /* 18px */
--text-xl: 1.25rem; /* 20px */
--text-2xl: 1.5rem; /* 24px */
--text-3xl: 1.875rem; /* 30px */
--text-4xl: 2.25rem; /* 36px */
--text-5xl: 3rem; /* 48px */
--text-6xl: 4rem; /* 64px */
--text-7xl: 5rem; /* 80px */
--text-8xl: 6rem; /* 96px */
```

### Color System

```css
/* Primary Colors */
--nike-black: #000000;
--nike-white: #ffffff;
--nike-grey-dark: #111111;
--nike-grey-medium: #707072;
--nike-grey-light: #f5f5f5;

/* Accent Colors */
--nike-red: #ff0000;
--nike-orange: #ff6900;
--nike-green: #00c851;
--nike-blue: #0066cc;
--nike-purple: #9c27b0;
--nike-yellow: #ffea00;

/* Functional Colors */
--success: #00c851;
--warning: #ff6900;
--error: #ff0000;
--info: #0066cc;
```

### Spacing System

```css
/* Spacing Scale */
--space-1: 0.25rem; /* 4px */
--space-2: 0.5rem; /* 8px */
--space-3: 0.75rem; /* 12px */
--space-4: 1rem; /* 16px */
--space-5: 1.25rem; /* 20px */
--space-6: 1.5rem; /* 24px */
--space-8: 2rem; /* 32px */
--space-10: 2.5rem; /* 40px */
--space-12: 3rem; /* 48px */
--space-16: 4rem; /* 64px */
--space-20: 5rem; /* 80px */
--space-24: 6rem; /* 96px */
--space-32: 8rem; /* 128px */
```

## Component Guidelines

### Navigation

- **Header**: Sticky navigation with transparent background on scroll
- **Menu**: Minimal, focused on core categories (Men, Women, Kids, Sale)

### Product Cards

- **Layout**: 4:5 aspect ratio for product images
- **Hover Effects**: Smooth scale and shadow transitions
- **Quick Actions**: Add to cart, wishlist, quick view
- **Information**: Product name, price, color options, ratings
- **Loading States**: Skeleton screens with shimmer effects

### Buttons & Controls

```css
/* Primary Button */
.btn-primary {
  background: var(--nike-black);
  color: var(--nike-white);
  padding: 16px 32px;
  border-radius: 24px;
  font-weight: 500;
  transition: all 0.3s ease;
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: var(--nike-black);
  border: 2px solid var(--nike-black);
  padding: 14px 30px;
  border-radius: 24px;
}

/* Icon Button */
.btn-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### Interactive Elements

- **Hover States**: Smooth transitions (300ms ease)
- **Active States**: Subtle scale transformations
- **Focus States**: Clear accessibility indicators
- **Disabled States**: Reduced opacity and interaction feedback

## Animation Guidelines

### Scroll-Driven Animations

- **Parallax Speed**: 0.5x to 2x scroll speed variations
- **Fade In**: Opacity 0 to 1 with 100px Y translation
- **Scale Effects**: 0.95 to 1.05 scale on scroll trigger
- **Stagger**: 100ms delays between elements
- **Easing**: Custom Nike easing curve (cubic-bezier(0.25, 0.46, 0.45, 0.94))

### 3D Interactions

- **Rotation**: Smooth 360-degree product rotation
- **Zoom**: 2x to 8x magnification with quality retention
- **Transitions**: Seamless camera movements between views
- **Loading**: Progressive model loading with placeholders

### Microinteractions

- **Button Feedback**: Scale (0.95) on press, bounce back
- **Card Hovers**: Lift effect with shadow enhancement
- **Loading States**: Skeleton screens with shimmer animation
- **Success States**: Checkmark animations with scale and opacity

## Layout System

### Grid Structure

- **Desktop**: 12-column grid with 24px gutters
- **Tablet**: 8-column grid with 20px gutters
- **Mobile**: 4-column grid with 16px gutters
- **Max Width**: 1440px container with centered alignment

### Responsive Breakpoints

```css
/* Breakpoints */
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;
```

### Component Spacing

- **Section Padding**: 120px desktop, 80px tablet, 60px mobile
- **Element Margin**: 32px between major components
- **Text Spacing**: 1.5x line height for readability

## Performance Guidelines

### Loading Strategy

- **Critical CSS**: Inline above-the-fold styles
- **Code Splitting**: Route-based and component-based splitting
- **Preloading**: Critical resources and next-likely pages
- **Service Worker**: Offline functionality and caching

## Editorial Content

- **Tone**: Inspirational, motivational, inclusive
- **Voice**: Confident, energetic, athlete-focused
- **Messaging**: Aligned with "Just Do It" philosophy
- **Imagery**: High-quality, diverse, action-oriented

## Innovation Standards

### Cutting-Edge Features

- **WebGL/WebGPU**: High-performance 3D rendering
- **Web Audio**: Immersive sound design
