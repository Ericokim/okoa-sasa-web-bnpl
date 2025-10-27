# Okoa Sasa Logos

## 📁 Directory Structure

Place your exported logos from Figma in this directory with the following naming convention:

```
public/logos/
├── okoa-sasa-logo-full.svg          # Full logo (icon + wordmark) - Primary
├── okoa-sasa-logo-white.svg         # Full logo in white (for dark backgrounds)
├── okoa-sasa-icon.svg               # Just the icon/symbol
├── okoa-sasa-wordmark.svg           # Just the text/wordmark
├── okoa-sasa-logo-full.png          # PNG fallback (2x or 3x)
└── okoa-sasa-logo-white.png         # PNG fallback white version
```

## 🎨 Export Instructions from Figma

### From your Figma link: https://www.figma.com/design/r1ngEr7NPc7RBjX2r62s91/okao-SASA-final--Copy-?node-id=6-337

1. **Select the logo** in Figma (node-id=6-337)
2. **Click "Export"** in the right panel
3. **Export Settings:**
   - Format: **SVG** (preferred for web)
   - Also export: **PNG at 2x** (for fallback)
   - Background: **Transparent**

### Required Logo Variants

#### 1. Full Logo (Primary)
- **File:** `okoa-sasa-logo-full.svg`
- **Usage:** Main header, landing page, about page
- **Colors:** Orange gradient (#f8971d to #ee3124) + Green (#1c8546)

#### 2. White Logo (Dark Mode)
- **File:** `okoa-sasa-logo-white.svg`
- **Usage:** Dark backgrounds, footer, overlays
- **Colors:** All white (#FFFFFF)

#### 3. Icon Only
- **File:** `okoa-sasa-icon.svg`
- **Usage:** Favicons, app icons, small spaces
- **Size:** Should work well at 32x32px minimum

#### 4. Wordmark Only
- **File:** `okoa-sasa-wordmark.svg`
- **Usage:** Horizontal layouts, payment badges
- **Colors:** Brand gradient

## 🔧 Usage in Components

Once exported, update the Header component:

```jsx
// src/components/shared/Header.jsx
import logo from '/logos/okoa-sasa-logo-full.svg'
import logoWhite from '/logos/okoa-sasa-logo-white.svg'

<Link to="/" className="flex items-center space-x-2">
  <img 
    src={logo} 
    alt="Okoa Sasa" 
    className="h-8 md:h-10"
  />
</Link>
```

## 📏 Size Guidelines

- **Header Logo:** 32px - 40px height (mobile: 32px, desktop: 40px)
- **Footer Logo:** 24px - 32px height
- **Favicon:** 16x16, 32x32, 48x48, 64x64 (PNG/ICO)
- **Touch Icon:** 180x180 (PNG)
- **OG Image:** 1200x630 (PNG/JPG)

## 🎯 Accessibility

- Always include `alt="Okoa Sasa"` text
- For decorative uses, use `alt=""`
- Ensure sufficient contrast on backgrounds
- Maintain aspect ratio when scaling

## 📝 Notes

- SVG files are preferred for web (scalable, smaller file size)
- PNG fallbacks at 2x resolution for retina displays
- Keep original files for future reference
- Update this README if naming conventions change
