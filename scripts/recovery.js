#!/usr/bin/env node

/**
 * Recovery Script for Automatron.ai
 * Restores website from backup archives
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class RecoveryManager {
  constructor(backupPath) {
    this.backupPath = backupPath;
    this.recoveryDir = path.join(__dirname, '../recovery', Date.now().toString());
  }

  async restore() {
    console.log('🔄 Starting recovery process...');
    
    // Validate backup
    await this.validateBackup();
    
    // Extract backup
    await this.extractBackup();
    
    // Verify integrity
    await this.verifyIntegrity();
    
    // Restore files
    await this.restoreFiles();
    
    // Restore configuration
    await this.restoreConfiguration();
    
    // Rebuild application
    await this.rebuildApplication();
    
    console.log('✅ Recovery completed successfully');
  }

  async validateBackup() {
    console.log('🔍 Validating backup archive...');
    
    if (!fs.existsSync(this.backupPath)) {
      throw new Error(`Backup file not found: ${this.backupPath}`);
    }
    
    // Check if it's a valid tar.gz file
    try {
      execSync(`tar -tzf "${this.backupPath}" > /dev/null`);
    } catch (error) {
      throw new Error('Invalid backup archive format');
    }
  }

  async extractBackup() {
    console.log('📦 Extracting backup archive...');
    
    fs.mkdirSync(this.recoveryDir, { recursive: true });
    
    execSync(`tar -xzf "${this.backupPath}" -C "${this.recoveryDir}"`);
    
    // Find the extracted directory
    const contents = fs.readdirSync(this.recoveryDir);
    this.extractedDir = path.join(this.recoveryDir, contents[0]);
  }

  async verifyIntegrity() {
    console.log('🔐 Verifying backup integrity...');
    
    const manifestPath = path.join(this.extractedDir, 'manifest.json');
    
    if (!fs.existsSync(manifestPath)) {
      throw new Error('Backup manifest not found');
    }
    
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    
    console.log(`📋 Backup info:`);
    console.log(`  - Timestamp: ${manifest.timestamp}`);
    console.log(`  - Version: ${manifest.version}`);
    console.log(`  - Git commit: ${manifest.gitCommit}`);
    console.log(`  - Environment: ${manifest.environment}`);
    
    // Verify checksums
    let verified = 0;
    let failed = 0;
    
    Object.entries(manifest.checksums).forEach(([filePath, expectedHash]) => {
      const fullPath = path.join(this.extractedDir, filePath);
      
      if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath);
        const actualHash = require('crypto').createHash('sha256').update(content).digest('hex');
        
        if (actualHash === expectedHash) {
          verified++;
        } else {
          console.warn(`⚠️  Checksum mismatch: ${filePath}`);
          failed++;
        }
      }
    });
    
    console.log(`✅ Verified ${verified} files, ${failed} failed`);
    
    if (failed > 0) {
      throw new Error(`Backup integrity check failed: ${failed} files corrupted`);
    }
  }

  async restoreFiles() {
    console.log('📁 Restoring files...');
    
    const contentDir = path.join(this.extractedDir, 'content');
    const artifactsDir = path.join(this.extractedDir, 'artifacts');
    
    // Restore content
    if (fs.existsSync(contentDir)) {
      this.copyRecursive(contentDir, path.join(__dirname, '..'));
    }
    
    // Restore artifacts (excluding .next to force rebuild)
    if (fs.existsSync(artifactsDir)) {
      const items = fs.readdirSync(artifactsDir);
      
      items.forEach(item => {
        if (item !== '.next') {
          const src = path.join(artifactsDir, item);
          const dest = path.join(__dirname, '..', item);
          this.copyRecursive(src, dest);
        }
      });
    }
  }

  async restoreConfiguration() {
    console.log('⚙️  Restoring configuration...');
    
    const configDir = path.join(this.extractedDir, 'config');
    
    if (fs.existsSync(configDir)) {
      const configFiles = fs.readdirSync(configDir);
      
      configFiles.forEach(file => {
        const src = path.join(configDir, file);
        const dest = path.join(__dirname, '..', file);
        
        // Backup existing config if it exists
        if (fs.existsSync(dest)) {
          fs.copyFileSync(dest, `${dest}.backup`);
        }
        
        fs.copyFileSync(src, dest);
      });
    }
  }

  async rebuildApplication() {
    console.log('🏗️  Rebuilding application...');
    
    try {
      // Install dependencies
      execSync('npm ci', { 
        cwd: path.join(__dirname, '..'),
        stdio: 'inherit' 
      });
      
      // Run build
      execSync('npm run build', { 
        cwd: path.join(__dirname, '..'),
        stdio: 'inherit' 
      });
      
    } catch (error) {
      console.error('❌ Build failed:', error.message);
      throw error;
    }
  }

  copyRecursive(src, dest) {
    const stat = fs.statSync(src);
    
    if (stat.isDirectory()) {
      fs.mkdirSync(dest, { recursive: true });
      const files = fs.readdirSync(src);
      
      files.forEach(file => {
        this.copyRecursive(
          path.join(src, file),
          path.join(dest, file)
        );
      });
    } else {
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.copyFileSync(src, dest);
    }
  }
}

// CLI interface
if (require.main === module) {
  const backupPath = process.argv[2];
  
  if (!backupPath) {
    console.error('Usage: node recovery.js <backup-file.tar.gz>');
    process.exit(1);
  }
  
  const recovery = new RecoveryManager(backupPath);
  recovery.restore().catch(error => {
    console.error('❌ Recovery failed:', error.message);
    process.exit(1);
  });
}

module.exports = RecoveryManager;