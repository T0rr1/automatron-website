'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log error to Sentry
    Sentry.captureException(error, {
      tags: {
        section: 'global_error',
        critical: true,
      },
      extra: {
        digest: error.digest,
      },
    });

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Global error occurred:', error);
    }
  }, [error]);

  return (
    <html>
      <body>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          backgroundColor: '#fafafa',
        }}>
          <div style={{
            maxWidth: '500px',
            width: '100%',
            textAlign: 'center',
            padding: '2rem',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 1.5rem',
              backgroundColor: '#fee2e2',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <svg 
                width="40" 
                height="40" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#dc2626" 
                strokeWidth="2"
              >
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
                <path d="M12 9v4"/>
                <path d="m12 17 .01 0"/>
              </svg>
            </div>
            
            <h1 style={{
              fontSize: '1.875rem',
              fontWeight: 'bold',
              color: '#dc2626',
              marginBottom: '0.5rem',
            }}>
              500 - Server Error
            </h1>
            
            <p style={{
              color: '#6b7280',
              marginBottom: '1.5rem',
              lineHeight: '1.5',
            }}>
              We're experiencing technical difficulties. Our team has been notified and is working to resolve the issue.
            </p>

            <div style={{ marginBottom: '1.5rem' }}>
              <button
                onClick={reset}
                style={{
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  marginRight: '0.75rem',
                  marginBottom: '0.5rem',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#2563eb';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#3b82f6';
                }}
              >
                Try Again
              </button>
              
              <a
                href="/"
                style={{
                  backgroundColor: 'white',
                  color: '#374151',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  display: 'inline-block',
                  marginBottom: '0.5rem',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#f9fafb';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                }}
              >
                Go to Homepage
              </a>
            </div>

            <div style={{
              paddingTop: '1rem',
              borderTop: '1px solid #e5e7eb',
            }}>
              <p style={{
                fontSize: '0.875rem',
                color: '#6b7280',
                marginBottom: '0.5rem',
              }}>
                Need immediate help?
              </p>
              <a
                href="mailto:hello@automatron.ai"
                style={{
                  color: '#3b82f6',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                hello@automatron.ai
              </a>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <details style={{
                marginTop: '1.5rem',
                textAlign: 'left',
                fontSize: '0.75rem',
                backgroundColor: '#f3f4f6',
                padding: '1rem',
                borderRadius: '6px',
              }}>
                <summary style={{ cursor: 'pointer', fontWeight: '500' }}>
                  Error Details (Development Only)
                </summary>
                <div style={{ marginTop: '0.5rem' }}>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <strong>Message:</strong> {error.message}
                  </div>
                  {error.digest && (
                    <div style={{ marginBottom: '0.5rem' }}>
                      <strong>Digest:</strong> {error.digest}
                    </div>
                  )}
                  {error.stack && (
                    <div>
                      <strong>Stack:</strong>
                      <pre style={{ 
                        marginTop: '0.25rem', 
                        whiteSpace: 'pre-wrap',
                        fontSize: '0.6875rem',
                      }}>
                        {error.stack}
                      </pre>
                    </div>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}