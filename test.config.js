// Test configuration for different environments
const config = {
  // Development environment
  development: {
    baseUrl: 'http://localhost:3000',
    timeout: 30000,
    retries: 1,
    workers: 4,
    coverage: {
      enabled: true,
      threshold: {
        statements: 70,
        branches: 70,
        functions: 70,
        lines: 70,
      },
    },
    lighthouse: {
      performance: 0.7,
      accessibility: 0.9,
      bestPractices: 0.8,
      seo: 0.8,
    },
  },
  
  // CI environment
  ci: {
    baseUrl: 'http://localhost:3000',
    timeout: 60000,
    retries: 2,
    workers: 2,
    coverage: {
      enabled: true,
      threshold: {
        statements: 80,
        branches: 70,
        functions: 80,
        lines: 80,
      },
    },
    lighthouse: {
      performance: 0.8,
      accessibility: 0.9,
      bestPractices: 0.8,
      seo: 0.8,
    },
  },
  
  // Production environment
  production: {
    baseUrl: process.env.PRODUCTION_URL || 'https://automatron.example.com',
    timeout: 45000,
    retries: 3,
    workers: 1,
    coverage: {
      enabled: false,
    },
    lighthouse: {
      performance: 0.9,
      accessibility: 0.95,
      bestPractices: 0.9,
      seo: 0.9,
    },
  },
}

const environment = process.env.NODE_ENV || 'development'
const testEnv = process.env.TEST_ENV || environment

module.exports = config[testEnv] || config.development