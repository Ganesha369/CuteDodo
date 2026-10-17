# Mobile View Compact Sizing Implementation Plan

The objective is to refine the mobile responsive experience across all sections and components so that elements feel balanced, compact, and comfortable on mobile screens without taking up excessive vertical viewport space, while leaving desktop view layouts and dimensions completely unchanged.

---

## 1. User Alignment & Confirmed Preferences

- **Mobile Section Vertical Padding**: Reduced from `py-16 md:py-24` down to `py-8 sm:py-12 md:py-24` across all main content sections.
- **Hero Mascot & Illustrations**: Scaled down by ~25%–30% on mobile (mascot card `w-40 h-40 xs:w-48 xs:h-48 sm:w-72 sm:h-72 lg:w-80 lg:h-80`, backdrop scaled proportionally).
- **Headings & Typography**: Scaled down on mobile (`text-2xl sm:text-4xl lg:text-5xl` for main section titles; hero headline `text-2xl sm:text-4xl md:text-5xl lg:text-6xl`).
- **Cards & Containers**: Compact padding on mobile (`p-4 sm:p-6 lg:p-8` for major cards and showcases) with tighter spacing gaps (`gap-3 sm:gap-6`).
- **Desktop Invariance**: All `md:` and `lg:` classes remain strictly identical to current desktop specifications.

---

## 2. Section-by-Section Implementation Changes

### A. Hero (`src/components/Hero.tsx`)
- **Hero Section Height & Padding**: Change `py-8 sm:py-12 lg:py-0` with compact margins on mobile.
- **Headlines & Subtitles**:
  - Main H1: `text-2xl sm:text-4xl md:text-5xl lg:text-6xl`.
  - Highlighted "SOLANA": `text-3xl sm:text-5xl lg:text-7xl`.
  - Subtitle: `text-sm sm:text-xl lg:text-2xl`.
- **Mascot Avatar & Stage**:
  - Avatar card: `w-40 h-40 xs:w-48 xs:h-48 sm:w-72 sm:h-72 lg:w-80 lg:h-80`.
  - Circular backdrop: `w-44 h-44 xs:w-52 xs:h-52 sm:w-80 sm:h-80`.
  - Speech bubble: `text-[11px] sm:text-xs lg:text-sm px-3 py-1.5 sm:px-4 sm:py-2.5 max-w-[240px] sm:max-w-xs`.
- **Action Buttons**: `py-2.5 px-4 text-sm sm:py-3.5 sm:px-6 sm:text-lg`.
- **CA Box**: Compact mobile padding (`p-2.5 sm:p-4`).
- **Marquee & Interactive Scenes**:
  - Forest Drive Scene: reduce height on mobile (`h-56 sm:h-72 md:h-80 lg:h-96`).
  - Playroom Scene: compact padding and canvas dimensions on mobile.

### B. About Section (`src/components/About.tsx`)
- **Section Padding**: `py-8 sm:py-12 md:py-24`.
- **Header**: Title `text-2xl sm:text-4xl lg:text-5xl mb-2 sm:mb-4`, subtitle `text-sm sm:text-base lg:text-lg`.
- **Main Story Card**: `p-4 sm:p-8 lg:p-10 mb-8 sm:mb-16`.
- **Illustration Card**: Responsive mobile max-width with `style={{ width: '473.337px', height: '411.725px', maxWidth: '100%' }}`.
- **4 Feature Cards**: `p-4 sm:p-6`, icon container `w-10 h-10 text-xl sm:w-12 sm:h-12`, title `text-lg sm:text-xl`.

### C. Playroom (`src/components/GardenFamilyPlayScene.tsx`)
- **Canvas / Scene Height**: `h-56 sm:h-72 md:h-80`.
- **Controls & Interaction Badges**: Compact padding `px-2.5 py-1 text-xs sm:px-3.5 sm:py-1.5 sm:text-sm`.

### D. Gallery (`src/components/Gallery.tsx`)
- **Section Padding**: `py-8 sm:py-12 md:py-24`.
- **View Mode Switcher**: Compact buttons `px-2.5 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm`.
- **Cards Grid**: `gap-4 sm:gap-8`, card content padding `p-3.5 sm:p-5`, title `text-lg sm:text-xl`.

### E. Tokenomics (`src/components/Tokenomics.tsx`)
- **Section Padding**: `py-8 sm:py-12 md:py-24`.
- **Coin Showcase**: `w-36 h-36 xs:w-44 xs:h-44 sm:w-56 sm:h-56` on mobile.
- **Supply Pill**: `text-xs px-3 py-1 sm:text-base sm:px-4 sm:py-1.5`.
- **Allocation List**: Card padding `p-3.5 sm:p-5`, title `text-base sm:text-lg`.
- **Technical Specs Table**: Container `p-4 sm:p-8`, spec item boxes `p-2.5 sm:p-4`, value `text-base sm:text-xl`.

### F. How to Buy (`src/components/HowToBuy.tsx`)
- **Section Padding**: `py-8 sm:py-12 md:py-24`.
- **4 Step Cards**: Padding `p-4 sm:p-6`, step badge `w-8 h-8 text-base sm:w-10 sm:h-10 sm:text-xl`.
- **Jupiter Swap Box**: Padding `p-4 sm:p-8`, title `text-xl sm:text-2xl`, inputs `p-2.5 sm:p-3 text-sm sm:text-base`.

### G. Charity Milestones (`src/components/CharityMilestones.tsx`)
- **Section Padding**: `py-8 sm:py-12 md:py-24`.
- **Official Charity Wallet Box**: Padding `p-3.5 sm:p-6`.
- **Milestone Cards Grid**: `gap-3 sm:gap-6`, card padding `p-3.5 sm:p-5`.
- **Voting Poll Box**: Container `p-4 sm:p-8`, candidate cards `p-3 sm:p-4`.

### H. Public Wallets (`src/components/PublicWallets.tsx`)
- **Section Padding**: `py-8 sm:py-12 md:py-24`.
- **Filter Tabs**: Buttons `px-2.5 py-1 text-[11px] sm:px-3.5 sm:py-1.5 sm:text-sm`.
- **Wallets Grid**: `gap-2.5 sm:gap-4`, card padding `p-2.5 sm:p-3.5`.
- **Transparency Promise Banner**: `p-4 sm:p-8`.

### I. Roadmap (`src/components/Roadmap.tsx`)
- **Section Padding**: `py-8 sm:py-12 md:py-24`.
- **Phase Cards**: Padding `p-4 sm:p-6`, titles `text-xl sm:text-2xl`.

### J. Community (`src/components/Community.tsx`)
- **Section Padding**: `py-8 sm:py-12 md:py-24`.
- **Hub Cards**: Padding `p-4 sm:p-6`, icons `w-12 h-12 text-2xl sm:w-16 sm:h-16 sm:text-3xl`.
- **Twitter Feed Box**: Padding `p-4 sm:p-8`, post cards `p-3 sm:p-4`.

### K. FAQ (`src/components/FAQ.tsx`)
- **Section Padding**: `py-8 sm:py-12 md:py-24`.
- **Accordion Items**: Padding `p-3 sm:p-4`, questions `text-xs sm:text-base`.

---

## 3. Verification & Safety Steps

1. **Compilation Check**: Run `compile_applet` to guarantee complete build passes without errors.
2. **Linting Check**: Run `lint_applet` to confirm 0 TypeScript and syntax issues.
3. **Viewport Responsiveness**: Ensure mobile layout (<640px) is clean and proportionate while tablet (640px–1024px) and desktop (>=1024px) preserve their current layout, proportions, and design.
