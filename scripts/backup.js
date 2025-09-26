#!/usr/bin/env node

/**
 * Automated Backup Script for Automatron.ai
 * Backs up content, configuration, and deployment artifacts
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { createHash } = require('crypto');

class BackupManager {
  constructor() {
    this.timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    this.backupDir = path.join(__dirname, '../backups', this.timestamp);
  }

  async createBackup() {
    console.log('🔄 Starting backup process...');
    
    // Create backup directory
    fs.mkdirSync(this.backupDir, { recursive: true });
    
    // Backup content
    await this.backupContent();
    
    // Backup configuration
    await this.backupConfiguration();
    
    // Backup deployment artifacts
    await this.backupDeploymentArtifacts();
    
    // Create manifest
    await this.createManifest();
    
    // Compress backup
    await this.compressBackup();
    
    console.log('✅ Backup completed successfully');
    console.log(`📦 Backup location: ${this.backupDir}.tar.gz`);
  }

  async backupContent() {
    console.log('📄 Backing up content...');
    
    const contentSources = [
      'content/',
      'messages/',
      'public/',
      'src/app/',
      'src/components/',
      'src/lib/'
    ];
    
    contentSources.forEach(source => {
      const sourcePath = path.join(__dirname, '..', source);
      const destPath = path.join(this.backupDir, 'content', source);
      
      if (fs.existsSync(sourcePath)) {
        fs.mkdirSync(path.dirname(destPath), { recursive: true });
        this.copyRecursive(sourcePath, destPath);
      }
    });
  }

  async backupConfiguration() {
    console.log('⚙️  Backing up configuration...');
    
    const configFiles = [
      'package.json',
      'package-lock.json',
      'next.config.js',
      'tailwind.config.ts',
      'tsconfig.json',
      'vercel.json',
      '.env.example',
      '.env.production',
      '.env.staging',
      'components.json',
      'next-sitemap.config.js',
      'playwright.config.ts',
      'vitest.config.ts',
      'lighthouserc.js'
    ];
    
    const configDir = path.join(this.backupDir, 'config');
    fs.mkdirSync(configDir, { recursive: true });
    
    configFiles.forEach(file => {
      const sourcePath = path.join(__dirname, '..', file);
      const destPath = path.join(configDir, file);
      
      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, destPath);
      }
    });
  }

  async backupDeploymentArtifacts() {
    console.log('🚀 Backing up deployment artifacts...');
    
    const artifactSources = [
      '.next/',
      'deployment/',
      'monitoring/',
      'scripts/',
      '.github/'
    ];
    
    artifactSources.forEach(source => {
      const sourcePath = path.join(__dirname, '..', source);
      const destPath = path.join(this.backupDir, 'artifacts', source);
      
      if (fs.existsSync(sourcePath)) {
        fs.mkdirSync(path.dirname(destPath), { recursive: true });
        this.copyRecursive(sourcePath, destPath);
      }
    });
  }

  async createManifest() {
    console.log('📋 Creating backup manifest...');
    
    const manifest = {
      timestamp: this.timestamp,
      version: this.getVersion(),
      gitCommit: this.getGitCommit(),
      gitBranch: this.getGitBranch(),
      environment: process.env.NODE_ENV || 'development',
      files: this.getFileList(this.backupDir),
      checksums: this.calculateChecksums(this.backupDir),
      size: this.getDirectorySize(this.backupDir)
    };
    
    fs.writeFileSync(
      path.join(this.backupDir, 'manifest.json'),
      JSON.stringify(manifest, null, 2)
    );
  }

  async compressBackup() {
    console.log('🗜️  Compressing backup...');
    
    try {
      execSync(`tar -czf "${this.backupDir}.tar.gz" -C "${path.dirname(this.backupDir)}" "${path.basename(this.backupDir)}"`);
      
      // Remove uncompressed directory
      execSync(`rm -rf "${this.backupDir}"`);
      
    } catch (error) {
      console.error('❌ Compression failed:', error.message);
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
      fs.copyFileSync(src, dest);
    }
  }

  getVersion() {
    try {
      const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));
      return packageJson.version;
    } catch {
      return 'unknown';
    }
  }

  getGitCommit() {
    try {
      return execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
    } catch {
      return process.env.VERCEL_GIT_COMMIT_SHA || 'unknown';
    }
  }

  getGitBranch() {
    try {
      return execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
    } catch {
      return process.env.VERCEL_GIT_COMMIT_REF || 'unknown';
    }
  }

  getFileList(dir) {
    const files = [];
    
    function walk(currentDir) {
      const items = fs.readdirSync(currentDir);
      
      items.forEach(item => {
        const fullPath = path.join(currentDir, item);
        const relativePath = path.relative(dir, fullPath);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          walk(fullPath);
        } else {
          files.push({
            path: relativePath,
            size: stat.size,
            modified: stat.mtime.toISOString()
          });
        }
      });
    }
    
    walk(dir);
    return files;
  }

  calculateChecksums(dir) {
    const checksums = {};
    
    function walk(currentDir) {
      const items = fs.readdirSync(currentDir);
      
      items.forEach(item => {
        const fullPath = path.join(currentDir, item);
        const relativePath = path.relative(dir, fullPath);
        const stat = fs.statSync(fullPath);
        
        if (stat.isFile()) {
          const content = fs.readFileSync(fullPath);
          const hash = createHash('sha256').update(content).digest('hex');
          checksums[relativePath] = hash;
        } else if (stat.isDirectory()) {
          walk(fullPath);
        }
      });
    }
    
    walk(dir);
    return checksums;
  }

  getDirectorySize(dir) {
    let size = 0;
    
    function walk(currentDir) {
      const items = fs.readdirSync(currentDir);
      
      items.forEach(item => {
        const fullPath = path.join(currentDir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isFile()) {
          size += stat.size;
        } else if (stat.isDirectory()) {
          walk(fullPath);
        }
      });
    }
    
    walk(dir);
    return size;
  }
}

// CLI interface
if (require.main === module) {
  const backup = new BackupManager();
  backup.createBackup().catch(console.error);
}

module.exports = BackupManager;