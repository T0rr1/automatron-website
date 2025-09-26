#!/usr/bin/env node

/**
 * Production Build Optimization Script
 * Handles environment validation, build optimization, and post-build tasks
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function validateEnvironment() {
  log('🔍 Validating environment variables...', 'cyan');
  
  const requiredVars = [
    'NEXT_PUBLIC_SITE_URL',
    'RESEND_API_KEY',
    'CONTACT_EMAIL'
  ];
  
  const optionalVars = [
    'NEXT_PUBLIC_SENTRY_DSN',
    'OPENAI_API_KEY',
    'NEXT_PUBLIC_PLAUSIBLE_DOMAIN'
  ];
  
  const missing = [];
  const warnings = [];
  
  requiredVars.forEach(varName => {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  });
  
  optionalVars.forEach(varName => {
    if (!process.env[varName]) {
      warnings.push(varName);
    }
  });
  
  if (missing.length > 0) {
    log('❌ Missing required environment variables:', 'red');
    missing.forEach(varName => log(`  - ${varName}`, 'red'));
    process.exit(1);
  }
  
  if (warnings.length > 0) {
    log('⚠️  Optional environment variables not set:', 'yellow');
    warnings.forEach(varName => log(`  - ${varName}`, 'yellow'));
  }
  
  log('✅ Environment validation passed', 'green');
}

function optimizeBuild() {
  log('🚀 Starting optimized production build...', 'cyan');
  
  try {
    // Set production environment
    process.env.NODE_ENV = 'production';
    process.env.NEXT_TELEMETRY_DISABLED = '1';
    
    // Run type checking
    log('📝 Running type checking...', 'blue');
    execSync('npm run type-check', { stdio: 'inherit' });
    
    // Run linting
    log('🔍 Running linting...', 'blue');
    execSync('npm run lint', { stdio: 'inherit' });
    
    // Run tests
    log('🧪 Running tests...', 'blue');
    execSync('npm run test', { stdio: 'inherit' });
    
    // Build the application
    log('🏗️  Building application...', 'blue');
    execSync('npm run build', { stdio: 'inherit' });
    
    log('✅ Build completed successfully', 'green');
    
  } catch (error) {
    log('❌ Build failed:', 'red');
    log(error.message, 'red');
    process.exit(1);
  }
}

function generateBuildInfo() {
  log('📊 Generating build information...', 'cyan');
  
  const buildInfo = {
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    environment: process.env.NODE_ENV || 'development',
    gitCommit: process.env.VERCEL_GIT_COMMIT_SHA || 'unknown',
    gitBranch: process.env.VERCEL_GIT_COMMIT_REF || 'unknown',
    buildId: process.env.VERCEL_DEPLOYMENT_ID || 'local'
  };
  
  fs.writeFileSync(
    path.join(__dirname, '../public/build-info.json'),
    JSON.stringify(buildInfo, null, 2)
  );
  
  log('✅ Build info generated', 'green');
}

function analyzeBundleSize() {
  log('📦 Analyzing bundle size...', 'cyan');
  
  try {
    const buildDir = path.join(__dirname, '../.next');
    if (!fs.existsSync(buildDir)) {
      log('⚠️  Build directory not found, skipping bundle analysis', 'yellow');
      return;
    }
    
    // Check if bundle analyzer report exists
    const reportPath = path.join(__dirname, '../bundle-analyzer-report.html');
    if (fs.existsSync(reportPath)) {
      log('📊 Bundle analyzer report generated', 'green');
    }
    
    // Log build directory size
    const stats = execSync('du -sh .next', { encoding: 'utf8' });
    log(`📏 Build size: ${stats.trim()}`, 'blue');
    
  } catch (error) {
    log('⚠️  Could not analyze bundle size', 'yellow');
  }
}

function main() {
  log('🚀 Starting production build process...', 'bright');
  
  validateEnvironment();
  optimizeBuild();
  generateBuildInfo();
  analyzeBundleSize();
  
  log('🎉 Production build completed successfully!', 'green');
  log('📋 Next steps:', 'cyan');
  log('  1. Deploy to Vercel: vercel --prod', 'blue');
  log('  2. Run smoke tests on production URL', 'blue');
  log('  3. Monitor performance and errors', 'blue');
}

if (require.main === module) {
  main();
}

module.exports = {
  validateEnvironment,
  optimizeBuild,
  generateBuildInfo,
  analyzeBundleSize
};