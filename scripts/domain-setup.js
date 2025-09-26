#!/usr/bin/env node

/**
 * Domain, SSL, and CDN Configuration Script
 * Provides instructions and configuration for production domain setup
 */

const fs = require('fs');
const path = require('path');

const domainConfig = {
  production: {
    domain: 'automatron.ai',
    subdomain: 'www.automatron.ai',
    redirects: [
      'automatron.com',
      'www.automatron.com'
    ]
  },
  staging: {
    domain: 'automatron-staging.vercel.app'
  },
  ssl: {
    provider: 'Vercel (Let\'s Encrypt)',
    autoRenewal: true,
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true
    }
  },
  cdn: {
    provider: 'Vercel Edge Network',
    regions: ['iad1', 'fra1', 'hnd1', 'syd1'],
    caching: {
      static: '31536000', // 1 year
      api: 'no-cache',
      pages: '3600' // 1 hour
    }
  }
};

function generateDNSConfiguration() {
  const dnsConfig = `# DNS Configuration for automatron.ai
# Add these records to your DNS provider (Cloudflare, Route53, etc.)

## A Records (IPv4)
automatron.ai.          A       76.76.19.61
www.automatron.ai.      A       76.76.19.61

## AAAA Records (IPv6)
automatron.ai.          AAAA    2606:4700:3030::6815:133d
www.automatron.ai.      AAAA    2606:4700:3030::6815:133d

## CNAME Records
# If using Vercel's automatic SSL, use CNAME instead:
# automatron.ai.        CNAME   cname.vercel-dns.com.
# www.automatron.ai.    CNAME   cname.vercel-dns.com.

## MX Records (Email)
automatron.ai.          MX      10 mx1.forwardemail.net.
automatron.ai.          MX      20 mx2.forwardemail.net.

## TXT Records
automatron.ai.          TXT     "v=spf1 include:_spf.forwardemail.net ~all"
_dmarc.automatron.ai.   TXT     "v=DMARC1; p=quarantine; rua=mailto:dmarc@automatron.ai"

## Security Headers (if using Cloudflare)
# These are handled by Next.js, but can be enforced at DNS level
automatron.ai.          TXT     "v=spf1 -all"

## Verification Records (add as needed)
# Google Search Console
# automatron.ai.        TXT     "google-site-verification=..."

# Bing Webmaster Tools  
# automatron.ai.        TXT     "msvalidate.01=..."

## Staging Subdomain
staging.automatron.ai.  CNAME   automatron-staging.vercel.app.`;

  fs.writeFileSync(
    path.join(__dirname, '../deployment/dns-config.txt'),
    dnsConfig
  );
}

function generateVercelDomainConfig() {
  const vercelConfig = {
    domains: [
      {
        name: 'automatron.ai',
        redirect: null,
        gitBranch: 'main'
      },
      {
        name: 'www.automatron.ai',
        redirect: 'automatron.ai',
        gitBranch: null
      }
    ],
    redirects: [
      {
        source: 'automatron.com',
        destination: 'https://automatron.ai',
        permanent: true
      },
      {
        source: 'www.automatron.com',
        destination: 'https://automatron.ai',
        permanent: true
      }
    ],
    ssl: {
      auto: true,
      provider: 'letsencrypt'
    }
  };
  
  fs.writeFileSync(
    path.join(__dirname, '../deployment/vercel-domains.json'),
    JSON.stringify(vercelConfig, null, 2)
  );
}

function generateSSLConfiguration() {
  const sslConfig = `# SSL/TLS Configuration for automatron.ai

## Certificate Information
- Provider: Let's Encrypt (via Vercel)
- Auto-renewal: Enabled
- Validity: 90 days (auto-renewed at 60 days)
- Cipher Suites: Modern (TLS 1.2+)

## Security Headers (implemented in next.config.js)
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin

## HSTS Preload
To enable HSTS preload:
1. Ensure HSTS header includes 'preload' directive
2. Submit domain to https://hstspreload.org/
3. Wait for inclusion in browser preload lists

## Certificate Transparency
Certificates are automatically logged to CT logs:
- Google Argon
- Cloudflare Nimbus
- DigiCert Yeti

## Monitoring
- SSL Labs rating target: A+
- Certificate expiry monitoring: 30 days before expiry
- Mixed content detection: Enabled

## Backup Certificate Authority
Primary: Let's Encrypt
Backup: ZeroSSL (Vercel fallback)`;

  fs.writeFileSync(
    path.join(__dirname, '../deployment/ssl-config.txt'),
    sslConfig
  );
}

function generateCDNConfiguration() {
  const cdnConfig = `# CDN Configuration for automatron.ai

## Vercel Edge Network
- Global distribution: 40+ regions
- Automatic optimization: Enabled
- Brotli compression: Enabled
- HTTP/2 Push: Enabled

## Caching Strategy
### Static Assets (JS, CSS, Images)
- Cache-Control: public, max-age=31536000, immutable
- Edge cache: 1 year
- Browser cache: 1 year

### HTML Pages
- Cache-Control: public, max-age=3600, s-maxage=86400
- Edge cache: 24 hours
- Browser cache: 1 hour
- Stale-while-revalidate: Enabled

### API Routes
- Cache-Control: no-cache, no-store, must-revalidate
- Edge cache: Disabled
- Browser cache: Disabled

## Image Optimization
- Format: WebP/AVIF with fallbacks
- Sizes: Responsive (640w to 3840w)
- Quality: 75% (configurable)
- Lazy loading: Enabled

## Performance Optimizations
- Gzip/Brotli compression: Enabled
- Minification: Enabled
- Tree shaking: Enabled
- Code splitting: Automatic

## Regional Configuration
Primary regions:
- iad1 (US East - Virginia)
- fra1 (Europe - Frankfurt)  
- hnd1 (Asia - Tokyo)
- syd1 (Australia - Sydney)

## Monitoring
- Core Web Vitals: Tracked
- Cache hit ratio: >95% target
- TTFB: <200ms target
- Response time: <500ms p95`;

  fs.writeFileSync(
    path.join(__dirname, '../deployment/cdn-config.txt'),
    cdnConfig
  );
}

function generateDeploymentChecklist() {
  const checklist = `# Production Deployment Checklist

## Pre-Deployment
- [ ] Domain purchased and DNS configured
- [ ] SSL certificate provisioned
- [ ] Environment variables configured in Vercel
- [ ] Monitoring and alerting set up
- [ ] Backup procedures documented
- [ ] Performance baselines established

## Domain Setup
- [ ] A/AAAA records pointing to Vercel
- [ ] CNAME for www subdomain
- [ ] MX records for email (if applicable)
- [ ] TXT records for verification and security
- [ ] DNS propagation verified (24-48 hours)

## SSL/TLS Configuration
- [ ] Certificate issued and active
- [ ] HSTS header configured
- [ ] Security headers implemented
- [ ] SSL Labs test: A+ rating
- [ ] Mixed content issues resolved

## CDN and Performance
- [ ] Static assets cached properly
- [ ] Image optimization working
- [ ] Compression enabled (Gzip/Brotli)
- [ ] Core Web Vitals meeting targets
- [ ] Lighthouse scores >90 across all metrics

## Security
- [ ] Security headers configured
- [ ] CSP policy implemented
- [ ] Rate limiting enabled
- [ ] Input validation in place
- [ ] Error handling configured

## Monitoring
- [ ] Uptime monitoring configured
- [ ] Error tracking (Sentry) active
- [ ] Performance monitoring enabled
- [ ] Alert rules configured
- [ ] Dashboard created

## Testing
- [ ] Smoke tests passing
- [ ] E2E tests passing on production
- [ ] Form submissions working
- [ ] Language switching functional
- [ ] Mobile responsiveness verified

## Post-Deployment
- [ ] DNS propagation complete
- [ ] Search console verification
- [ ] Analytics tracking active
- [ ] Sitemap submitted
- [ ] Social media links updated
- [ ] Team notified of go-live

## Rollback Plan
- [ ] Previous deployment tagged
- [ ] Rollback procedure documented
- [ ] Database backup (if applicable)
- [ ] DNS rollback plan ready
- [ ] Communication plan for issues`;

  fs.writeFileSync(
    path.join(__dirname, '../deployment/deployment-checklist.md'),
    checklist
  );
}

function main() {
  console.log('🌐 Setting up domain, SSL, and CDN configuration...');
  
  // Create deployment directory
  const deploymentDir = path.join(__dirname, '../deployment');
  if (!fs.existsSync(deploymentDir)) {
    fs.mkdirSync(deploymentDir, { recursive: true });
  }
  
  // Generate configuration files
  generateDNSConfiguration();
  generateVercelDomainConfig();
  generateSSLConfiguration();
  generateCDNConfiguration();
  generateDeploymentChecklist();
  
  console.log('✅ Domain configuration complete!');
  console.log('📋 Configuration files created:');
  console.log('  - deployment/dns-config.txt');
  console.log('  - deployment/vercel-domains.json');
  console.log('  - deployment/ssl-config.txt');
  console.log('  - deployment/cdn-config.txt');
  console.log('  - deployment/deployment-checklist.md');
  console.log('');
  console.log('🚀 Next steps:');
  console.log('  1. Purchase domain: automatron.ai');
  console.log('  2. Configure DNS records (see dns-config.txt)');
  console.log('  3. Add domain to Vercel project');
  console.log('  4. Verify SSL certificate provisioning');
  console.log('  5. Test domain configuration');
  console.log('  6. Follow deployment checklist');
}

if (require.main === module) {
  main();
}

module.exports = {
  domainConfig,
  generateDNSConfiguration,
  generateVercelDomainConfig,
  generateSSLConfiguration,
  generateCDNConfiguration,
  generateDeploymentChecklist
};