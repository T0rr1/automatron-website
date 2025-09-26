# Production Deployment Guide

## Pre-Deployment Checklist

### Critical Issues (Must Fix Before Deployment)
- [ ] Fix TypeScript compilation errors
- [ ] Ensure all unit tests pass
- [ ] Fix production build process
- [ ] Configure required environment variables

### High Priority
- [ ] Implement Content Security Policy
- [ ] Set up domain and SSL certificate
- [ ] Configure monitoring and alerting

### Medium Priority
- [ ] Set up uptime monitoring
- [ ] Test backup and recovery procedures
- [ ] Performance optimization review

## Environment Variables Setup

Add these variables to your Vercel project:

```bash
# Required
NEXT_PUBLIC_SITE_URL=https://automatron.ai
RESEND_API_KEY=your_resend_api_key_here
CONTACT_EMAIL=contact@automatron.ai

# Recommended
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn_here
OPENAI_API_KEY=your_openai_api_key_here
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=automatron.ai

# Optional
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token
```

## Deployment Commands

### 1. Pre-deployment validation
```bash
npm run test:production
```

### 2. Deploy to staging
```bash
vercel --target staging
```

### 3. Deploy to production
```bash
vercel --prod
```

## Post-Deployment Verification

### Smoke Tests
- [ ] Homepage loads (https://automatron.ai)
- [ ] Navigation works
- [ ] Contact form submits
- [ ] Language switching functions
- [ ] Mobile responsiveness
- [ ] Health check endpoint (/api/health)

### Performance Tests
- [ ] Lighthouse scores >90
- [ ] Core Web Vitals within targets
- [ ] Page load times <2s

### Security Tests
- [ ] Security headers present
- [ ] SSL certificate valid
- [ ] No mixed content warnings

## Monitoring Setup

### 1. Sentry Error Monitoring
- Create Sentry project
- Add DSN to environment variables
- Verify error reporting

### 2. Uptime Monitoring
- Set up UptimeRobot or Pingdom
- Monitor main pages and API endpoints
- Configure alert notifications

### 3. Performance Monitoring
- Enable Vercel Analytics
- Set up Core Web Vitals tracking
- Monitor bundle size changes

## Rollback Procedures

If issues are detected after deployment:

### 1. Immediate Rollback
```bash
# Rollback to previous deployment
vercel rollback
```

### 2. DNS Rollback (if needed)
- Revert DNS changes
- Update CDN configuration

### 3. Communication
- Update status page
- Notify team and stakeholders
- Document issues for post-mortem

## Support Contacts

- **Development Team**: dev@automatron.ai
- **Infrastructure**: ops@automatron.ai
- **Emergency**: [Emergency contact number]

## Documentation Updates

After successful deployment:
- [ ] Update README with production URLs
- [ ] Document any configuration changes
- [ ] Update team wiki/knowledge base
- [ ] Create deployment post-mortem (if issues occurred)