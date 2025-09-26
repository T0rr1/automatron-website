// Security testing utilities for development and testing

import { InputSanitizer, FileValidator } from './security';
import { SECURITY_CONFIG } from './config/security';

export interface SecurityTestResult {
  passed: boolean;
  message: string;
  details?: string;
}

export class SecurityTester {
  /**
   * Test input sanitization
   */
  static testInputSanitization(): SecurityTestResult[] {
    const results: SecurityTestResult[] = [];
    
    // Test HTML sanitization
    const htmlTests = [
      { input: '<script>alert("xss")</script>', expected: '' },
      { input: 'Hello <b>world</b>', expected: 'Hello world' },
      { input: 'javascript:alert(1)', expected: 'alert(1)' },
      { input: 'onclick="alert(1)"', expected: '' }
    ];
    
    htmlTests.forEach(test => {
      const result = InputSanitizer.sanitizeHTML(test.input);
      results.push({
        passed: result === test.expected,
        message: `HTML sanitization test: "${test.input}"`,
        details: `Expected: "${test.expected}", Got: "${result}"`
      });
    });
    
    // Test email sanitization
    const emailTests = [
      { input: 'TEST@EXAMPLE.COM', expected: 'test@example.com' },
      { input: '  user@domain.com  ', expected: 'user@domain.com' },
      { input: 'user+tag@domain.com', expected: 'user+tag@domain.com' }
    ];
    
    emailTests.forEach(test => {
      const result = InputSanitizer.sanitizeEmail(test.input);
      results.push({
        passed: result === test.expected,
        message: `Email sanitization test: "${test.input}"`,
        details: `Expected: "${test.expected}", Got: "${result}"`
      });
    });
    
    return results;
  }
  
  /**
   * Test file validation
   */
  static testFileValidation(): SecurityTestResult[] {
    const results: SecurityTestResult[] = [];
    
    const fileTests = [
      {
        file: { name: 'document.pdf', size: 1024, type: 'application/pdf' },
        shouldPass: true,
        description: 'Valid PDF file'
      },
      {
        file: { name: 'script.exe', size: 1024, type: 'application/x-executable' },
        shouldPass: false,
        description: 'Executable file (should fail)'
      },
      {
        file: { name: 'large.pdf', size: 10 * 1024 * 1024, type: 'application/pdf' },
        shouldPass: false,
        description: 'File too large (should fail)'
      },
      {
        file: { name: '../../../etc/passwd', size: 1024, type: 'text/plain' },
        shouldPass: false,
        description: 'Path traversal attempt (should fail)'
      },
      {
        file: { name: 'document.pdf.exe', size: 1024, type: 'application/pdf' },
        shouldPass: false,
        description: 'Double extension (should fail)'
      }
    ];
    
    fileTests.forEach(test => {
      const validation = FileValidator.validateFile(test.file);
      const passed = validation.isValid === test.shouldPass;
      
      results.push({
        passed,
        message: `File validation test: ${test.description}`,
        details: `Expected ${test.shouldPass ? 'pass' : 'fail'}, Got ${validation.isValid ? 'pass' : 'fail'}. Errors: ${validation.errors.join(', ')}`
      });
    });
    
    return results;
  }
  
  /**
   * Test rate limiting configuration
   */
  static testRateLimitConfig(): SecurityTestResult[] {
    const results: SecurityTestResult[] = [];
    
    // Test rate limit values
    results.push({
      passed: SECURITY_CONFIG.RATE_LIMIT.MAX_REQUESTS >= 1 && SECURITY_CONFIG.RATE_LIMIT.MAX_REQUESTS <= 100,
      message: 'Rate limit max requests within valid range',
      details: `Current value: ${SECURITY_CONFIG.RATE_LIMIT.MAX_REQUESTS}`
    });
    
    results.push({
      passed: SECURITY_CONFIG.RATE_LIMIT.WINDOW_MS >= 1000 && SECURITY_CONFIG.RATE_LIMIT.WINDOW_MS <= 3600000,
      message: 'Rate limit window within valid range',
      details: `Current value: ${SECURITY_CONFIG.RATE_LIMIT.WINDOW_MS}ms`
    });
    
    return results;
  }
  
  /**
   * Test CSP configuration
   */
  static testCSPConfig(): SecurityTestResult[] {
    const results: SecurityTestResult[] = [];
    
    // Check for dangerous CSP directives
    const dangerousDirectives = ['unsafe-eval', 'unsafe-inline'];
    const scriptSrc = SECURITY_CONFIG.CSP.SCRIPT_SRC;
    
    // Allow unsafe-eval only in development
    const hasUnsafeEval = scriptSrc.some(src => src.includes('unsafe-eval'));
    results.push({
      passed: !hasUnsafeEval || process.env.NODE_ENV === 'development',
      message: 'CSP script-src does not contain unsafe-eval in production',
      details: `Script sources: ${scriptSrc.join(', ')}`
    });
    
    // Check that nonce placeholder exists
    const hasNoncePlaceholder = scriptSrc.some(src => src.includes('{NONCE}'));
    results.push({
      passed: hasNoncePlaceholder,
      message: 'CSP script-src contains nonce placeholder',
      details: `Script sources: ${scriptSrc.join(', ')}`
    });
    
    return results;
  }
  
  /**
   * Test environment variables
   */
  static testEnvironmentVariables(): SecurityTestResult[] {
    const results: SecurityTestResult[] = [];
    
    const requiredVars = [
      'NEXT_PUBLIC_SITE_URL',
      'RESEND_API_KEY',
      'CONTACT_EMAIL'
    ];
    
    requiredVars.forEach(varName => {
      const exists = !!process.env[varName];
      results.push({
        passed: exists,
        message: `Environment variable ${varName} is set`,
        details: exists ? 'Present' : 'Missing'
      });
    });
    
    return results;
  }
  
  /**
   * Run all security tests
   */
  static runAllTests(): {
    passed: number;
    failed: number;
    total: number;
    results: { category: string; tests: SecurityTestResult[] }[];
  } {
    const categories = [
      { name: 'Input Sanitization', tests: this.testInputSanitization() },
      { name: 'File Validation', tests: this.testFileValidation() },
      { name: 'Rate Limiting', tests: this.testRateLimitConfig() },
      { name: 'CSP Configuration', tests: this.testCSPConfig() },
      { name: 'Environment Variables', tests: this.testEnvironmentVariables() }
    ];
    
    let passed = 0;
    let failed = 0;
    
    categories.forEach(category => {
      category.tests.forEach(test => {
        if (test.passed) {
          passed++;
        } else {
          failed++;
        }
      });
    });
    
    return {
      passed,
      failed,
      total: passed + failed,
      results: categories.map(cat => ({
        category: cat.name,
        tests: cat.tests
      }))
    };
  }
  
  /**
   * Generate security test report
   */
  static generateReport(): string {
    const testResults = this.runAllTests();
    
    let report = `Security Test Report\n`;
    report += `==================\n\n`;
    report += `Total Tests: ${testResults.total}\n`;
    report += `Passed: ${testResults.passed}\n`;
    report += `Failed: ${testResults.failed}\n`;
    report += `Success Rate: ${((testResults.passed / testResults.total) * 100).toFixed(1)}%\n\n`;
    
    testResults.results.forEach(category => {
      report += `${category.category}\n`;
      report += `${'-'.repeat(category.category.length)}\n`;
      
      category.tests.forEach(test => {
        const status = test.passed ? '✅ PASS' : '❌ FAIL';
        report += `${status}: ${test.message}\n`;
        if (test.details) {
          report += `   Details: ${test.details}\n`;
        }
      });
      
      report += '\n';
    });
    
    return report;
  }
}

// Export for use in development/testing
export default SecurityTester;