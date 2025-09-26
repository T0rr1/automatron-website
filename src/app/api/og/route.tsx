import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Get parameters from URL
    const title = searchParams.get('title') || 'Automatron.ai - Save 2-5 Hours Per Week Through Automation';
    const description = searchParams.get('description') || 'Professional automation services for solo business owners and small teams';
    const type = searchParams.get('type') || 'website'; // website, service, case-study
    
    // Define colors and styling
    const colors = {
      primary: '#0066cc',
      secondary: '#004499',
      accent: '#00aaff',
      text: '#1a1a1a',
      textLight: '#666666',
      background: '#ffffff',
      gradient: 'linear-gradient(135deg, #0066cc 0%, #00aaff 100%)',
    };

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            backgroundColor: colors.background,
            padding: '60px',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
        >
          {/* Header with logo and brand */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              marginBottom: '40px',
            }}
          >
            {/* Logo placeholder - in production, you'd load the actual logo */}
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '12px',
                background: colors.gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '24px',
                fontWeight: 'bold',
              }}
            >
              A
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: colors.text,
                  lineHeight: 1.2,
                }}
              >
                Automatron.ai
              </div>
              <div
                style={{
                  fontSize: '18px',
                  color: colors.textLight,
                  lineHeight: 1.2,
                }}
              >
                Professional Automation Services
              </div>
            </div>
          </div>

          {/* Main content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              flex: 1,
              width: '100%',
              maxWidth: '900px',
            }}
          >
            <h1
              style={{
                fontSize: title.length > 60 ? '48px' : '56px',
                fontWeight: 'bold',
                color: colors.text,
                lineHeight: 1.1,
                margin: 0,
                maxWidth: '100%',
              }}
            >
              {title}
            </h1>
            
            {description && (
              <p
                style={{
                  fontSize: '24px',
                  color: colors.textLight,
                  lineHeight: 1.4,
                  margin: 0,
                  maxWidth: '100%',
                }}
              >
                {description}
              </p>
            )}
          </div>

          {/* Footer with type indicator and CTA */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              marginTop: '40px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              {type === 'service' && (
                <div
                  style={{
                    backgroundColor: colors.primary,
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '16px',
                    fontWeight: '600',
                  }}
                >
                  Service
                </div>
              )}
              {type === 'case-study' && (
                <div
                  style={{
                    backgroundColor: colors.accent,
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '16px',
                    fontWeight: '600',
                  }}
                >
                  Case Study
                </div>
              )}
              <div
                style={{
                  fontSize: '18px',
                  color: colors.textLight,
                }}
              >
                Save 2-5 Hours Per Week
              </div>
            </div>
            
            <div
              style={{
                fontSize: '18px',
                color: colors.textLight,
                fontWeight: '500',
              }}
            >
              automatron.ai
            </div>
          </div>

          {/* Decorative elements */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '300px',
              height: '300px',
              background: colors.gradient,
              borderRadius: '50%',
              opacity: 0.1,
              transform: 'translate(150px, -150px)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '200px',
              height: '200px',
              background: colors.gradient,
              borderRadius: '50%',
              opacity: 0.05,
              transform: 'translate(-100px, 100px)',
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response('Failed to generate image', { status: 500 });
  }
}