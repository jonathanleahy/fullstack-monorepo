/**
 * HOME PAGE SELECTOR
 * Allows viewing all 106 homepage variants + the original
 * Navigate to /?variant=1 through /?variant=105 to see each design
 * or use /?variant=0 for original, no param for selector view
 */
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, Badge } from '@repo/playbook/atoms';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/playbook/molecules';

// Import all variants
import { HomePage as HomePageOriginal } from './HomePage';
import { HomePageV1 } from './HomePageV1';
import { HomePageV2 } from './HomePageV2';
import { HomePageV3 } from './HomePageV3';
import { HomePageV4 } from './HomePageV4';
import { HomePageV5 } from './HomePageV5';
import { HomePageV6 } from './HomePageV6';
import { HomePageV7 } from './HomePageV7';
import { HomePageV8 } from './HomePageV8';
import { HomePageV9 } from './HomePageV9';
import { HomePageV10 } from './HomePageV10';
import { HomePageV11 } from './HomePageV11';
import { HomePageV12 } from './HomePageV12';
import { HomePageV13 } from './HomePageV13';
import { HomePageV14 } from './HomePageV14';
import { HomePageV15 } from './HomePageV15';
import { HomePageV16 } from './HomePageV16';
import { HomePageV17 } from './HomePageV17';
import { HomePageV18 } from './HomePageV18';
import { HomePageV19 } from './HomePageV19';
import { HomePageV20 } from './HomePageV20';
import { HomePageV21 } from './HomePageV21';
import { HomePageV22 } from './HomePageV22';
import { HomePageV23 } from './HomePageV23';
import { HomePageV24 } from './HomePageV24';
import { HomePageV25 } from './HomePageV25';
// Award-winning design inspired variants (V26-V35)
import { HomePageV26 } from './HomePageV26';
import { HomePageV27 } from './HomePageV27';
import { HomePageV28 } from './HomePageV28';
import { HomePageV29 } from './HomePageV29';
import { HomePageV30 } from './HomePageV30';
import { HomePageV31 } from './HomePageV31';
import { HomePageV32 } from './HomePageV32';
import { HomePageV33 } from './HomePageV33';
import { HomePageV34 } from './HomePageV34';
import { HomePageV35 } from './HomePageV35';
// Learning platform inspired variants (V36-V45)
import { HomePageV36 } from './HomePageV36';
import { HomePageV37 } from './HomePageV37';
import { HomePageV38 } from './HomePageV38';
import { HomePageV39 } from './HomePageV39';
import { HomePageV40 } from './HomePageV40';
import { HomePageV41 } from './HomePageV41';
import { HomePageV42 } from './HomePageV42';
import { HomePageV43 } from './HomePageV43';
import { HomePageV44 } from './HomePageV44';
import { HomePageV45 } from './HomePageV45';
// Industry/profession-specific variants (V46-V65)
import { HomePageV46 } from './HomePageV46';
import { HomePageV47 } from './HomePageV47';
import { HomePageV48 } from './HomePageV48';
import { HomePageV49 } from './HomePageV49';
import { HomePageV50 } from './HomePageV50';
import { HomePageV51 } from './HomePageV51';
import { HomePageV52 } from './HomePageV52';
import { HomePageV53 } from './HomePageV53';
import { HomePageV54 } from './HomePageV54';
import { HomePageV55 } from './HomePageV55';
import { HomePageV56 } from './HomePageV56';
import { HomePageV57 } from './HomePageV57';
import { HomePageV58 } from './HomePageV58';
import { HomePageV59 } from './HomePageV59';
import { HomePageV60 } from './HomePageV60';
import { HomePageV61 } from './HomePageV61';
import { HomePageV62 } from './HomePageV62';
import { HomePageV63 } from './HomePageV63';
import { HomePageV64 } from './HomePageV64';
import { HomePageV65 } from './HomePageV65';
// Creative theme variants (V66-V85)
import { HomePageV66 } from './HomePageV66';
import { HomePageV67 } from './HomePageV67';
import { HomePageV68 } from './HomePageV68';
import { HomePageV69 } from './HomePageV69';
import { HomePageV70 } from './HomePageV70';
import { HomePageV71 } from './HomePageV71';
import { HomePageV72 } from './HomePageV72';
import { HomePageV73 } from './HomePageV73';
import { HomePageV74 } from './HomePageV74';
import { HomePageV75 } from './HomePageV75';
import { HomePageV76 } from './HomePageV76';
import { HomePageV77 } from './HomePageV77';
import { HomePageV78 } from './HomePageV78';
import { HomePageV79 } from './HomePageV79';
import { HomePageV80 } from './HomePageV80';
import { HomePageV81 } from './HomePageV81';
import { HomePageV82 } from './HomePageV82';
import { HomePageV83 } from './HomePageV83';
import { HomePageV84 } from './HomePageV84';
import { HomePageV85 } from './HomePageV85';
// Radically varied designs (V86-V105)
import { HomePageV86 } from './HomePageV86';
import { HomePageV87 } from './HomePageV87';
import { HomePageV88 } from './HomePageV88';
import { HomePageV89 } from './HomePageV89';
import { HomePageV90 } from './HomePageV90';
import { HomePageV91 } from './HomePageV91';
import { HomePageV92 } from './HomePageV92';
import { HomePageV93 } from './HomePageV93';
import { HomePageV94 } from './HomePageV94';
import { HomePageV95 } from './HomePageV95';
import { HomePageV96 } from './HomePageV96';
import { HomePageV97 } from './HomePageV97';
import { HomePageV98 } from './HomePageV98';
import { HomePageV99 } from './HomePageV99';
import { HomePageV100 } from './HomePageV100';
import { HomePageV101 } from './HomePageV101';
import { HomePageV102 } from './HomePageV102';
import { HomePageV103 } from './HomePageV103';
import { HomePageV104 } from './HomePageV104';
import { HomePageV105 } from './HomePageV105';
// UI effect and layout variants (V106-V125)
import { HomePageV106 } from './HomePageV106';
import { HomePageV107 } from './HomePageV107';
import { HomePageV108 } from './HomePageV108';
import { HomePageV109 } from './HomePageV109';
import { HomePageV110 } from './HomePageV110';
import { HomePageV111 } from './HomePageV111';
import { HomePageV112 } from './HomePageV112';
import { HomePageV113 } from './HomePageV113';
import { HomePageV114 } from './HomePageV114';
import { HomePageV115 } from './HomePageV115';
import { HomePageV116 } from './HomePageV116';
import { HomePageV117 } from './HomePageV117';
import { HomePageV118 } from './HomePageV118';
import { HomePageV119 } from './HomePageV119';
import { HomePageV120 } from './HomePageV120';
import { HomePageV121 } from './HomePageV121';
import { HomePageV122 } from './HomePageV122';
import { HomePageV123 } from './HomePageV123';
import { HomePageV124 } from './HomePageV124';
import { HomePageV125 } from './HomePageV125';

const variants = [
  {
    id: 0,
    name: 'Original',
    description: 'Current homepage with Unsplash images and floating cards',
    style: 'Modern SaaS',
    Component: HomePageOriginal,
  },
  {
    id: 1,
    name: 'Minimal / Clean',
    description: 'Lots of whitespace, simple typography, subtle animations',
    style: 'Minimalist',
    Component: HomePageV1,
  },
  {
    id: 2,
    name: 'Bold / Vibrant',
    description: 'Strong gradients, large typography, energetic animations',
    style: 'Energetic',
    Component: HomePageV2,
  },
  {
    id: 3,
    name: 'Corporate / Professional',
    description: 'Clean grids, trust signals, enterprise-focused messaging',
    style: 'Enterprise',
    Component: HomePageV3,
  },
  {
    id: 4,
    name: 'Playful / Creative',
    description: 'Rounded shapes, fun emojis, bouncy animations, pastel colors',
    style: 'Fun & Friendly',
    Component: HomePageV4,
  },
  {
    id: 5,
    name: 'Dark / Modern',
    description: 'Dark theme, neon accents, sleek animations, tech aesthetic',
    style: 'Tech / Developer',
    Component: HomePageV5,
  },
  {
    id: 6,
    name: 'Glassmorphism',
    description: 'Frosted glass effects, blur backgrounds, depth layers',
    style: 'Glass UI',
    Component: HomePageV6,
  },
  {
    id: 7,
    name: 'Retro / Vintage',
    description: 'Sepia tones, typewriter fonts, nostalgic feel',
    style: 'Vintage',
    Component: HomePageV7,
  },
  {
    id: 8,
    name: 'Brutalist',
    description: 'Raw borders, high contrast, bold typography, anti-design',
    style: 'Brutalist',
    Component: HomePageV8,
  },
  {
    id: 9,
    name: 'Nature / Organic',
    description: 'Earth tones, organic shapes, natural imagery',
    style: 'Natural',
    Component: HomePageV9,
  },
  {
    id: 10,
    name: 'Newspaper / Editorial',
    description: 'Column layout, serif fonts, editorial style',
    style: 'Editorial',
    Component: HomePageV10,
  },
  {
    id: 11,
    name: 'Geometric / Abstract',
    description: 'Geometric shapes, abstract patterns, bold colors',
    style: 'Abstract',
    Component: HomePageV11,
  },
  {
    id: 12,
    name: 'Luxury / Premium',
    description: 'Gold accents, elegant typography, premium feel',
    style: 'Luxury',
    Component: HomePageV12,
  },
  {
    id: 13,
    name: 'Startup / Tech',
    description: 'Modern SaaS style, clean UI, tech-focused',
    style: 'Startup',
    Component: HomePageV13,
  },
  {
    id: 14,
    name: 'Warm / Cozy',
    description: 'Warm orange tones, friendly, inviting feel',
    style: 'Warm',
    Component: HomePageV14,
  },
  {
    id: 15,
    name: 'Futuristic / Sci-Fi',
    description: 'Neon colors, dark background, cyber aesthetic',
    style: 'Sci-Fi',
    Component: HomePageV15,
  },
  {
    id: 16,
    name: 'Scandinavian / Nordic',
    description: 'Clean lines, muted colors, functional beauty',
    style: 'Nordic',
    Component: HomePageV16,
  },
  {
    id: 17,
    name: 'Japanese / Zen',
    description: 'Asymmetric balance, whitespace, tranquil feel',
    style: 'Zen',
    Component: HomePageV17,
  },
  {
    id: 18,
    name: 'Swiss / International',
    description: 'Grid-based, red accents, typographic hierarchy',
    style: 'Swiss',
    Component: HomePageV18,
  },
  {
    id: 19,
    name: 'Bauhaus / Modernist',
    description: 'Primary colors, geometric shapes, form follows function',
    style: 'Bauhaus',
    Component: HomePageV19,
  },
  {
    id: 20,
    name: 'Split Screen',
    description: 'Two-tone layout, contrasting sections',
    style: 'Split',
    Component: HomePageV20,
  },
  {
    id: 21,
    name: 'Soft Gradient',
    description: 'Subtle color transitions, soft shadows, airy feel',
    style: 'Gradient',
    Component: HomePageV21,
  },
  {
    id: 22,
    name: 'Mono / Duotone',
    description: 'Single accent color, high contrast, focused design',
    style: 'Mono',
    Component: HomePageV22,
  },
  {
    id: 23,
    name: 'Architect / Blueprint',
    description: 'Technical precision, grid lines, structured layout',
    style: 'Blueprint',
    Component: HomePageV23,
  },
  {
    id: 24,
    name: 'Card-Based / Bento',
    description: 'Bento box layout, various card sizes, modern grid',
    style: 'Bento',
    Component: HomePageV24,
  },
  {
    id: 25,
    name: 'Elegant Serif',
    description: 'Serif typography, classic elegance, literary aesthetic',
    style: 'Serif',
    Component: HomePageV25,
  },
  // V26-V35: Award-winning design inspired
  {
    id: 26,
    name: 'Locomotive Studio',
    description: 'Bold typography, magnetic hover, text shimmer, dramatic reveals',
    style: 'Creative Agency',
    Component: HomePageV26,
  },
  {
    id: 27,
    name: 'Stripe/Linear',
    description: 'Animated gradient backgrounds, floating glass cards, border-flow',
    style: 'SaaS Premium',
    Component: HomePageV27,
  },
  {
    id: 28,
    name: 'Apple Style',
    description: 'Cinematic hero, Ken Burns effect, glow-pulse, scale animations',
    style: 'Cinematic',
    Component: HomePageV28,
  },
  {
    id: 29,
    name: 'Notion Style',
    description: 'Emoji icons, 3D shadows, gentle floats, productivity focus',
    style: 'Productivity',
    Component: HomePageV29,
  },
  {
    id: 30,
    name: 'Vercel/Next.js',
    description: 'Terminal aesthetics, typing cursor, shimmer effects, developer-focused',
    style: 'Developer',
    Component: HomePageV30,
  },
  {
    id: 31,
    name: 'Framer Style',
    description: 'Morphing blobs, vibrant gradients, card-float animations',
    style: 'Design Tool',
    Component: HomePageV31,
  },
  {
    id: 32,
    name: 'Raycast/Superhuman',
    description: 'Keyboard shortcuts UI, command palette, glow effects',
    style: 'Power User',
    Component: HomePageV32,
  },
  {
    id: 33,
    name: 'Dribbble/Behance',
    description: 'Gallery grid, like-pop animations, image zoom, creator focus',
    style: 'Portfolio',
    Component: HomePageV33,
  },
  {
    id: 34,
    name: 'GitHub Style',
    description: 'Contribution graph, code blocks, green accents, open source',
    style: 'Open Source',
    Component: HomePageV34,
  },
  {
    id: 35,
    name: 'Figma/Miro',
    description: 'Collaborative cursors, colorful avatars, pulse-ring, teamwork',
    style: 'Collaboration',
    Component: HomePageV35,
  },
  // V36-V45: Learning platform inspired
  {
    id: 36,
    name: 'Coursera Style',
    description: 'Academic blue, university partnerships, progress tracking',
    style: 'Academic',
    Component: HomePageV36,
  },
  {
    id: 37,
    name: 'Udemy Style',
    description: 'Marketplace cards, sale banners, price displays, flash animation',
    style: 'Marketplace',
    Component: HomePageV37,
  },
  {
    id: 38,
    name: 'Skillshare Style',
    description: 'Dark green theme, video previews, play-pulse animation',
    style: 'Creative Learning',
    Component: HomePageV38,
  },
  {
    id: 39,
    name: 'MasterClass Style',
    description: 'Cinematic, Ken Burns, gold accents, shimmer-gold text',
    style: 'Premium Learning',
    Component: HomePageV39,
  },
  {
    id: 40,
    name: 'Khan Academy',
    description: 'Colorful subjects, progress-grow bars, wave emoji, bounce-in',
    style: 'Free Education',
    Component: HomePageV40,
  },
  {
    id: 41,
    name: 'LinkedIn Learning',
    description: 'Professional blue, skill badges, career paths, certificates',
    style: 'Professional',
    Component: HomePageV41,
  },
  {
    id: 42,
    name: 'Duolingo Style',
    description: 'Gamified, bright colors, 3D buttons, streak fire animation',
    style: 'Gamified',
    Component: HomePageV42,
  },
  {
    id: 43,
    name: 'edX Style',
    description: 'Academic, university logos, credential focus, institutional',
    style: 'University',
    Component: HomePageV43,
  },
  {
    id: 44,
    name: 'Pluralsight Style',
    description: 'Tech skills, skill assessment UI, skill-grow animations',
    style: 'Tech Skills',
    Component: HomePageV44,
  },
  {
    id: 45,
    name: 'Codecademy Style',
    description: 'Code editor preview, typing animation, yellow/dark theme',
    style: 'Interactive Coding',
    Component: HomePageV45,
  },
  // V46-V65: Industry/profession-specific variants
  {
    id: 46,
    name: 'Healthcare Professionals',
    description: 'Clinical teal theme, CE credits focus, pulse animations',
    style: 'Healthcare',
    Component: HomePageV46,
  },
  {
    id: 47,
    name: 'Retirees & Lifelong Learners',
    description: 'Warm amber, accessible design, larger fonts, gentle animations',
    style: 'Senior-Friendly',
    Component: HomePageV47,
  },
  {
    id: 48,
    name: 'Government & Public Sector',
    description: 'Navy/gold, official aesthetic, compliance-focused',
    style: 'Government',
    Component: HomePageV48,
  },
  {
    id: 49,
    name: 'Musicians & Audio',
    description: 'Orange/coral, waveform animations, creative/dynamic',
    style: 'Music/Audio',
    Component: HomePageV49,
  },
  {
    id: 50,
    name: 'Environmental & Sustainability',
    description: 'Forest green, earth tones, growing plant animations',
    style: 'Eco/Green',
    Component: HomePageV50,
  },
  {
    id: 51,
    name: 'Finance & Accounting',
    description: 'Deep blue/gold, chart animations, CPA/CFA focus',
    style: 'Finance',
    Component: HomePageV51,
  },
  {
    id: 52,
    name: 'Teachers & Educators',
    description: 'Apple red, chalkboard green, classroom-inspired',
    style: 'Education',
    Component: HomePageV52,
  },
  {
    id: 53,
    name: 'Real Estate Professionals',
    description: 'Teal/gold, property card animations, luxurious',
    style: 'Real Estate',
    Component: HomePageV53,
  },
  {
    id: 54,
    name: 'Writers & Content Creators',
    description: 'Typewriter aesthetic, cream/black, literary feel',
    style: 'Writing',
    Component: HomePageV54,
  },
  {
    id: 55,
    name: 'Food & Culinary',
    description: 'Terracotta/herb green, steam animations, appetizing',
    style: 'Culinary',
    Component: HomePageV55,
  },
  {
    id: 56,
    name: 'Legal Professionals',
    description: 'Burgundy/navy, scales of justice, CLE-focused',
    style: 'Legal',
    Component: HomePageV56,
  },
  {
    id: 57,
    name: 'Sports & Athletics',
    description: 'Dynamic blue/orange, trophy animations, energetic',
    style: 'Sports',
    Component: HomePageV57,
  },
  {
    id: 58,
    name: 'Architecture & Design',
    description: 'Blueprint blue/gray, line-drawing animations, structural',
    style: 'Architecture',
    Component: HomePageV58,
  },
  {
    id: 59,
    name: 'Hospitality & Tourism',
    description: 'Ocean blue/coral, passport stamp animations, welcoming',
    style: 'Hospitality',
    Component: HomePageV59,
  },
  {
    id: 60,
    name: 'Veterinary & Animal Care',
    description: 'Soft teal/brown, paw print animations, caring',
    style: 'Veterinary',
    Component: HomePageV60,
  },
  {
    id: 61,
    name: 'Manufacturing & Industrial',
    description: 'Safety orange/gray, hard hat animations, practical',
    style: 'Industrial',
    Component: HomePageV61,
  },
  {
    id: 62,
    name: 'HR & People Operations',
    description: 'People blue/coral, org chart animations, human-centered',
    style: 'HR',
    Component: HomePageV62,
  },
  {
    id: 63,
    name: 'Nonprofit & Social Impact',
    description: 'Hopeful blue/orange, rising sun animations, mission-driven',
    style: 'Nonprofit',
    Component: HomePageV63,
  },
  {
    id: 64,
    name: 'Aviation & Aerospace',
    description: 'Sky blue/silver, airplane animations, precision',
    style: 'Aviation',
    Component: HomePageV64,
  },
  {
    id: 65,
    name: 'Cybersecurity',
    description: 'Matrix green/navy (light theme), terminal animations, technical',
    style: 'Security',
    Component: HomePageV65,
  },
  // V66-V85: Creative theme variants
  {
    id: 66,
    name: 'Magazine Editorial',
    description: 'Large hero typography, article grid, pullquotes, multi-column text',
    style: 'Editorial',
    Component: HomePageV66,
  },
  {
    id: 67,
    name: 'Retro 90s Web',
    description: 'Bright colors, chunky borders, playful fonts, nostalgic elements',
    style: 'Retro',
    Component: HomePageV67,
  },
  {
    id: 68,
    name: 'Luxury Brand',
    description: 'Elegant serifs, generous whitespace, muted gold accents, sophisticated',
    style: 'Luxury',
    Component: HomePageV68,
  },
  {
    id: 69,
    name: 'Travel Booking',
    description: 'Destination cards, search-focused hero, rating badges, map elements',
    style: 'Travel',
    Component: HomePageV69,
  },
  {
    id: 70,
    name: 'Food/Recipe',
    description: 'Warm colors, ingredient cards, cooking timer UI, recipe-style layout',
    style: 'Culinary',
    Component: HomePageV70,
  },
  {
    id: 71,
    name: 'Podcast/Audio',
    description: 'Waveform visualizations, episode cards, play buttons, audio player UI',
    style: 'Audio',
    Component: HomePageV71,
  },
  {
    id: 72,
    name: 'Gaming',
    description: 'Score displays, achievement badges, level progression, controller icons',
    style: 'Gaming',
    Component: HomePageV72,
  },
  {
    id: 73,
    name: 'Photography',
    description: 'Gallery grid, lightbox style, camera aperture icons, visual focus',
    style: 'Photography',
    Component: HomePageV73,
  },
  {
    id: 74,
    name: 'Startup Pitch',
    description: 'Problem/solution sections, investor metrics, team photos, roadmap',
    style: 'Startup',
    Component: HomePageV74,
  },
  {
    id: 75,
    name: 'Minimalist Zen',
    description: 'Extreme whitespace, single accent color, meditative, calm',
    style: 'Zen',
    Component: HomePageV75,
  },
  {
    id: 76,
    name: 'Social Media Feed',
    description: 'Card-based feed, like/share buttons, user avatars, stories carousel',
    style: 'Social',
    Component: HomePageV76,
  },
  {
    id: 77,
    name: 'News Portal',
    description: 'Breaking news banner, category tabs, trending sidebar, journalist bylines',
    style: 'News',
    Component: HomePageV77,
  },
  {
    id: 78,
    name: 'Marketplace',
    description: 'Product cards, price tags, shopping cart icon, filter sidebar',
    style: 'E-commerce',
    Component: HomePageV78,
  },
  {
    id: 79,
    name: 'Dashboard Analytics',
    description: 'Charts, metrics cards, data visualizations, KPI widgets',
    style: 'Analytics',
    Component: HomePageV79,
  },
  {
    id: 80,
    name: 'Portfolio Showcase',
    description: 'Project thumbnails, case study previews, client logos, skills grid',
    style: 'Portfolio',
    Component: HomePageV80,
  },
  {
    id: 81,
    name: 'Wellness/Spa',
    description: 'Soft pastels, nature imagery, calming gradients, rounded shapes',
    style: 'Wellness',
    Component: HomePageV81,
  },
  {
    id: 82,
    name: 'Architecture Firm',
    description: 'Blueprint elements, geometric precision, grid-based, technical',
    style: 'Architecture',
    Component: HomePageV82,
  },
  {
    id: 83,
    name: 'Music Streaming',
    description: 'Album art grids, equalizer animations, playlist cards, genre tags',
    style: 'Music',
    Component: HomePageV83,
  },
  {
    id: 84,
    name: 'Event Ticketing',
    description: 'Event cards, countdown timers, seat maps concept, venue info',
    style: 'Events',
    Component: HomePageV84,
  },
  {
    id: 85,
    name: 'Knowledge Base',
    description: 'Search-focused, FAQ accordion, category icons, help articles',
    style: 'Help Center',
    Component: HomePageV85,
  },
  // V86-V105: Radically varied designs
  {
    id: 86,
    name: 'Brutalist Newspaper',
    description: 'Black/white only, harsh borders, overlapping headlines, torn paper edges',
    style: 'Brutalist',
    Component: HomePageV86,
  },
  {
    id: 87,
    name: 'Organic Blob',
    description: 'Soft organic shapes, blob backgrounds, wavy borders, no straight lines',
    style: 'Organic',
    Component: HomePageV87,
  },
  {
    id: 88,
    name: 'Terminal/Hacker',
    description: 'Command prompts, blinking cursors, ASCII borders, monospace everything',
    style: 'Terminal',
    Component: HomePageV88,
  },
  {
    id: 89,
    name: 'Split Diagonal',
    description: 'Page divided diagonally, contrasting sections, skewed containers',
    style: 'Diagonal',
    Component: HomePageV89,
  },
  {
    id: 90,
    name: 'Circular/Radial',
    description: 'Everything radiates from center, circular layouts, orbital animations',
    style: 'Radial',
    Component: HomePageV90,
  },
  {
    id: 91,
    name: 'Stacked Cards/Deck',
    description: 'Cards stacked like a deck, pull-to-reveal, 3D perspective depth',
    style: 'Card Deck',
    Component: HomePageV91,
  },
  {
    id: 92,
    name: 'Wireframe/Blueprint',
    description: 'Technical drawing style, dotted lines, dimension markers, construction feel',
    style: 'Blueprint',
    Component: HomePageV92,
  },
  {
    id: 93,
    name: 'Collage/Scrapbook',
    description: 'Overlapping photos, tape effects, handwritten fonts, sticky notes',
    style: 'Scrapbook',
    Component: HomePageV93,
  },
  {
    id: 94,
    name: 'Metro/Tiles',
    description: 'Windows Metro style, large colorful tiles, flat design, live tiles feel',
    style: 'Metro',
    Component: HomePageV94,
  },
  {
    id: 95,
    name: 'Parallax Layers',
    description: 'Multiple depth layers, elements at different speeds, 3D depth effect',
    style: 'Parallax',
    Component: HomePageV95,
  },
  {
    id: 96,
    name: 'Horizontal Scroll',
    description: 'Main content scrolls horizontally, filmstrip/timeline style',
    style: 'Horizontal',
    Component: HomePageV96,
  },
  {
    id: 97,
    name: 'Asymmetric Grid',
    description: 'Dramatic size contrasts, one huge element + many small, golden ratio',
    style: 'Asymmetric',
    Component: HomePageV97,
  },
  {
    id: 98,
    name: 'Outline Only',
    description: 'Everything is outlines/strokes, no fills, line art aesthetic',
    style: 'Line Art',
    Component: HomePageV98,
  },
  {
    id: 99,
    name: 'Neon/Glow',
    description: 'Bright neon colors on light gray, glowing effects, electric feel',
    style: 'Neon',
    Component: HomePageV99,
  },
  {
    id: 100,
    name: 'Kinetic Typography',
    description: 'Text as main visual, animated words, morphing/bouncing letters',
    style: 'Kinetic',
    Component: HomePageV100,
  },
  {
    id: 101,
    name: 'Isometric 3D',
    description: 'Isometric illustrations, 3D-looking flat design, cubes and platforms',
    style: 'Isometric',
    Component: HomePageV101,
  },
  {
    id: 102,
    name: 'Minimalist Japanese',
    description: 'Extreme whitespace, single accent, zen-like, haiku-brief text',
    style: 'Zen',
    Component: HomePageV102,
  },
  {
    id: 103,
    name: 'Retro Computer',
    description: 'Old school OS feel (Win95/Mac Classic), window chrome, pixel-ish',
    style: 'Retro OS',
    Component: HomePageV103,
  },
  {
    id: 104,
    name: 'Magazine Spread',
    description: 'Two-column spread, editorial layout, pull quotes, drop caps',
    style: 'Editorial',
    Component: HomePageV104,
  },
  {
    id: 105,
    name: 'Dashboard Widgets',
    description: 'Widget-based layout, draggable-looking cards, status indicators',
    style: 'Widgets',
    Component: HomePageV105,
  },
  {
    id: 106,
    name: 'Glassmorphism',
    description: 'Frosted glass cards with blur effects, soft gradients, transparent overlays',
    style: 'Glass',
    Component: HomePageV106,
  },
  {
    id: 107,
    name: 'Neumorphism',
    description: 'Soft shadows, embossed UI elements, monochromatic scheme',
    style: 'Neu',
    Component: HomePageV107,
  },
  {
    id: 108,
    name: 'Split Screen',
    description: 'Left/right split with contrasting colors, asymmetric division',
    style: 'Split',
    Component: HomePageV108,
  },
  {
    id: 109,
    name: 'Scrolling Cards Stack',
    description: 'Cards that stack and unstack on scroll, z-index animations',
    style: 'Stack',
    Component: HomePageV109,
  },
  {
    id: 110,
    name: 'Gradient Mesh',
    description: 'Animated mesh gradient backgrounds, flowing organic colors',
    style: 'Mesh',
    Component: HomePageV110,
  },
  {
    id: 111,
    name: 'Geometric Shapes',
    description: 'Bold geometric shapes as backgrounds, triangles, hexagons, circles',
    style: 'Geometric',
    Component: HomePageV111,
  },
  {
    id: 112,
    name: 'Layered Paper',
    description: 'Paper-like layers with shadows, torn edges, stacked sheets',
    style: 'Paper',
    Component: HomePageV112,
  },
  {
    id: 113,
    name: 'Timeline Journey',
    description: 'Vertical timeline showing learning journey, connected nodes',
    style: 'Timeline',
    Component: HomePageV113,
  },
  {
    id: 114,
    name: 'Magazine Grid',
    description: 'Editorial grid layout, mixed image sizes, pull quotes',
    style: 'Magazine',
    Component: HomePageV114,
  },
  {
    id: 115,
    name: 'Floating Islands',
    description: 'Content islands floating with shadows, disconnected sections',
    style: 'Islands',
    Component: HomePageV115,
  },
  {
    id: 116,
    name: 'Duotone',
    description: 'Two-color palette throughout, high contrast color blocking',
    style: 'Duotone',
    Component: HomePageV116,
  },
  {
    id: 117,
    name: 'Text-Heavy Typography',
    description: 'Large typography as main element, text as art, minimal imagery',
    style: 'Typo',
    Component: HomePageV117,
  },
  {
    id: 118,
    name: 'Overlapping Sections',
    description: 'Sections that overlap each other, negative margins, layered blocks',
    style: 'Overlap',
    Component: HomePageV118,
  },
  {
    id: 119,
    name: 'Sidebar Navigation',
    description: 'Persistent sidebar with navigation, app-like layout',
    style: 'Sidebar',
    Component: HomePageV119,
  },
  {
    id: 120,
    name: 'Bottom Sheet',
    description: 'Mobile-inspired bottom sheets, pull-up panels, card stack',
    style: 'Sheet',
    Component: HomePageV120,
  },
  {
    id: 121,
    name: 'Scroll-Triggered Reveal',
    description: 'Elements reveal as you scroll, fade in animations, staggered appearance',
    style: 'Reveal',
    Component: HomePageV121,
  },
  {
    id: 122,
    name: 'Tabbed Content',
    description: 'Tab-based navigation, content panels that switch, interactive tabs',
    style: 'Tabs',
    Component: HomePageV122,
  },
  {
    id: 123,
    name: 'Accordion Layout',
    description: 'Expandable sections, collapsed content, space-efficient design',
    style: 'Accordion',
    Component: HomePageV123,
  },
  {
    id: 124,
    name: 'Carousel Hero',
    description: 'Main slider/carousel in hero section, dots navigation, auto-play',
    style: 'Carousel',
    Component: HomePageV124,
  },
  {
    id: 125,
    name: 'Search-Focused',
    description: 'Search bar prominent, filter options visible, discovery-oriented',
    style: 'Search',
    Component: HomePageV125,
  },
];

export function HomePageSelector() {
  const [searchParams, setSearchParams] = useSearchParams();
  const variantParam = searchParams.get('variant');
  const [selectedVariant, setSelectedVariant] = useState<number | null>(
    variantParam !== null ? parseInt(variantParam) : null
  );

  useEffect(() => {
    if (variantParam !== null) {
      setSelectedVariant(parseInt(variantParam));
    } else {
      setSelectedVariant(null);
    }
  }, [variantParam]);

  // If a variant is selected, render it
  if (selectedVariant !== null) {
    const variant = variants.find(v => v.id === selectedVariant);
    if (variant) {
      return (
        <div className="relative">
          {/* Floating selector button */}
          <div className="fixed bottom-6 right-6 z-50 flex gap-2">
            <Button
              onClick={() => setSearchParams({})}
              variant="outline"
              className="shadow-lg bg-background"
            >
              View All Variants
            </Button>
            <Badge className="bg-primary text-primary-foreground px-4 py-2 shadow-lg">
              V{variant.id}: {variant.name}
            </Badge>
          </div>
          <variant.Component />
        </div>
      );
    }
  }

  // Otherwise show selector
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">126 Homepage Variants</Badge>
          <h1 className="text-4xl font-bold mb-4">Choose Your Design</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Click on any variant to preview it full-screen. Each has a unique design philosophy,
            animation style, and messaging approach.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {variants.map((variant) => (
            <Card
              key={variant.id}
              className="cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 group overflow-hidden"
              onClick={() => setSearchParams({ variant: variant.id.toString() })}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    V{variant.id}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {variant.style}
                  </Badge>
                </div>
                <CardTitle className="text-base mt-2 group-hover:text-primary transition-colors">
                  {variant.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-3">
                  {variant.description}
                </p>
                <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  Preview
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            Add <code className="bg-muted px-2 py-1 rounded">?variant=N</code> to the URL to directly access a variant
          </p>
          <p className="mt-2">
            Example: <code className="bg-muted px-2 py-1 rounded">/?variant=21</code> for Soft Gradient theme
          </p>
        </div>
      </div>
    </div>
  );
}
