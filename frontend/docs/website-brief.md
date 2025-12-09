# Course Tutor Website Brief

## Design Philosophy

This brief is written from the perspective of an expert UX/UI designer with deep knowledge of:
- **Design Principles**: Visual hierarchy, gestalt principles, grid systems, typography, spacing
- **Color Theory**: Understanding balance, harmony, contrast, and psychological impact of colors
- **Marketing Psychology**: Ethical persuasion, trust-building, subtle influence without manipulation
- **Sales Psychology**: Understanding buyer motivation, reducing friction, building credibility naturally
- **Theming**: Creating cohesive visual systems that work across components and pages
- **User-Centered Design**: Prioritizing clarity, usability, and user goals above all else

## Overview

Course Tutor is an online learning platform that helps people develop new skills through structured courses. The platform offers video lessons, hands-on projects, and quizzes to reinforce learning.

## Target Audiences

1. **Career Changers** - People looking to transition into new fields
2. **Students** - College students supplementing their education
3. **Parents** - Busy parents learning in short time windows
4. **Professionals** - Tech workers keeping skills current
5. **Hobbyists** - People learning for personal enrichment

## Navigation Requirements

### Header
Every page must include a consistent header with:
- Course Tutor logo/wordmark (left)
- Main navigation links: Courses, About, Help
- Sign In / Sign Up buttons (right)
- Mobile hamburger menu for responsive design
- Subtle shadow or border to separate from content
- Sticky/fixed positioning for easy access while scrolling

## Design Preferences

### Theme
- **Light themes only** - No dark themes
- Clean, approachable, professional aesthetic
- Warm and welcoming rather than corporate

### Color Palette & Balance
- **Primary**: Blue tones (trust, professionalism, learning)
- **Accents**: Soft greens (growth), warm yellows/oranges (optimism), teals (innovation), corals (energy)
- **Backgrounds**: White, light gray (#f8fafc), soft pastels
- **Text**: Slate-900 for headings, slate-600 for body text
- **AVOID**:
  - **Purple/Violet tones** - Associated with AI and feels inauthentic/generic
  - Dark backgrounds, harsh contrasts, neon colors
  - Indigo (too close to purple)

**Color Balance Principles**:
- 60% neutral backgrounds (white, light gray)
- 30% supporting colors (soft blues, subtle accents)
- 10% accent colors (CTAs, highlights)
- Maintain sufficient contrast ratios for accessibility (4.5:1 minimum)

### Typography
- Clear, readable fonts
- Comfortable font sizes (16px+ for body text)
- Adequate line spacing (1.5-1.75 for body)
- Strong visual hierarchy: H1 > H2 > H3 > Body
- **Custom CSS styling is allowed**: Use inline `<style>` tags or the `style` prop for advanced text effects like gradient text, text-shadow, letter-spacing, etc.

**Custom CSS Examples**:
```tsx
{/* Gradient text using CSS */}
<style>{`
  .gradient-text {
    background: linear-gradient(180deg, #1e293b 0%, #64748b 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`}</style>
<h1 className="gradient-text">Stunning Headline</h1>

{/* Text shadow for depth */}
<h1 style={{ textShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
  Subtle shadow text
</h1>

{/* Letter spacing for elegance */}
<span style={{ letterSpacing: '0.05em' }}>FEATURED COURSES</span>

{/* Custom font-family */}
<div style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif" }}>
  Custom font content
</div>
```

### Layout
- Clean and uncluttered
- Generous whitespace (breathing room between sections)
- Mobile-responsive
- Easy navigation
- Consistent spacing scale (8px base unit)

### Page Width & Margins
- **Fixed max-width container**: Use `max-w-6xl` (1152px) or `max-w-7xl` (1280px) for main content
- **Consistent side margins**: Always maintain left/right padding (px-4 on mobile, px-6 on desktop)
- **Centered content**: Use `mx-auto` to center the max-width container
- **Full-bleed sections**: Background colors/images can extend full-width, but content stays within max-width
- **Example pattern**:
  ```tsx
  <section className="bg-slate-50"> {/* Full-width background */}
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-16"> {/* Constrained content */}
      {/* Content here */}
    </div>
  </section>
  ```

### Background Gradient Transitions
Use subtle gradient backgrounds instead of flat colors to create smooth visual transitions between sections. Keep gradients understated to avoid distraction.

**Gradient Direction Patterns**:
- **Vertical gradients**: `bg-gradient-to-b from-white to-slate-50` - top to bottom
- **Radial gradients**: Soft color emanating from center or corners
- **Multi-stop gradients**: `from-white via-blue-50/30 to-white` for subtle color wash

**Subtle Gradient Examples**:
```tsx
{/* Hero with subtle gradient */}
<section className="bg-gradient-to-b from-blue-50 to-white">
  {/* Content */}
</section>

{/* Section with very subtle color wash */}
<section className="bg-gradient-to-br from-white via-emerald-50/20 to-white">
  {/* Content */}
</section>

{/* Alternating sections with gradient transitions */}
<section className="bg-gradient-to-b from-white to-slate-50">...</section>
<section className="bg-gradient-to-b from-slate-50 to-white">...</section>

{/* Radial gradient for focal point */}
<section className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/40 via-white to-white">
  {/* Content */}
</section>
```

**Gradient Guidelines**:
- Keep opacity low (10-30%) for accent colors in gradients
- Use gradients to guide the eye down the page
- Match gradient colors to the page's accent palette
- Avoid harsh color stops - use `via-` for smooth transitions
- Test gradients on different screen sizes

## Hero Block Patterns

### Full-Width Image Heroes
Some pages benefit from bold, full-width hero sections with background images and overlayed text. These create immediate visual impact and establish the page's mood.

**Hero Block Types**:

1. **Full-Bleed Image Hero**
   - Full-width background image covering the hero section
   - Dark gradient overlay (from-black/60 to-transparent or similar)
   - White text overlayed for contrast
   - CTA buttons with solid backgrounds

2. **Split Hero (Image + Content)**
   - 50/50 or 60/40 split between image and text content
   - Image on one side, messaging on the other
   - Works well for professional/business personas

3. **Angled/Diagonal Hero**
   - Image with angled clip-path or diagonal divider
   - Creates dynamic, modern feel
   - Good for tech-forward personas

**Implementation Example**:
```tsx
{/* Full-bleed image hero with overlay */}
<section className="relative min-h-[600px] flex items-center">
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-...)' }}
  />
  <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-900/40" />
  <div className="relative z-10 container mx-auto px-6">
    <h1 className="text-5xl font-bold text-white mb-6">Headline Here</h1>
    <p className="text-xl text-white/90 mb-8 max-w-2xl">Supporting text...</p>
    <Button className="bg-blue-600 hover:bg-blue-700 text-white">Get Started</Button>
  </div>
</section>
```

**When to Use Hero Blocks**:
- Landing pages targeting specific personas
- Pages emphasizing lifestyle/aspiration
- When you want immediate emotional connection
- Professional/enterprise-focused variants

**Overlay Guidelines**:
- Use gradients rather than solid overlays for depth
- Ensure minimum 4.5:1 contrast ratio for text
- Test readability across the full image
- Consider image focal points when positioning text

## Wavy Lines & Section Dividers

### Curved SVG Dividers
Use wavy/curved SVG shapes to create smooth transitions between sections. These add visual interest and break up the page without harsh horizontal lines.

**Types of Dividers**:

1. **Simple Wave** - Single curved line, good for subtle transitions
2. **Multi-Wave** - Multiple overlapping curves for more dynamic feel
3. **Angled/Diagonal** - Slanted dividers for modern, dynamic pages
4. **Blob/Organic** - Irregular curved shapes for creative personas

**Implementation Example**:
```tsx
{/* Wavy divider between sections */}
<div className="relative">
  <svg
    className="absolute bottom-0 left-0 w-full h-16 md:h-24"
    viewBox="0 0 1440 100"
    preserveAspectRatio="none"
  >
    <path
      fill="#f8fafc" // Next section's background color
      d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"
    />
  </svg>
</div>

{/* Multi-wave divider */}
<svg className="w-full h-20" viewBox="0 0 1440 100" preserveAspectRatio="none">
  <path fill="#e2e8f0" opacity="0.5" d="M0,40 C480,100 960,0 1440,60 L1440,100 L0,100 Z" />
  <path fill="#f1f5f9" d="M0,60 C480,20 960,80 1440,40 L1440,100 L0,100 Z" />
</svg>
```

**When to Use Wavy Dividers**:
- Between hero and first content section
- Transitioning between different background colors
- Before/after full-width image sections
- To add organic feel to otherwise boxy layouts

### Image Fades & Gradients

Apply gradient fades to images to create smooth blending with backgrounds and improve text readability.

**Fade Directions**:
- **Bottom fade**: Image fades into the section below
- **Top fade**: Image fades from section above
- **Edge fades**: Left/right fades for side-positioned images
- **Vignette**: Fade from edges toward center for focused images

**Implementation Examples**:
```tsx
{/* Image with bottom fade */}
<div className="relative">
  <img src="..." className="w-full h-[400px] object-cover" />
  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
</div>

{/* Image with edge fades (for text overlay) */}
<div className="relative">
  <img src="..." className="w-full h-full object-cover" />
  <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent" />
</div>

{/* Soft vignette effect */}
<div className="relative">
  <img src="..." className="w-full" />
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.3)_100%)]" />
</div>

{/* Image fading into colored background */}
<div className="relative bg-blue-50">
  <img src="..." className="w-full opacity-60" />
  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/50 to-blue-50" />
</div>
```

**Fade Guidelines**:
- Use subtle fades (30-60% opacity) for backgrounds
- Stronger fades (60-90%) when overlaying text
- Match gradient end color to adjacent section's background
- Test on various image types to ensure consistency
- Consider using `mix-blend-mode` for creative effects

### Combining Waves & Fades
For maximum visual impact, combine wavy dividers with image fades:

```tsx
{/* Hero with image, fade, and wavy bottom */}
<section className="relative min-h-[500px]">
  {/* Background image */}
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: 'url(...)' }}
  />
  {/* Gradient overlay for text */}
  <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 to-slate-900/30" />

  {/* Content */}
  <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
    <h1 className="text-white text-5xl font-bold">...</h1>
  </div>

  {/* Wavy bottom edge */}
  <svg
    className="absolute bottom-0 left-0 w-full h-16"
    viewBox="0 0 1440 100"
    preserveAspectRatio="none"
  >
    <path fill="#ffffff" d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z" />
  </svg>
</section>
```

## Wildcard Design Elements

Throw in unexpected design elements to make pages stand out and feel less templated. Use sparingly (1-2 per page) to create memorable moments.

### Floating Elements & Decorations
- **Floating shapes**: Subtle geometric shapes that drift with parallax
- **Scattered icons**: Small relevant icons floating in backgrounds
- **Particle effects**: Light dots or shapes that move subtly
- **Decorative blobs**: Organic colored shapes in corners/edges

```tsx
{/* Floating decorative elements */}
<div className="absolute top-20 right-10 w-20 h-20 bg-amber-200/30 rounded-full blur-xl animate-pulse" />
<div className="absolute bottom-40 left-20 w-12 h-12 bg-teal-300/20 rotate-45 animate-bounce" style={{ animationDuration: '3s' }} />
```

### Unconventional Layouts
- **Overlapping cards**: Cards that slightly overlap each other
- **Broken grid**: Elements that intentionally break the grid alignment
- **Asymmetric sections**: Uneven column splits (30/70, 25/75)
- **Rotated elements**: Slightly tilted cards or images (-2° to 2°)
- **Staggered galleries**: Masonry-style image layouts

```tsx
{/* Overlapping cards */}
<div className="relative">
  <div className="bg-white rounded-xl p-6 shadow-lg relative z-10">Card 1</div>
  <div className="bg-white rounded-xl p-6 shadow-lg -mt-4 ml-8 relative z-20">Card 2</div>
</div>

{/* Slightly rotated card */}
<div className="bg-white rounded-xl p-6 shadow-lg transform -rotate-1 hover:rotate-0 transition-transform">
  Tilted content
</div>
```

### Interactive Surprises
- **Hover reveals**: Hidden content that appears on hover
- **Magnetic buttons**: Buttons that follow cursor slightly
- **Parallax depth**: Multiple layers moving at different speeds
- **Scroll-triggered animations**: Elements that animate as you scroll past
- **Cursor trails**: Subtle effects following mouse movement

```tsx
{/* Hover reveal */}
<div className="group relative overflow-hidden rounded-xl">
  <img src="..." className="transition-transform group-hover:scale-110" />
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
    <div className="absolute bottom-4 left-4 text-white">Hidden content</div>
  </div>
</div>
```

### Typography Tricks
- **Gradient text**: Text with color gradients
- **Outlined text**: Text with stroke, no fill
- **Mixed weights**: Alternating bold/light in same heading
- **Highlighted words**: Key words with hand-drawn/marker-style background highlights that look sketched by hand
- **Animated text**: Text that types out or fades in word by word

**Hand-drawn Highlight Principles**:
- Use asymmetric shapes - avoid perfect rectangles
- Apply slight rotation (-1 to -2 degrees) for a subtle skew
- Use irregular border-radius values (e.g., `2px 8px 4px 6px`) for rough edges
- Keep shapes simple - avoid overly wavy or complex curves
- Use semi-transparent colors (50-70% opacity) so text shows through
- Skew the shape horizontally (`skewX`) for a quick marker-stroke feel
- Scale slightly beyond text bounds (105-110%) to simulate overshoot

```tsx
{/* Gradient text */}
<h1 className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
  Gradient Heading
</h1>

{/* Hand-drawn highlight - skewed marker style */}
<h2>Learn skills that
  <span className="relative inline-block px-2 py-1">
    <span className="relative z-10">matter</span>
    {/* Skewed marker stroke - simple and slightly tilted */}
    <span
      className="absolute inset-0 bg-amber-300/60 -rotate-1 scale-x-110"
      style={{
        borderRadius: '2px 6px 4px 8px',
        transform: 'rotate(-1deg) skewX(-2deg) scaleX(1.1)'
      }}
    />
  </span>
</h2>

{/* Simple skewed underline highlight */}
<span className="relative inline-block">
  <span className="relative z-10">important</span>
  <span
    className="absolute bottom-0 left-0 right-0 h-2 bg-amber-300/50"
    style={{
      transform: 'skewX(-3deg)',
      borderRadius: '1px 4px 2px 3px'
    }}
  />
</span>

{/* Mixed weights */}
<h1 className="font-light">Start your <span className="font-bold">learning journey</span> today</h1>
```

### Visual Accents
- **Underline decorations**: Wavy or hand-drawn underlines on headings
- **Corner accents**: Decorative corners on cards/sections
- **Quote marks**: Large stylized quotation marks for testimonials
- **Number highlights**: Big bold numbers for stats/steps
- **Icon badges**: Icons in colored circles as section markers

```tsx
{/* Hand-drawn underline effect */}
<h2 className="relative inline-block">
  Featured Courses
  <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12">
    <path d="M2,8 Q50,2 100,8 T200,8" stroke="#f59e0b" strokeWidth="3" fill="none" />
  </svg>
</h2>

{/* Large quote marks */}
<div className="relative">
  <span className="absolute -top-6 -left-4 text-8xl text-amber-200 font-serif">"</span>
  <blockquote className="relative z-10 text-xl italic">Quote text here</blockquote>
</div>
```

### Suggested Wildcard Combinations by Persona
| Persona | Wildcards to Consider |
|---------|----------------------|
| Students (V1) | Stickers, floating emojis, gradient text |
| Professionals (V2) | Subtle parallax, clean number highlights |
| Tech (V3) | Particle effects, code-style typography |
| Creative (V4) | Broken grid, overlapping elements, rotation |
| Minimal (V5) | Single bold accent, asymmetric layout |
| Parents (V6) | Soft floating shapes, warm highlights |
| Entrepreneurs (V7) | Bold stats, magnetic buttons |
| Gamers (V19) | Particle trails, glowing accents, level badges |
| Fitness (V20) | Energy bursts, progress bars, transformation reveals |

## Imagery Requirements

### Unsplash Images
Use high-quality images from Unsplash to enhance the visual appeal:

**Recommended Image Types**:
- People learning/studying (diverse representation)
- Laptop/workspace photography
- Collaborative team environments
- Abstract tech/code backgrounds (subtle)
- Professional portraits for testimonials

**Usage Guidelines**:
- Use images that feel authentic, not overly staged
- Prefer candid, natural moments over corporate stock
- Ensure images support the content, not distract from it
- Apply subtle overlays if needed for text readability
- Optimize images for web performance
- Include proper alt text for accessibility

**Suggested Unsplash Searches**:
- "person learning laptop"
- "coding workspace"
- "student studying"
- "team collaboration"
- "diverse professionals"

## Tone of Voice

### DO
- Friendly and supportive
- Clear and informative
- Encouraging without being pushy
- Focus on learning outcomes and skills
- Genuine testimonials (brief, authentic)

### DON'T
- Aggressive sales tactics
- Countdown timers or fake urgency
- Fear-based messaging
- Exaggerated claims or statistics
- "FOMO" pressure tactics
- Excessive exclamation marks
- Over-promising outcomes

## Sales Psychology (Ethical Approach)

**Principles to Apply**:
1. **Social Proof**: Brief, genuine testimonials that focus on learning experience
2. **Clarity Over Persuasion**: Help users understand the value, don't pressure them
3. **Reduce Friction**: Make signup and course browsing effortless
4. **Build Trust**: Transparent pricing, clear course descriptions, real expectations
5. **Value First**: Show what users will learn before asking for commitment

**Avoid**:
- Fake scarcity ("Only 5 spots left!")
- Manufactured urgency (countdown timers)
- Fear of missing out tactics
- Income/salary claims
- Manipulative comparison anchoring

## Theming System

### Consistent Visual Language
- Rounded corners (8-16px for cards, 4-8px for buttons)
- Subtle shadows for depth (not harsh drop shadows)
- Consistent icon style throughout
- Animation timing curves that feel natural (ease-out)
- Hover states that provide clear feedback

### Component Theming
- Buttons: Primary (blue), Secondary (outline), Ghost (text only)
- Cards: White background, subtle border or shadow, rounded corners
- Badges: Soft background colors with matching text
- Inputs: Clear borders, focus states, proper spacing

## Homepage Requirements

The homepage must clearly communicate:
1. **What the site is**: An online learning platform for skill development
2. **What courses are available**: Categories like web dev, data science, design
3. **How it works**: Watch lessons, do projects, take quizzes
4. **Who it's for**: Anyone wanting to learn new skills
5. **How to get started**: Clear signup/browse path

## Key Sections Per Page Variant

Each homepage variant should include:
1. **Header** with navigation
2. Clear hero explaining the platform
3. Featured courses or categories
4. How it works section
5. Brief testimonials (1-2 sentences each, genuine tone)
6. Simple call-to-action
7. Footer with links

## Animation Guidelines
- Subtle Framer Motion animations
- Smooth scroll effects
- Gentle hover states (scale 1.02-1.05 max)
- Avoid flashy or distracting animations
- Use spring physics for natural feel

## Accessibility
- High contrast text (dark text on light backgrounds)
- Alt text for images
- Keyboard navigable
- Screen reader friendly
- Focus indicators on interactive elements

## Content Guidelines

### Headlines
- Clear value proposition
- Focus on learning and growth
- Avoid clickbait or manipulative language

### Body Copy
- Conversational but professional
- Explain benefits simply
- Keep paragraphs short

### Testimonials
- Real-sounding names
- Brief quotes about learning experience
- Focus on course quality, not income claims
- **Include career-focused testimonials** (subtly):
  - "Helped me land my first dev job"
  - "Got promoted after completing the data science track"
  - "Transitioned from marketing to UX design"
  - "Finally understood enough Python to automate my work tasks"
  - Keep these genuine and understated, not boastful

## CSS & Visual Design Techniques

### Advanced Design Skills
The designer has expertise in CSS techniques that create visual appeal:

**Shadows & Depth**:
- Subtle box shadows for card elevation: `shadow-sm`, `shadow-md`
- Soft shadows that feel natural: `shadow-lg shadow-blue-500/10`
- Inner shadows for inset effects
- Text shadows for hero headings on image backgrounds

**Floating Elements**:
- Subtle floating animations using Framer Motion
- Decorative elements that drift gently (not distracting)
- Floating badges or icons that add visual interest
- Example: `animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }}`

**Gradients**:
- Soft linear gradients for backgrounds: `bg-gradient-to-b from-blue-50 to-white`
- Gradient text for headlines: `bg-clip-text text-transparent bg-gradient-to-r`
- Gradient borders using pseudo-elements

**Decorative Elements**:
- Curved SVG dividers between sections
- Subtle grid or dot patterns in backgrounds
- Soft blur circles (gradient orbs) for modern feel
- Decorative shapes that complement content

**Layering & Composition**:
- Overlapping elements for depth
- Z-index management for visual hierarchy
- Background patterns with low opacity
- Frosted glass effects: `backdrop-blur-sm bg-white/90`

**Subtle Polish**:
- Border radius consistency across components
- Consistent spacing using Tailwind scale
- Micro-interactions on hover (scale, shadow, color shift)
- Smooth transitions: `transition-all duration-300`

### Design Element Examples

```css
/* Soft floating animation */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* Gradient orb background */
.gradient-orb {
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: rgba(59, 130, 246, 0.1);
  filter: blur(80px);
}

/* Curved section divider */
<svg viewBox="0 0 1440 100" preserveAspectRatio="none">
  <path fill="#ffffff" d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z" />
</svg>
```

### When to Use These Techniques
- **Hero sections**: Gradient backgrounds, floating decorative elements
- **Cards**: Subtle shadows, hover lift effects
- **Section transitions**: Curved SVG dividers, gradient fades
- **Backgrounds**: Low-opacity patterns, gradient orbs
- **CTAs**: Shadow glow, slight scale on hover

### When NOT to Use
- Don't overdo floating animations (1-2 subtle ones max per page)
- Avoid heavy shadows that feel outdated
- Don't use patterns that distract from content
- Keep decorative elements minimal and purposeful

## Background Images & Hero Blocks

### Faded Background Images
Use background images with reduced opacity to add visual interest without distracting from content:

**Techniques**:
- **Opacity overlay**: Place a semi-transparent white/colored layer over the image
- **Image opacity**: Use `opacity-10` to `opacity-30` for subtle backgrounds
- **Gradient overlay**: Fade images into the background color using gradients
- **Blur effect**: Combine with `blur-sm` for softer backgrounds

**Implementation Examples**:
```jsx
{/* Faded background image with white overlay */}
<div className="relative">
  <div
    className="absolute inset-0 bg-cover bg-center opacity-10"
    style={{ backgroundImage: 'url(https://images.unsplash.com/...)' }}
  />
  <div className="absolute inset-0 bg-white/80" /> {/* White overlay */}
  <div className="relative z-10">
    {/* Content here */}
  </div>
</div>

{/* Gradient fade over image */}
<div className="relative">
  <img src="..." className="absolute inset-0 w-full h-full object-cover opacity-20" />
  <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-white" />
  <div className="relative z-10">...</div>
</div>
```

**Recommended Opacity Levels**:
- `opacity-5` to `opacity-15`: Very subtle texture, barely visible
- `opacity-15` to `opacity-25`: Noticeable but not distracting
- `opacity-25` to `opacity-40`: More prominent, use with strong overlay

### Hero Blocks with Images
Don't be afraid to use bold hero sections with imagery:

**Full-width Hero with Background Image**:
- Large background image with gradient overlay
- Text with text-shadow for readability
- Clear call-to-action buttons
- Works well for emotional impact

**Split Hero (Image + Text)**:
- Image on one side, text on the other
- Clean separation of visual and content
- Good for explaining the product

**Image Cards in Hero**:
- Multiple smaller images arranged in a grid or mosaic
- Shows variety of content/learners
- More dynamic visual interest

### Text Over Images
When placing text on images:
- Always use an overlay (gradient or solid color with opacity)
- Add `text-shadow` for extra readability: `text-shadow: 0 2px 4px rgba(0,0,0,0.1)`
- Ensure WCAG contrast compliance (4.5:1 minimum)
- Test on both light and dark areas of the image

**Tailwind Text Shadow Utility** (add to config or use inline):
```jsx
<h1 className="text-white" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
  Hero Title
</h1>
```

### Image Placement Guidelines
- **1-3 images per page** is ideal - don't overload
- Place images where they support the message
- Use consistent aspect ratios within sections
- Ensure images are high quality but optimized for web
- Consider lazy loading for performance

## Layout Variety & Visual Rhythm

### CRITICAL: Avoid Repetitive Layouts
Each section on a page MUST have a different layout structure. Do NOT use the same grid pattern twice in a row.

**Bad Example (repetitive)**:
```
Section 1: 4-column grid of cards
Section 2: 4-column grid of cards  ← Same layout, boring!
Section 3: 4-column grid of cards  ← Same again, monotonous!
```

**Good Example (varied)**:
```
Section 1: Hero with centered text
Section 2: 4-column icon grid
Section 3: 2-column split (image left, text right)
Section 4: 3-column testimonial cards
Section 5: Single centered CTA block
Section 6: Horizontal numbered steps with connecting line
```

### Layout Options to Mix & Match

**Grid Variations**:
- 2-column (50/50 split)
- 3-column cards
- 4-column compact grid
- Asymmetric grid (1/3 + 2/3 or 2/3 + 1/3)
- Masonry-style staggered

**List & Flow Layouts**:
- Horizontal numbered steps with visual connector
- Vertical timeline with alternating left/right
- Accordion-style expandable sections
- Horizontal scrolling carousel

**Feature Displays**:
- Large feature card with smaller supporting cards
- Icon + text rows (horizontal)
- Stacked full-width sections
- Split screen (image one side, content other)

**Content Blocks**:
- Centered single column text
- Quote/testimonial spotlight (one large)
- Stats row with large numbers
- Image mosaic/collage

### Visual Rhythm Principles
1. **Alternate density**: Follow a dense section with a spacious one
2. **Vary alignment**: Mix centered, left-aligned, and split layouts
3. **Change backgrounds**: Alternate between white, colored, and image backgrounds
4. **Adjust spacing**: Some sections tight, others with generous padding
5. **Mix media**: Text-only sections → image sections → icon sections

### Section Transition Examples
- Hero (centered) → Categories (4-col grid) → How It Works (horizontal steps) → Testimonial (2-col split) → CTA (centered)
- Hero (split with image) → Features (icon list) → Image showcase (full width) → Stats (numbers row) → Testimonials (3-col) → CTA

## Shadow Variety

### CRITICAL: Vary Shadow Styles Across Pages
Each homepage variant should have a DIFFERENT shadow personality. Don't use the same shadow treatment on all pages.

### Shadow Styles by Personality

**V0 - Soft & Welcoming** (General Audience):
- Subtle, diffused shadows: `shadow-md`, `shadow-lg`
- Neutral shadows with low opacity
- Example: `shadow-lg shadow-slate-900/5`

**V1 - Elevated & Energetic** (Students):
- Colored shadows that match accent color: `shadow-indigo-500/20`
- Slightly larger shadows for a floating effect
- Example: `shadow-xl shadow-indigo-500/15`

**V2 - Professional & Understated** (Professionals):
- Minimal shadows, rely more on borders
- Very subtle depth: `shadow-sm` or just `border`
- Example: `shadow-sm` or `border border-slate-200`

**V3 - Tech & Sharp** (Tech Learners):
- Hard-edged shadows (smaller blur radius)
- Accent-colored glow effects for code/terminal elements
- Example: `shadow-lg shadow-emerald-500/10` or `ring-1 ring-emerald-500/20`

**V4 - Playful & Colorful** (Creative Hobbyists):
- Colored shadows that match vibrant palette
- Multiple shadow layers for depth
- Example: `shadow-xl shadow-violet-500/20`

**V5 - Minimal & Clean** (Design-Conscious):
- Almost no shadows, or very subtle
- Rely on spacing and borders for separation
- Example: `shadow-none` with `border-slate-100` or just `shadow-sm`

### Shadow Techniques

**Standard Shadows** (Tailwind):
```
shadow-sm    → Very subtle, close
shadow       → Light, standard
shadow-md    → Medium, comfortable
shadow-lg    → Large, prominent
shadow-xl    → Extra large, floating
shadow-2xl   → Maximum, dramatic
```

**Colored Shadows** (add depth + brand):
```jsx
className="shadow-lg shadow-blue-500/10"     // Blue tint
className="shadow-xl shadow-purple-500/20"   // Purple glow
className="shadow-lg shadow-emerald-500/15"  // Green accent
```

**Layered Shadows** (sophisticated depth):
```jsx
// Multiple shadow layers
style={{
  boxShadow: '0 4px 6px rgba(0,0,0,0.05), 0 10px 20px rgba(59,130,246,0.1)'
}}
```

**Inner Shadows** (inset effects):
```jsx
className="shadow-inner bg-slate-50"  // Pressed/inset look
```

**Glow Effects** (for CTAs or highlights):
```jsx
className="shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40"
```

### Shadow Anti-Patterns
- ❌ Don't use the same shadow on every card across all pages
- ❌ Don't use harsh black shadows (`shadow-black`) - looks dated
- ❌ Don't over-shadow - too many `shadow-2xl` elements compete
- ❌ Don't forget hover states - shadows should respond to interaction

### Shadow + Hover Best Practices
```jsx
// Card with shadow that lifts on hover
<div className="shadow-md hover:shadow-xl transition-shadow duration-300">

// CTA with glow that intensifies
<button className="shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30">
```

## Page Variant Personas & Design Briefs

Each homepage variant (V0-V5) targets a specific persona with unique design, tone, and messaging. When building or updating a page, read this section to understand the full context.

---

### V0 - HomePage.tsx (General Audience)

**Target Persona**: Anyone interested in learning new skills
- Age: 25-45
- Motivation: Personal growth, career flexibility
- Pain point: Overwhelmed by options, unsure where to start
- Tech comfort: Moderate

**Design Style**:
- **Aesthetic**: Welcoming, balanced, trustworthy
- **Color palette**: Blue primary, purple accents, soft blue-50 backgrounds
- **Shadows**: Soft & diffused (`shadow-lg shadow-slate-900/5`)
- **Border radius**: Medium (8-12px)
- **Typography**: Clean, friendly, moderate weight headings

**Tone of Voice**:
- Friendly but professional
- Reassuring and supportive
- "You can do this" energy
- Avoids jargon, explains simply

**Headlines Style**:
- Clear value propositions
- "Learn New Skills with Course Tutor"
- Focus on possibility and growth

**Sales Approach**:
- Low pressure, value-first
- Emphasize free signup
- Show variety (multiple categories)
- Social proof through diverse testimonials
- No urgency tactics

**Testimonial Type**:
- Varied career outcomes
- Mix of career changers and skill builders
- "Helped me land my first dev job" (genuine, not boastful)

**CTA Style**:
- Primary: "Start Learning Free" (blue, prominent)
- Secondary: "Browse Courses" (outline, low commitment)

**Layout Flow**:
Hero (centered) → Split intro → 4-col categories → Horizontal steps → Single testimonial → Stats → Asymmetric split → CTA

---

### V1 - HomePageV1.tsx (Students)

**Target Persona**: College students supplementing education
- Age: 18-24
- Motivation: Get ahead, learn practical skills, build portfolio
- Pain point: Theoretical education lacks real-world application
- Tech comfort: High, digital native

**Design Style**:
- **Aesthetic**: Energetic, youthful, aspirational
- **Color palette**: Indigo primary, purple accents, violet gradients
- **Shadows**: Elevated & colored (`shadow-xl shadow-indigo-500/15`)
- **Border radius**: Slightly larger (12-16px)
- **Typography**: Bold headings, modern feel

**Tone of Voice**:
- Casual, peer-like
- Motivating without being preachy
- "Level up" mentality
- Speaks to ambition

**Headlines Style**:
- Action-oriented, dynamic
- "Level Up Your Skills"
- Speaks to future potential

**Sales Approach**:
- Highlight practical skills (portfolio building)
- Emphasize flexibility (learn around class schedule)
- Career prep angle (internship-ready)
- Free tier prominent
- No discount tactics

**Testimonial Type**:
- Student success stories
- Internship/first job outcomes
- "Got my internship at Google after completing the JS track"
- Relatable, recent graduates

**CTA Style**:
- Primary: "Start Building Today" (indigo, energetic)
- Secondary: "Explore Free Courses" (outline)

**Layout Flow**:
Split hero → Icon row → Centered text → 3-col courses → Vertical timeline → 2-col testimonials → Banner → CTA

---

### V2 - HomePageV2.tsx (Professionals)

**Target Persona**: Working professionals keeping skills current
- Age: 30-50
- Motivation: Stay relevant, get promoted, switch roles
- Pain point: Limited time, needs efficient learning
- Tech comfort: High, values quality over flash

**Design Style**:
- **Aesthetic**: Professional, understated, efficient
- **Color palette**: Slate primary, minimal accent colors, clean whites
- **Shadows**: Minimal (`shadow-sm` or borders only)
- **Border radius**: Conservative (6-8px)
- **Typography**: Clean, professional, weights vary for hierarchy

**Tone of Voice**:
- Direct, no-nonsense
- Respects intelligence
- Results-oriented
- "Efficient learning for busy professionals"

**Headlines Style**:
- Benefit-focused, concise
- "Advance Your Career"
- No fluff, straight to value

**Sales Approach**:
- Emphasize time efficiency
- Quality of instruction (expert instructors)
- Career advancement focus
- ROI-oriented (skills that matter)
- No gimmicks

**Testimonial Type**:
- Mid-career success
- Promotions, role changes
- "Got promoted to Senior after completing data science track"
- Credible, professional tone

**CTA Style**:
- Primary: "Get Started" (slate-900, professional)
- Secondary: "View Courses" (minimal outline)

**Layout Flow**:
Hero mosaic → Stats bar → Centered intro → Asymmetric features → Numbered steps → Single testimonial → Image split → CTA

---

### V3 - HomePageV3.tsx (Tech Learners)

**Target Persona**: Developers and aspiring programmers
- Age: 22-40
- Motivation: Master new technologies, build projects
- Pain point: Hard to find quality, up-to-date tech content
- Tech comfort: Very high, knows what they want

**Design Style**:
- **Aesthetic**: Tech-forward, clean, code-inspired
- **Color palette**: Emerald/cyan primary, dark code blocks, terminal aesthetic
- **Shadows**: Sharp with glow (`shadow-lg shadow-emerald-500/10`)
- **Border radius**: Sharper (4-8px for tech feel)
- **Typography**: Monospace accents, technical feel

**Tone of Voice**:
- Technical, direct
- Developer-to-developer
- Assumes some baseline knowledge
- "Build real things"

**Headlines Style**:
- Technical, specific
- "Master Modern Web Development"
- Technology-focused

**Sales Approach**:
- Lead with curriculum quality
- Show actual code/project examples
- Highlight up-to-date content
- Community/support angle
- No marketing speak

**Testimonial Type**:
- Technical achievements
- Project/portfolio success
- "Shipped my first SaaS after completing the full-stack track"
- Developer-focused outcomes

**CTA Style**:
- Primary: "Start Coding" (emerald, developer-friendly)
- Secondary: "View Curriculum" (outline)

**Layout Flow**:
Hero with code terminal → Border intro → 2x2 topics → Code preview split → Icon row → Quote → Image with stats → CTA

---

### V4 - HomePageV4.tsx (Creative Hobbyists)

**Target Persona**: People learning for fun and personal enrichment
- Age: 25-55
- Motivation: New hobby, creative outlet, personal projects
- Pain point: Want enjoyable learning, not boring courses
- Tech comfort: Moderate, values ease of use

**Design Style**:
- **Aesthetic**: Playful, colorful, inviting
- **Color palette**: Violet/pink/orange gradients, warm and fun
- **Shadows**: Colored & layered (`shadow-xl shadow-violet-500/20`)
- **Border radius**: Generous (12-20px)
- **Typography**: Friendly, rounded feel

**Tone of Voice**:
- Warm, encouraging
- "Learning should be fun"
- No pressure, no deadlines
- Celebrates curiosity

**Headlines Style**:
- Inviting, curiosity-driven
- "Discover Your Next Passion"
- Joy of learning focus

**Sales Approach**:
- Emphasize enjoyment, not outcomes
- Variety of topics (crafts, design, music, etc.)
- No career pressure
- "Learn at your own pace"
- Community and creativity angle

**Testimonial Type**:
- Personal achievement stories
- Hobby success
- "Finally built the app I always dreamed of - just for fun!"
- Joy and satisfaction focus

**CTA Style**:
- Primary: "Start Exploring" (gradient, playful)
- Secondary: "See What's New" (outline)

**Layout Flow**:
Centered hero with floating elements → Icon strip → Large image overlay → 3-col cards → Alternating testimonials → Colorful banner → 3-step how it works → CTA

---

### V5 - HomePageV5.tsx (Design-Conscious)

**Target Persona**: Design-focused users who appreciate aesthetics
- Age: 25-40
- Motivation: Quality learning experience, beautiful tools
- Pain point: Most learning platforms are ugly or cluttered
- Tech comfort: High, discerning taste

**Design Style**:
- **Aesthetic**: Minimal, sophisticated, elegant
- **Color palette**: Slate/white, very restrained accents
- **Shadows**: Almost none (`shadow-sm` max, rely on borders)
- **Border radius**: Clean (8px, consistent)
- **Typography**: Elegant, lots of whitespace, refined weights

**Tone of Voice**:
- Understated, confident
- Quality over quantity
- "Less is more"
- Lets the product speak

**Headlines Style**:
- Minimalist, impactful
- "Learn skills that matter to you."
- Short, purposeful

**Sales Approach**:
- Lead with quality/curation
- Emphasize design and UX of courses
- Less is more (fewer, better courses)
- Visual elegance as selling point
- Absolutely no pressure tactics

**Testimonial Type**:
- Design/creative success
- Taste-level references
- "The course quality is unmatched - finally a platform that respects my time"
- Sophisticated, brief

**CTA Style**:
- Primary: "Get Started" (slate-900 on white, elegant)
- Secondary: "Browse" (minimal text link)

**Layout Flow**:
Minimal hero with image → Simple text intro → Asymmetric grid → Full-width dark quote → Reversed 2-col → Inline steps → Stats row → Minimal CTA

---

### How to Use These Persona Briefs

When working on a page variant:

1. **Read the full persona brief** for that page
2. **Match design decisions** to the persona's expectations
3. **Write copy** in the specified tone of voice
4. **Choose shadows, colors, and spacing** that align with the design style
5. **Craft testimonials** that resonate with the target persona
6. **Design CTAs** that feel appropriate for that audience
7. **Follow the layout flow** specified for visual rhythm

**Cross-Reference**: Each page's source file includes a header comment summarizing the persona and layout. The full details are in this brief.

## Solar Flare Effects

### What Are Solar Flares?
Solar flares are bright gradient orbs or light effects that create a sense of depth, energy, and modernity. They work especially well for hero sections and add visual interest without being distracting.

### Implementation Techniques

**CSS Gradient Orbs**:
```jsx
{/* Solar flare - position absolutely behind content */}
<div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-[100px]" />
<div className="absolute bottom-10 right-1/4 w-72 h-72 bg-purple-200/20 rounded-full blur-[80px]" />
```

**Multiple Flares for Depth**:
```jsx
{/* Layered solar flares */}
<div className="absolute top-0 -left-20 w-[600px] h-[600px] bg-gradient-radial from-blue-300/20 to-transparent rounded-full blur-3xl" />
<div className="absolute top-40 right-0 w-[400px] h-[400px] bg-gradient-radial from-purple-300/15 to-transparent rounded-full blur-2xl" />
<div className="absolute bottom-20 left-1/3 w-[300px] h-[300px] bg-gradient-radial from-pink-200/10 to-transparent rounded-full blur-xl" />
```

**Animated Solar Flares** (subtle):
```jsx
<motion.div
  className="absolute top-10 right-1/4 w-80 h-80 bg-indigo-200/25 rounded-full blur-[100px]"
  animate={{
    scale: [1, 1.1, 1],
    opacity: [0.2, 0.3, 0.2],
  }}
  transition={{
    duration: 8,
    repeat: Infinity,
    ease: "easeInOut" as const,
  }}
/>
```

### When to Use Solar Flares

**Good Use Cases**:
- Hero sections (adds energy and depth)
- CTA sections (draws attention)
- Behind floating cards (creates visual layering)
- Section transitions (soft color bleeding)

**Avoid**:
- Content-heavy sections (too distracting)
- More than 2-3 flares per section
- Overly saturated colors (keep opacity low)
- Pages with minimal/professional aesthetic (like V2, V5)

### Solar Flare Colors by Page Variant

| Page | Primary Flare | Secondary Flare |
|------|--------------|-----------------|
| V0 | `bg-blue-200/30` | `bg-purple-200/20` |
| V1 | `bg-indigo-200/25` | `bg-violet-200/20` |
| V2 | None (minimal) | None |
| V3 | `bg-emerald-200/20` | `bg-cyan-200/15` |
| V4 | `bg-violet-200/30` | `bg-pink-200/25` |
| V5 | None (minimal) | None |

## Texture Backgrounds

### Beyond Plain Backgrounds
Don't limit sections to solid colors. Add subtle textures to create visual interest and depth.

### Unsplash Texture Sources

**Recommended Searches**:
- "abstract texture" - soft, organic patterns
- "paper texture white" - subtle paper grain
- "gradient abstract" - colorful soft gradients
- "geometric pattern subtle" - light geometric patterns
- "noise texture" - grainy overlays
- "marble texture light" - elegant stone patterns
- "watercolor background" - soft artistic feel

**Specific Texture URLs**:
```jsx
// Light paper/grain texture
"https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1920&q=80"

// Soft gradient abstract
"https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1920&q=80"

// Minimal geometric
"https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&q=80"

// Soft waves/flow
"https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=1920&q=80"
```

### Implementation Examples

**Subtle Texture Overlay**:
```jsx
<section className="relative py-20">
  {/* Texture background - very low opacity */}
  <div
    className="absolute inset-0 bg-cover bg-center opacity-[0.03]"
    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1920&q=80)' }}
  />
  {/* Gradient overlay to blend */}
  <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-white" />
  <div className="relative z-10">
    {/* Content */}
  </div>
</section>
```

**Gradient with Texture**:
```jsx
<section className="relative py-20 bg-gradient-to-br from-blue-50 to-purple-50">
  {/* Add texture on top of gradient */}
  <div
    className="absolute inset-0 bg-cover bg-center opacity-[0.05] mix-blend-overlay"
    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&q=80)' }}
  />
  <div className="relative z-10">...</div>
</section>
```

**CSS-Only Noise Texture** (no image needed):
```jsx
<section className="relative py-20 bg-slate-50">
  {/* Noise overlay using CSS */}
  <div
    className="absolute inset-0 opacity-[0.15]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
    }}
  />
  <div className="relative z-10">...</div>
</section>
```

### Texture Intensity Guidelines

| Opacity | Effect | Use Case |
|---------|--------|----------|
| `opacity-[0.02]` | Barely visible | Professional/minimal pages |
| `opacity-[0.05]` | Subtle texture | Most sections |
| `opacity-[0.10]` | Noticeable | Hero sections, CTAs |
| `opacity-[0.15]` | Prominent | Creative/playful pages |

### Texture by Page Variant

| Page | Texture Style | Intensity |
|------|--------------|-----------|
| V0 | Soft gradient abstract | `opacity-[0.05]` |
| V1 | Light geometric | `opacity-[0.07]` |
| V2 | Paper grain or none | `opacity-[0.03]` |
| V3 | Subtle code/tech pattern | `opacity-[0.05]` |
| V4 | Watercolor/artistic | `opacity-[0.10]` |
| V5 | None or minimal paper | `opacity-[0.02]` |

### Combining Textures with Other Effects

**Texture + Solar Flare**:
```jsx
<section className="relative py-24">
  {/* Base texture */}
  <div className="absolute inset-0 bg-cover bg-center opacity-[0.04]" style={{...}} />
  {/* Gradient blend */}
  <div className="absolute inset-0 bg-gradient-to-b from-blue-50/90 to-white" />
  {/* Solar flare on top */}
  <div className="absolute top-10 right-1/4 w-80 h-80 bg-blue-200/25 rounded-full blur-[100px]" />
  {/* Content */}
  <div className="relative z-10">...</div>
</section>
```

### When NOT to Use Textures
- Don't use textures that compete with content
- Avoid high-contrast textures (keep them subtle)
- Don't use multiple different textures in one section
- Skip textures on text-heavy sections where readability matters
