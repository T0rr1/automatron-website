import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Search, ArrowLeft, Mail } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found | Automatron',
  description: 'The page you are looking for could not be found. Explore our automation services or contact us for help.',
  robots: 'noindex, nofollow',
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted/20">
      <Card className="w-full max-w-lg text-center">
        <CardHeader className="pb-4">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Search className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold">404</CardTitle>
          <CardDescription className="text-lg">
            Page Not Found
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p className="text-muted-foreground">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <p className="text-sm text-muted-foreground">
              But don't worry! Our automation services are still here to help you save 2-5 hours per week.
            </p>
          </div>

          <div className="grid gap-3">
            <Button asChild className="w-full">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Go to Homepage
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full">
              <Link href="/services">
                <Search className="mr-2 h-4 w-4" />
                Browse Services
              </Link>
            </Button>
            
            <Button asChild variant="ghost" className="w-full">
              <Link href="/contact">
                <Mail className="mr-2 h-4 w-4" />
                Contact Support
              </Link>
            </Button>
          </div>

          <div className="pt-4 border-t">
            <h3 className="font-semibold mb-3">Popular Services</h3>
            <div className="grid gap-2 text-sm">
              <Link 
                href="/services" 
                className="text-primary hover:underline"
              >
                Basic Scripting & Automation
              </Link>
              <Link 
                href="/services" 
                className="text-primary hover:underline"
              >
                Email & File Organization
              </Link>
              <Link 
                href="/services" 
                className="text-primary hover:underline"
              >
                Automated Reporting
              </Link>
            </div>
          </div>

          <div className="pt-4 text-xs text-muted-foreground">
            <p>
              Need immediate help? Email us at{' '}
              <a 
                href="mailto:hello@automatron.ai" 
                className="text-primary hover:underline"
              >
                hello@automatron.ai
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}