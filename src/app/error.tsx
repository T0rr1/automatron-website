'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, RefreshCw, Home, Mail, ArrowLeft } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to Sentry
    const errorId = Sentry.captureException(error, {
      tags: {
        section: 'global_error_boundary',
      },
      extra: {
        digest: error.digest,
      },
    });

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Global error boundary caught:', error);
    }
  }, [error]);

  const isNetworkError = error.message.toLowerCase().includes('network') || 
                        error.message.toLowerCase().includes('fetch');
  
  const isTimeoutError = error.message.toLowerCase().includes('timeout');

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted/20">
      <Card className="w-full max-w-lg text-center">
        <CardHeader className="pb-4">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-10 w-10 text-destructive" />
          </div>
          <CardTitle className="text-2xl font-bold text-destructive">
            {isNetworkError ? 'Connection Error' : 
             isTimeoutError ? 'Request Timeout' : 
             'Something Went Wrong'}
          </CardTitle>
          <CardDescription>
            {isNetworkError ? 
              'Unable to connect to our servers. Please check your internet connection.' :
             isTimeoutError ?
              'The request took too long to complete. Please try again.' :
              'An unexpected error occurred while loading the page.'}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p className="text-muted-foreground">
              We apologize for the inconvenience. Our team has been notified and is working to resolve the issue.
            </p>
          </div>

          <div className="grid gap-3">
            <Button onClick={reset} className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            
            <Button asChild variant="outline" className="w-full">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Go to Homepage
              </Link>
            </Button>
            
            <Button asChild variant="ghost" className="w-full">
              <Link href="/contact">
                <Mail className="mr-2 h-4 w-4" />
                Contact Support
              </Link>
            </Button>
          </div>

          {process.env.NODE_ENV === 'development' && (
            <details className="text-left">
              <summary className="cursor-pointer text-sm font-medium text-muted-foreground mb-2">
                Error Details (Development Only)
              </summary>
              <div className="bg-muted p-3 rounded text-xs font-mono overflow-auto max-h-40">
                <div className="mb-2">
                  <strong>Message:</strong> {error.message}
                </div>
                {error.digest && (
                  <div className="mb-2">
                    <strong>Digest:</strong> {error.digest}
                  </div>
                )}
                {error.stack && (
                  <div>
                    <strong>Stack:</strong>
                    <pre className="mt-1 whitespace-pre-wrap">{error.stack}</pre>
                  </div>
                )}
              </div>
            </details>
          )}

          <div className="pt-4 border-t">
            <h3 className="font-semibold mb-3">While you're here...</h3>
            <div className="grid gap-2 text-sm">
              <p className="text-muted-foreground">
                Learn how our automation services can save you 2-5 hours per week
              </p>
              <Link 
                href="/services" 
                className="text-primary hover:underline"
              >
                Explore Our Services →
              </Link>
            </div>
          </div>

          <div className="pt-4 text-xs text-muted-foreground">
            <p>
              Need immediate assistance? Email us at{' '}
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