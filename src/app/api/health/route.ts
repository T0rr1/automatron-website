import { NextRequest, NextResponse } from 'next/server';

/**
 * Health check endpoint for monitoring and load balancers
 * Returns system status and basic metrics
 */
export async function GET(request: NextRequest) {
  try {
    const startTime = Date.now();
    
    // Basic system checks
    const checks = {
      timestamp: new Date().toISOString(),
      status: 'healthy',
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      uptime: process.uptime(),
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
        rss: Math.round(process.memoryUsage().rss / 1024 / 1024)
      },
      responseTime: Date.now() - startTime
    };
    
    // Check critical environment variables
    const requiredEnvVars = [
      'NEXT_PUBLIC_SITE_URL',
      'RESEND_API_KEY',
      'CONTACT_EMAIL'
    ];
    
    const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingEnvVars.length > 0) {
      return NextResponse.json({
        ...checks,
        status: 'degraded',
        issues: [`Missing environment variables: ${missingEnvVars.join(', ')}`]
      }, { status: 503 });
    }
    
    // Additional service checks could go here
    // - Database connectivity
    // - External API availability
    // - File system access
    
    return NextResponse.json(checks, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    
  } catch (error) {
    console.error('Health check failed:', error);
    
    return NextResponse.json({
      timestamp: new Date().toISOString(),
      status: 'unhealthy',
      error: 'Internal server error',
      environment: process.env.NODE_ENV || 'development'
    }, { status: 500 });
  }
}

// Support HEAD requests for simple uptime checks
export async function HEAD(request: NextRequest) {
  try {
    return new NextResponse(null, { status: 200 });
  } catch (error) {
    return new NextResponse(null, { status: 500 });
  }
}