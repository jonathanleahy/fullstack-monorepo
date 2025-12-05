/**
 * HOME PAGE SELECTOR
 * Allows viewing all 5 homepage variants + the original
 * Navigate to /?variant=1 through /?variant=5 to see each design
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
              ← View All Variants
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
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">Homepage Variants</Badge>
          <h1 className="text-4xl font-bold mb-4">Choose Your Design</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Click on any variant to preview it full-screen. Each has a unique design philosophy,
            animation style, and messaging approach.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <CardTitle className="text-lg mt-2 group-hover:text-primary transition-colors">
                  {variant.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {variant.description}
                </p>
                <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  Preview →
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
            Example: <code className="bg-muted px-2 py-1 rounded">/?variant=5</code> for Dark/Modern theme
          </p>
        </div>
      </div>
    </div>
  );
}
