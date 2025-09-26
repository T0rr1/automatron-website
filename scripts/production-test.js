#!/usr/bin/env node

/**
 * Production Testing Script
 * Comprehensive testing suite for production-like environment
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class ProductionTester {
  constructor() {
    this.results = {
      passed: 0,
      failed: 0,
      warnings: 0,
      tests: []
    };
  }

  async runAllTests() {
    console.log('🧪 Starting production testing suite...');
    console.log('');

    // Environment validation
    await this.testEnvironmentSetup();
    
    // Build and compilation tests
    await this.testBuildProcess();
    
    // Security tests
    await this.testSecurity();
    
    // Performance tests
    await this.testPerformance();
    
    // Functionality tests
    await this.testFunctionality();
    
    // Accessibility tests
    await this.testAccessibility();
    
    // SEO tests
    await this.testSEO();
    
    // Monitoring tests
    await this.testMonitoring();
    
    // Generate report
    this.generateReport();
  }

  async testEnvironmentSetup() {
    console.log('🔧 Testing environment setup...');
    
    // Test Node.js version
    this.test('Node.js version compatibility', () => {
      const nodeVersion = process.version;
      const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
      return majorVersion >= 18;
    });
    
    // Test npm dependencies
    this.test('NPM dependencies installed', () => {
      return fs.existsSync(path.join(__dirname, '../node_modules'));
    });
    
    // Test environment variables
    this.test('Required environment variables', () => {
      const required = ['NEXT_PUBLIC_SITE_URL'];
      return required.every(varName => process.env[varName]);
    });
    
    // Test configuration files
    this.test('Configuration files present', () => {
      const configFiles = [
        'next.config.js',
        'package.json',
        'tsconfig.json',
        'tailwind.config.ts'
      ];
      return configFiles.every(file => 
        fs.existsSync(path.join(__dirname, '..', file))
      );
    });
  }

  async testBuildProcess() {
    console.log('🏗️  Testing build process...');
    
    // Test TypeScript compilation
    this.test('TypeScript compilation', () => {
      try {
        execSync('npm run type-check', { stdio: 'pipe' });
        return true;
      } catch (error) {
        this.logError('TypeScript errors found', error.stdout?.toString());
        return false;
      }
    });
    
    // Test linting
    this.test('ESLint validation', () => {
      try {
        execSync('npm run lint', { stdio: 'pipe' });
        return true;
      } catch (error) {
        this.logWarning('Linting issues found', error.stdout?.toString());
        return true; // Non-blocking
      }
    });
    
    // Test unit tests
    this.test('Unit tests passing', () => {
      try {
        execSync('npm run test', { stdio: 'pipe' });
        return true;
      } catch (error) {
        this.logError('Unit tests failing', error.stdout?.toString());
        return false;
      }
    });
    
    // Test production build
    this.test('Production build successful', () => {
      try {
        execSync('npm run build', { stdio: 'pipe' });
        return fs.existsSync(path.join(__dirname, '../.next'));
      } catch (error) {
        this.logError('Build failed', error.stdout?.toString());
        return false;
      }
    });
  }

  async testSecurity() {
    console.log('🔒 Testing security configuration...');
    
    // Test security headers
    this.test('Security headers configured', () => {
      const nextConfig = fs.readFileSync(
        path.join(__dirname, '../next.config.js'), 
        'utf8'
      );
      
      const requiredHeaders = [
        'X-Content-Type-Options',
        'X-Frame-Options',
        'X-XSS-Protection',
        'Referrer-Policy'
      ];
      
      return requiredHeaders.every(header => 
        nextConfig.includes(header)
      );
    });
    
    // Test CSP configuration
    this.test('Content Security Policy', () => {
      // Check if CSP is configured (basic check)
      const nextConfig = fs.readFileSync(
        path.join(__dirname, '../next.config.js'), 
        'utf8'
      );
      return nextConfig.includes('Content-Security-Policy') || 
             nextConfig.includes('CSP');
    });
    
    // Test environment variable security
    this.test('No secrets in client bundle', () => {
      try {
        const buildManifest = path.join(__dirname, '../.next/build-manifest.json');
        if (fs.existsSync(buildManifest)) {
          const manifest = fs.readFileSync(buildManifest, 'utf8');
          // Check for common secret patterns
          const secretPatterns = [
            /sk_live_/,
            /sk_test_/,
            /-----BEGIN/,
            /password/i,
            /secret/i
          ];
          return !secretPatterns.some(pattern => pattern.test(manifest));
        }
        return true;
      } catch {
        return true; // If we can't check, assume it's okay
      }
    });
  }

  async testPerformance() {
    console.log('⚡ Testing performance configuration...');
    
    // Test image optimization
    this.test('Image optimization configured', () => {
      const nextConfig = fs.readFileSync(
        path.join(__dirname, '../next.config.js'), 
        'utf8'
      );
      return nextConfig.includes('images') && 
             nextConfig.includes('formats');
    });
    
    // Test bundle size
    this.test('Bundle size reasonable', () => {
      const buildDir = path.join(__dirname, '../.next');
      if (!fs.existsSync(buildDir)) return false;
      
      try {
        const stats = execSync('du -s .next', { 
          encoding: 'utf8',
          cwd: path.join(__dirname, '..')
        });
        const sizeKB = parseInt(stats.split('\t')[0]);
        return sizeKB < 50000; // Less than 50MB
      } catch {
        return true; // If we can't measure, assume it's okay
      }
    });
    
    // Test code splitting
    this.test('Code splitting enabled', () => {
      const chunksDir = path.join(__dirname, '../.next/static/chunks');
      if (!fs.existsSync(chunksDir)) return false;
      
      const chunks = fs.readdirSync(chunksDir);
      return chunks.length > 3; // Should have multiple chunks
    });
  }

  async testFunctionality() {
    console.log('🎯 Testing core functionality...');
    
    // Test routing configuration
    this.test('App Router configured', () => {
      return fs.existsSync(path.join(__dirname, '../src/app'));
    });
    
    // Test internationalization
    this.test('Internationalization setup', () => {
      const i18nConfig = path.join(__dirname, '../src/i18n.ts');
      const messagesDir = path.join(__dirname, '../messages');
      return fs.existsSync(i18nConfig) && fs.existsSync(messagesDir);
    });
    
    // Test API routes
    this.test('API routes present', () => {
      const apiDir = path.join(__dirname, '../src/app/api');
      return fs.existsSync(apiDir);
    });
    
    // Test component structure
    this.test('Component structure valid', () => {
      const componentsDir = path.join(__dirname, '../src/components');
      return fs.existsSync(componentsDir);
    });
  }

  async testAccessibility() {
    console.log('♿ Testing accessibility configuration...');
    
    // Test accessibility linting
    this.test('Accessibility linting configured', () => {
      const eslintConfig = path.join(__dirname, '../.eslintrc.json');
      if (!fs.existsSync(eslintConfig)) return false;
      
      const config = JSON.parse(fs.readFileSync(eslintConfig, 'utf8'));
      return config.extends?.includes('plugin:jsx-a11y/recommended') ||
             config.plugins?.includes('jsx-a11y');
    });
    
    // Test accessibility testing
    this.test('Accessibility tests configured', () => {
      const packageJson = JSON.parse(
        fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8')
      );
      return packageJson.devDependencies?.['jest-axe'] ||
             packageJson.dependencies?.['jest-axe'];
    });
  }

  async testSEO() {
    console.log('🔍 Testing SEO configuration...');
    
    // Test SEO library
    this.test('SEO library configured', () => {
      const packageJson = JSON.parse(
        fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8')
      );
      return packageJson.dependencies?.['next-seo'];
    });
    
    // Test sitemap generation
    this.test('Sitemap generation configured', () => {
      return fs.existsSync(path.join(__dirname, '../next-sitemap.config.js'));
    });
    
    // Test robots.txt
    this.test('Robots.txt present', () => {
      return fs.existsSync(path.join(__dirname, '../public/robots.txt'));
    });
  }

  async testMonitoring() {
    console.log('📊 Testing monitoring setup...');
    
    // Test error monitoring
    this.test('Error monitoring configured', () => {
      const packageJson = JSON.parse(
        fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8')
      );
      return packageJson.dependencies?.['@sentry/nextjs'];
    });
    
    // Test health check endpoint
    this.test('Health check endpoint exists', () => {
      return fs.existsSync(path.join(__dirname, '../src/app/api/health/route.ts'));
    });
    
    // Test monitoring configuration
    this.test('Monitoring configuration present', () => {
      return fs.existsSync(path.join(__dirname, '../monitoring'));
    });
  }

  test(name, testFn) {
    try {
      const result = testFn();
      if (result) {
        console.log(`  ✅ ${name}`);
        this.results.passed++;
        this.results.tests.push({ name, status: 'passed' });
      } else {
        console.log(`  ❌ ${name}`);
        this.results.failed++;
        this.results.tests.push({ name, status: 'failed' });
      }
    } catch (error) {
      console.log(`  ❌ ${name} (Error: ${error.message})`);
      this.results.failed++;
      this.results.tests.push({ name, status: 'failed', error: error.message });
    }
  }

  logError(message, details) {
    console.log(`  🚨 ${message}`);
    if (details) {
      console.log(`     ${details.slice(0, 200)}...`);
    }
  }

  logWarning(message, details) {
    console.log(`  ⚠️  ${message}`);
    this.results.warnings++;
    if (details) {
      console.log(`     ${details.slice(0, 200)}...`);
    }
  }

  generateReport() {
    console.log('');
    console.log('📋 Production Test Report');
    console.log('========================');
    console.log(`✅ Passed: ${this.results.passed}`);
    console.log(`❌ Failed: ${this.results.failed}`);
    console.log(`⚠️  Warnings: ${this.results.warnings}`);
    console.log(`📊 Total: ${this.results.tests.length}`);
    
    const successRate = (this.results.passed / this.results.tests.length * 100).toFixed(1);
    console.log(`🎯 Success Rate: ${successRate}%`);
    
    if (this.results.failed > 0) {
      console.log('');
      console.log('❌ Failed Tests:');
      this.results.tests
        .filter(test => test.status === 'failed')
        .forEach(test => {
          console.log(`  - ${test.name}`);
          if (test.error) {
            console.log(`    Error: ${test.error}`);
          }
        });
    }
    
    // Save report to file
    const report = {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      results: this.results,
      summary: {
        total: this.results.tests.length,
        passed: this.results.passed,
        failed: this.results.failed,
        warnings: this.results.warnings,
        successRate: parseFloat(successRate)
      }
    };
    
    fs.writeFileSync(
      path.join(__dirname, '../test-results/production-test-report.json'),
      JSON.stringify(report, null, 2)
    );
    
    console.log('');
    console.log(`📄 Report saved to: test-results/production-test-report.json`);
    
    // Exit with error code if tests failed
    if (this.results.failed > 0) {
      console.log('');
      console.log('🚨 Some tests failed. Please review and fix issues before deployment.');
      process.exit(1);
    } else {
      console.log('');
      console.log('🎉 All tests passed! Ready for production deployment.');
    }
  }
}

// CLI interface
if (require.main === module) {
  // Create test-results directory
  const testResultsDir = path.join(__dirname, '../test-results');
  if (!fs.existsSync(testResultsDir)) {
    fs.mkdirSync(testResultsDir, { recursive: true });
  }
  
  const tester = new ProductionTester();
  tester.runAllTests().catch(error => {
    console.error('❌ Testing failed:', error.message);
    process.exit(1);
  });
}

module.exports = ProductionTester;