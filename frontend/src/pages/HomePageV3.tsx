/**
 * VARIANT 3: CORPORATE / PROFESSIONAL
 * - Clean grid layouts
 * - Trust signals prominent
 * - Enterprise-focused messaging
 * - Subtle animations
 * - Logo cloud / social proof
 */
import { Link } from 'react-router-dom';
import { Button, Badge } from '@repo/playbook/atoms';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/playbook/molecules';
import { useAuth } from '../hooks/useAuth';

const logos = [
  'Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Netflix'
];

const benefits = [
  {
    title: 'For Individuals',
    points: ['Self-paced learning', 'Industry certifications', 'Career guidance', 'Lifetime access'],
  },
  {
    title: 'For Teams',
    points: ['Team management', 'Progress analytics', 'Custom learning paths', 'Priority support'],
  },
  {
    title: 'For Enterprise',
    points: ['SSO integration', 'API access', 'Dedicated manager', 'Custom content'],
  },
];

export function HomePageV3() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero - Professional */}
      <section className="pt-20 pb-32 px-4 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-background">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6">
              Trusted by Fortune 500 companies
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6">
              Professional Development
              <span className="block text-primary">For Modern Teams</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Upskill your workforce with comprehensive training programs designed for today's competitive landscape.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button size="lg" className="px-8">Access Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <Button size="lg" className="px-8">Start Free Trial</Button>
                  </Link>
                  <Link to="/courses">
                    <Button variant="outline" size="lg" className="px-8">View Solutions</Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Logo cloud */}
          <div className="mt-20">
            <p className="text-center text-sm text-muted-foreground mb-8">
              Trusted by leading organizations worldwide
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
              {logos.map((logo, i) => (
                <div
                  key={i}
                  className="text-xl md:text-2xl font-bold text-muted-foreground/50 hover:text-muted-foreground transition-colors"
                >
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '10M+', label: 'Courses Completed' },
              { value: '500+', label: 'Enterprise Clients' },
              { value: '99.9%', label: 'Uptime SLA' },
              { value: '24/7', label: 'Support' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl md:text-4xl font-bold">{stat.value}</div>
                <div className="text-sm opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hero image */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1400&h=600&fit=crop"
              alt="Professional team learning"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent flex items-center">
              <div className="p-8 md:p-16 max-w-lg text-white">
                <h3 className="text-2xl md:text-3xl font-semibold mb-4">
                  Built for scale
                </h3>
                <p className="text-white/90">
                  From startups to enterprises, our platform grows with your organization's needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits grid */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Solutions for Every Need
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Whether you're an individual learner or a global enterprise, we have the right plan for you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => (
              <Card key={i} className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <CardTitle>{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {benefit.points.map((point, j) => (
                      <li key={j} className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-muted-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full mt-6">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8 md:p-12">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-xl md:text-2xl mb-8">
                "Course Tutor has become an essential part of our L&D strategy. The ROI has been exceptional,
                with employee satisfaction scores increasing by 40% since implementation."
              </blockquote>
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face"
                  alt=""
                  className="w-14 h-14 rounded-full"
                />
                <div>
                  <div className="font-semibold">Robert Chen</div>
                  <div className="text-sm text-muted-foreground">VP of Learning & Development, Acme Corp</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-slate-900 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Ready to get started?
          </h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Schedule a demo with our team to see how Course Tutor can transform your organization.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to={isAuthenticated ? "/courses" : "/register"}>
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 px-8">
                {isAuthenticated ? "Browse Courses" : "Start Free Trial"}
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800 px-8">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-950 text-slate-400">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="font-bold text-white mb-4">Course Tutor</div>
              <p className="text-sm">Enterprise learning solutions for the modern workplace.</p>
            </div>
            <div>
              <div className="font-semibold text-white mb-4">Product</div>
              <ul className="space-y-2 text-sm">
                <li><Link to="/courses" className="hover:text-white">Courses</Link></li>
                <li><a href="#" className="hover:text-white">Enterprise</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white mb-4">Resources</div>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white mb-4">Legal</div>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800 text-sm text-center">
            © 2024 Course Tutor. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
