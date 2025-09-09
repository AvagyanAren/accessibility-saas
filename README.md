# 🔍 ScanWeb - Accessibility Testing Platform

A comprehensive, modern accessibility testing platform built with Next.js and Apple-inspired design. ScanWeb helps developers, designers, and organizations ensure their websites meet WCAG accessibility standards through automated testing, detailed reporting, and educational resources.

![ScanWeb Preview](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-15.0.3-black)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

### 🎯 Core Functionality
- **Automated Website Scanning** - Comprehensive accessibility testing using axe-core
- **Real-time Results** - Instant feedback with detailed violation reports
- **Accessibility Scoring** - Visual progress indicators and scoring system
- **Export Reports** - PDF and CSV export functionality
- **Email Reports** - Lead generation through automated report sharing

### 🛠️ Mini-Tools Suite
- **Color Contrast Checker** - WCAG-compliant color contrast validation
- **Alt Text Analyzer** - Image accessibility assessment
- **Keyboard Navigator** - Keyboard navigation testing
- **Performance Audit** - Accessibility performance metrics
- **Screen Reader Simulator** - Screen reader compatibility testing

### 🎨 Design & UX
- **Apple-Inspired Design** - Clean, minimal, and engaging UI
- **Dark/Light Mode** - System preference detection with manual toggle
- **Responsive Design** - Mobile-first, fully responsive layout
- **Accessibility First** - Built with accessibility in mind

### 📚 Educational Resources
- **Comprehensive Guides** - Step-by-step accessibility tutorials
- **Best Practices** - Industry-standard accessibility guidelines
- **API Documentation** - Developer-friendly API integration
- **Interactive Examples** - Hands-on learning tools

## 🚀 Quick Start

### Prerequisites
- Node.js 18.0 or later (recommended for Next.js 15)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AvagyanAren/accessibility-saas.git
   cd accessibility-saas
   ```

2. **Install dependencies and setup Playwright**
   ```bash
   # Option 1: Use the setup script (recommended)
   npm run setup
   
   # Option 2: Manual installation
   npm install
   npx playwright install chromium
   ```

3. **Verify setup (optional but recommended)**
   ```bash
   npm run verify
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### ⚠️ Important Setup Notes

**For the scanning functionality to work properly, you MUST install Playwright browsers:**

```bash
# If you only ran 'npm install', run this:
npx playwright install chromium

# Or use the setup script:
npm run setup
```

**Common Issues:**
- **"Failed to scan" error**: Run `npm run setup` to install required browsers
- **Timeout errors**: Some websites may take longer to load
- **Network errors**: Check if the URL is accessible and properly formatted

## 🏗️ Project Structure

```
accessibility-saas/
├── components/           # Reusable UI components
│   ├── apple/           # Apple-inspired design system
│   │   ├── Button.js    # Custom button component
│   │   ├── Card.js      # Card layout component
│   │   ├── Input.js     # Form input component
│   │   ├── Layout.js    # Layout utilities
│   │   ├── ThemeToggle.js # Dark/light mode toggle
│   │   └── Typography.js # Typography system
│   ├── common/          # Shared components
│   │   ├── BestPractices.js
│   │   ├── IssueList.js
│   │   ├── NotificationSnackbar.js
│   │   ├── ScoreCard.js
│   │   ├── ToolCTA.js
│   │   ├── ToolHeader.js
│   │   └── ToolInput.js
│   ├── Navbar.js        # Legacy navbar
│   └── NavbarApple.js   # Apple-styled navbar
├── contexts/            # React contexts
│   └── ThemeContext.js  # Theme management
├── hooks/               # Custom React hooks
│   └── useToolAnalysis.js
├── pages/               # Next.js pages
│   ├── api/            # API routes
│   │   ├── scan.js     # Website scanning endpoint
│   │   └── send-report.js # Email report endpoint
│   ├── articles/       # Educational articles
│   ├── tools/          # Mini-tools pages
│   ├── _app.js         # App configuration
│   ├── index.js        # Homepage
│   ├── about.js        # About page
│   ├── pricing.js      # Pricing page
│   ├── resources.js    # Resources page
│   ├── api-docs.js     # API documentation
│   └── tools.js        # Tools overview
├── styles/              # Styling files
│   ├── apple-globals.css # Global styles
│   └── apple-theme.js   # Theme configuration
├── utils/               # Utility functions
│   └── accessibilityUtils.js
└── package.json         # Dependencies and scripts
```

## 🛠️ Technology Stack

### Frontend
- **Next.js 15.0.3** - React framework with SSR/SSG
- **React 18.3.1** - UI library
- **Custom Design System** - Apple-inspired components
- **CSS-in-JS** - Emotion for styling
- **Context API** - State management

### Backend
- **Next.js API Routes** - Serverless functions
- **Playwright** - Browser automation
- **axe-core** - Accessibility testing engine
- **Node.js** - Runtime environment
- **Vercel Speed Insights** - Performance monitoring

### Testing & Quality
- **axe-core/playwright** - Automated accessibility testing
- **WCAG 2.1 AA** - Compliance standards
- **ESLint** - Code quality
- **Responsive Design** - Mobile-first approach

## 📖 API Documentation

### Scan Website
```bash
GET /api/scan?url=https://example.com
```

**Response:**
```json
{
  "violations": [
    {
      "id": "color-contrast",
      "impact": "serious",
      "description": "Elements must have sufficient color contrast",
      "nodes": [...],
      "help": "Ensure all text elements have sufficient color contrast"
    }
  ],
  "passes": [...],
  "incomplete": [...],
  "inapplicable": [...]
}
```

### Send Email Report
```bash
POST /api/send-report
Content-Type: application/json

{
  "email": "user@example.com",
  "url": "https://example.com",
  "score": 85,
  "violations": [...]
}
```

## 🎨 Design System

### Colors
- **Primary**: `#007AFF` (Apple Blue)
- **Success**: `#30D158` (Apple Green)
- **Error**: `#FF3B30` (Apple Red)
- **Warning**: `#FF9500` (Apple Orange)

### Typography
- **Font Family**: SF Pro Display, system fonts
- **Scale**: 8px grid system
- **Weights**: Regular, Medium, Semibold, Bold

### Components
- **Buttons**: Pill-shaped with priority-based styling
- **Cards**: Subtle shadows with rounded corners
- **Inputs**: Floating labels with smooth animations
- **Layout**: 8px grid system for consistent spacing

## 🌙 Dark Mode

ScanWeb features a sophisticated dark mode implementation:
- **System Detection** - Automatically detects user's system preference
- **Manual Toggle** - Sun/moon toggle in the navbar
- **Persistent** - Remembers user's choice in localStorage
- **Accessible** - High contrast ratios for readability

## 📱 Responsive Design

- **Mobile First** - Optimized for mobile devices
- **Breakpoints** - 320px, 768px, 1024px, 1440px
- **Touch Friendly** - 44px minimum touch targets
- **Flexible Layout** - Adapts to all screen sizes

## ♿ Accessibility Features

- **WCAG 2.1 AA Compliant** - Meets accessibility standards
- **Keyboard Navigation** - Full keyboard support
- **Screen Reader Support** - Proper ARIA labels
- **High Contrast** - Sufficient color contrast ratios
- **Focus Management** - Clear focus indicators

## 🚀 Deployment

### Quick Deploy with Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/AvagyanAren/accessibility-saas)

**Manual Vercel Deployment:**
```bash
# Install Vercel CLI
npm i -g vercel

# Login and deploy
vercel login
vercel

# Deploy to production
vercel --prod
```

### Other Deployment Options

**Netlify:**
```bash
npm run build
# Drag .next folder to Netlify dashboard
```

**Railway:**
```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

**Docker:**
```bash
docker build -t accessibility-saas .
docker run -p 3000:3000 accessibility-saas
```

### 📋 Deployment Checklist
- ✅ Playwright browsers configured for production
- ✅ API routes optimized with proper timeouts
- ✅ Error handling enhanced for production
- ✅ Environment variables configured
- ✅ HTTPS enabled (automatic on Vercel/Netlify)

**See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.**

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Ensure accessibility compliance
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **axe-core** - Accessibility testing engine
- **Playwright** - Browser automation
- **Next.js** - React framework
- **Apple** - Design inspiration
- **WCAG** - Accessibility guidelines

## 📞 Support

- **Documentation**: [API Docs](/api-docs)
- **Issues**: [GitHub Issues](https://github.com/AvagyanAren/accessibility-saas/issues)
- **Email**: [Contact Us](mailto:support@scanweb.dev)

---

<div align="center">

**Made with ❤️ for a more accessible web**

[🌐 Live Demo](https://accessibility-saas-1.vercel.app) • [📖 Documentation](/api-docs) • [🐛 Report Bug](https://github.com/AvagyanAren/accessibility-saas/issues) • [✨ Request Feature](https://github.com/AvagyanAren/accessibility-saas/issues)

</div>
