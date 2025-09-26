#!/usr/bin/env node

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
}

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`)
}

function runCommand(command, description) {
  log(`\n${colors.blue}Running: ${description}${colors.reset}`)
  log(`${colors.cyan}Command: ${command}${colors.reset}`)
  
  try {
    execSync(command, { stdio: 'inherit', cwd: process.cwd() })
    log(`${colors.green}✓ ${description} completed successfully${colors.reset}`)
    return true
  } catch (error) {
    log(`${colors.red}✗ ${description} failed${colors.reset}`)
    log(`${colors.red}Error: ${error.message}${colors.reset}`)
    return false
  }
}

function checkFileExists(filePath) {
  return fs.existsSync(path.join(process.cwd(), filePath))
}

async function main() {
  const args = process.argv.slice(2)
  const testType = args[0] || 'all'
  
  log(`${colors.bright}🧪 Running Test Suite${colors.reset}`)
  log(`${colors.yellow}Test Type: ${testType}${colors.reset}`)
  
  const results = {
    unit: null,
    accessibility: null,
    e2e: null,
    visual: null,
    lighthouse: null,
  }
  
  // Check if required files exist
  const requiredFiles = [
    'vitest.config.ts',
    'playwright.config.ts',
    'lighthouserc.js',
  ]
  
  for (const file of requiredFiles) {
    if (!checkFileExists(file)) {
      log(`${colors.red}Missing required file: ${file}${colors.reset}`)
      process.exit(1)
    }
  }
  
  // Run unit tests
  if (testType === 'all' || testType === 'unit') {
    log(`\n${colors.magenta}=== Unit Tests ===${colors.reset}`)
    results.unit = runCommand('npm run test', 'Unit Tests')
  }
  
  // Run accessibility tests
  if (testType === 'all' || testType === 'accessibility') {
    log(`\n${colors.magenta}=== Accessibility Tests ===${colors.reset}`)
    results.accessibility = runCommand('npm run test:accessibility', 'Accessibility Tests')
  }
  
  // Run E2E tests
  if (testType === 'all' || testType === 'e2e') {
    log(`\n${colors.magenta}=== End-to-End Tests ===${colors.reset}`)
    
    // Check if development server is running
    try {
      execSync('curl -f http://localhost:3000 > /dev/null 2>&1', { stdio: 'ignore' })
      log(`${colors.green}Development server is running${colors.reset}`)
    } catch {
      log(`${colors.yellow}Starting development server...${colors.reset}`)
      // The Playwright config will start the server automatically
    }
    
    results.e2e = runCommand('npm run test:e2e', 'End-to-End Tests')
  }
  
  // Run visual regression tests
  if (testType === 'all' || testType === 'visual') {
    log(`\n${colors.magenta}=== Visual Regression Tests ===${colors.reset}`)
    results.visual = runCommand('npm run test:visual', 'Visual Regression Tests')
  }
  
  // Run Lighthouse tests
  if (testType === 'all' || testType === 'lighthouse') {
    log(`\n${colors.magenta}=== Lighthouse Performance Tests ===${colors.reset}`)
    
    // Build the application first
    log(`${colors.yellow}Building application for Lighthouse tests...${colors.reset}`)
    const buildSuccess = runCommand('npm run build', 'Build Application')
    
    if (buildSuccess) {
      results.lighthouse = runCommand('npm run test:lighthouse', 'Lighthouse Tests')
    } else {
      log(`${colors.red}Skipping Lighthouse tests due to build failure${colors.reset}`)
      results.lighthouse = false
    }
  }
  
  // Generate test report
  log(`\n${colors.bright}=== Test Results Summary ===${colors.reset}`)
  
  const testResults = Object.entries(results).filter(([_, result]) => result !== null)
  const passedTests = testResults.filter(([_, result]) => result === true)
  const failedTests = testResults.filter(([_, result]) => result === false)
  
  testResults.forEach(([testName, result]) => {
    const status = result ? '✓' : '✗'
    const color = result ? colors.green : colors.red
    log(`${color}${status} ${testName.charAt(0).toUpperCase() + testName.slice(1)} Tests${colors.reset}`)
  })
  
  log(`\n${colors.bright}Summary:${colors.reset}`)
  log(`${colors.green}Passed: ${passedTests.length}${colors.reset}`)
  log(`${colors.red}Failed: ${failedTests.length}${colors.reset}`)
  log(`${colors.yellow}Total: ${testResults.length}${colors.reset}`)
  
  if (failedTests.length > 0) {
    log(`\n${colors.red}Some tests failed. Please check the output above for details.${colors.reset}`)
    process.exit(1)
  } else {
    log(`\n${colors.green}All tests passed! 🎉${colors.reset}`)
    process.exit(0)
  }
}

// Handle command line arguments
if (require.main === module) {
  main().catch((error) => {
    log(`${colors.red}Test runner failed: ${error.message}${colors.reset}`)
    process.exit(1)
  })
}

module.exports = { runCommand, log, colors }