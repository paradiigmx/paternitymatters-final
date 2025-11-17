# Paternity Matters

## Overview
Paternity Matters is a professional website dedicated to helping fathers understand and fight for their parental rights. The site offers comprehensive resources, legal information, AI-powered tools, and community support for fathers navigating the complexities of family law.

**Current Status:** Successfully set up and running in Replit environment

## Recent Changes
- **November 16, 2025**: Shop optimization, navigation improvements, enhanced affiliate integration, and major site cleanup
  - **Navigation Updates**:
    - Moved Shop before Blog in main navigation (removed from More dropdown)
    - Shop now prominently featured in header
  - **Shop Page Optimization**:
    - Streamlined to 3 core products with professional product images
    - My Forever DNA Paternity Test Kit (paternity-test-product.png)
    - The Intentional Father by Jon Tyson (intentional-father-book.png)
    - AncestryDNA Origins Kit (ancestry-dna-kit.png)
    - Fixed AncestryDNA affiliate link
  - **Major Site Cleanup**:
    - **Custody Page**: Removed co-parenting app links section (OurFamilyWizard, AppClose, Custody X Change) and app icons for cleaner, simpler design
    - **Contact Page**: Removed consultations text, office hours, and "Follow Us" social media section - now shows only email
    - **Footer**: Removed "Connect" social media section - simplified to 3 balanced columns (logo, navigation, legal)
    - **Code Cleanup**: Removed all unused components (AppCard) and imports for cleaner, more maintainable codebase
  - **Affiliate Integration Enhancements**:
    - All DNA test CTAs now use professional product image
    - Expanded DNA test placements throughout paternity-related content
    - Updated ChildSupportPage to feature DNA test (contextually relevant for establishing paternity before support obligations)
    - Blog post "Why DNA Testing Matters" now uses product image instead of logo
    - Removed less relevant products (Expectant Father, Be Prepared, Sperm test) to focus on core offerings

- **November 15, 2025**: Comprehensive redesign, content enhancement, and affiliate integration
  - **Branding Updates**:
    - Replaced header logo with white-horz-med-res.png
    - Updated favicon to Artboard 6-low-res.png
    - Updated color scheme to match logo (navy #0f172a, dark-blue #1e3a5f, orange #f97316)
  - **Complete Image Migration**:
    - Eliminated ALL external Unsplash URLs (verified 0 remaining)
    - Migrated 13 pages to use local images
    - Fixed 20+ broken blog post images
    - Updated homepage hero to modern high-contrast image
  - **Shop & Affiliate Integration**:
    - Created ShopPage component with Amazon affiliate products
    - Built reusable AffiliateProductCTA component
    - All affiliate links include FTC-compliant disclosure
  - **Blog Content Enhancements**:
    - Expanded Game of Thrones post with comprehensive Cersei/Joffrey paternity fraud analysis
    - Created new blog post: "Why a Man Should Put Himself on Child Support"
    - All 29 blog posts now have minimum 2 credible sources with citations
  - **Contact Information**:
    - Updated contact email to info@publicbar.org
  - **Replit Configuration**:
    - Configured Vite for Replit environment (port 5000, allowedHosts: true for proxy)
    - Set up development workflow
    - Configured deployment settings for autoscale
    - Added proper .gitignore for Node.js project
    - Integrated GEMINI_API_KEY secret for AI features

## Project Architecture

### Tech Stack
- **Frontend Framework**: React 19.2 with TypeScript
- **Build Tool**: Vite 6.2
- **Styling**: Tailwind CSS (CDN in development)
- **AI Integration**: Google Gemini API (@google/genai)
- **Fonts**: Google Fonts (Montserrat, Lora)

### Project Structure
```
/
├── components/          # React components
│   ├── icons/          # Icon components
│   ├── HomePage.tsx    # Main landing page
│   ├── AboutPage.tsx
│   ├── ShopPage.tsx    # Affiliate product shop
│   ├── AffiliateProductCTA.tsx  # Reusable affiliate CTA component
│   ├── PaternityPage.tsx
│   ├── CustodyPage.tsx
│   ├── ChildSupportPage.tsx
│   ├── BlogPage.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ...             # Additional page components
├── data/               # Data files
│   ├── blogPosts.ts    # Blog content
│   └── states.ts       # State-specific data
├── public/             # Static assets
│   ├── images/         # Image assets
│   └── logos/          # Logo files
├── App.tsx             # Main app component
├── index.tsx           # Application entry point
├── index.html          # HTML entry point
├── vite.config.ts      # Vite configuration
└── package.json        # Dependencies
```

### Key Features
1. **Informative Pages**: Detailed sections on Paternity, Custody, Child Support, Fatherhood
2. **AI-Powered Tools**:
   - Child Support Estimator (state-specific calculations)
   - State Law Summaries (custody law information)
   - Local Resource Finder (family courts, legal aid, DNA testing centers)
3. **Blog System**: Rich collection of 29+ articles with credible sources and citations
4. **Shop Page**: Curated affiliate products (DNA tests, fatherhood books, health tools)
5. **Interactive Tools**: Due Date Calculator, Paternity Timeline
6. **Responsive Design**: Fully accessible across all devices

### Development Configuration

#### Vite Settings
- **Dev Server**: Port 5000, Host 0.0.0.0
- **HMR**: Configured for Replit proxy
- **Environment Variables**: GEMINI_API_KEY loaded from Replit Secrets

#### Workflow
- **Name**: dev-server
- **Command**: `npm run dev`
- **Port**: 5000
- **Type**: webview

### Environment Variables
- `GEMINI_API_KEY`: Required for AI-powered features (Child Support Estimator, State Law Summaries, Local Resource Finder)

### Deployment
- **Target**: Autoscale (stateless web application)
- **Build**: `npm run build`
- **Run**: `npx vite preview --host 0.0.0.0 --port 5000`

## Dependencies

### Production
- `react`: ^19.2.0
- `react-dom`: ^19.2.0
- `@google/genai`: ^1.29.0

### Development
- `@types/node`: ^22.14.0
- `@vitejs/plugin-react`: ^5.0.0
- `typescript`: ~5.8.2
- `vite`: ^6.2.0

## Development Workflow

### Running Locally
```bash
npm install
npm run dev
```
The application will be available at http://localhost:5000

### Building for Production
```bash
npm run build
npm run preview
```

### Publishing
The project is configured for Replit's autoscale deployment. Click the "Deploy" button in Replit to publish to production.

## Notes
- The project uses Tailwind CSS via CDN in development (not recommended for production)
- AI features require a valid GEMINI_API_KEY
- All client-side routing is handled through React state management
- The site is fully static with no backend server requirements beyond serving the built files
