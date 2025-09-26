#!/usr/bin/env node

/**
 * Backup and Recovery Procedures Script
 * Sets up automated backups and recovery procedures for the website
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const backupConfig = {
  schedule: {
    content: 'daily', // Content and configuration backup
    database: 'hourly', // If database is added later
    deployment: 'on-release' // Deployment artifacts
  },
  retention: {
    daily: 30, // Keep 30 daily backups
    weekly: 12, // Keep 12 weekly backups
    monthly: 12 // Keep 12 monthly backups
  },
  storage: {
    primary: 'vercel-blob', // Vercel Blob Storage
    secondary: 'github', // Git repository
    offsite: 's3' // AWS S3 for critical backups
  }
};

function generateBackupScript() {
  const backupScript = `#!/usr/bin/env node

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
    console.log(\`📦 Backup location: \${this.backupDir}.tar.gz\`);
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
      execSync(\`tar -czf "\${this.backupDir}.tar.gz" -C "\${path.dirname(this.backupDir)}" "\${path.basename(this.backupDir)}"\`);
      
      // Remove uncompressed directory
      execSync(\`rm -rf "\${this.backupDir}"\`);
      
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

module.exports = BackupManager;`;

  fs.writeFileSync(
    path.join(__dirname, '../scripts/backup.js'),
    backupScript
  );
}

function generateRecoveryScript() {
  const recoveryScript = `#!/usr/bin/env node

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
      throw new Error(\`Backup file not found: \${this.backupPath}\`);
    }
    
    // Check if it's a valid tar.gz file
    try {
      execSync(\`tar -tzf "\${this.backupPath}" > /dev/null\`);
    } catch (error) {
      throw new Error('Invalid backup archive format');
    }
  }

  async extractBackup() {
    console.log('📦 Extracting backup archive...');
    
    fs.mkdirSync(this.recoveryDir, { recursive: true });
    
    execSync(\`tar -xzf "\${this.backupPath}" -C "\${this.recoveryDir}"\`);
    
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
    
    console.log(\`📋 Backup info:\`);
    console.log(\`  - Timestamp: \${manifest.timestamp}\`);
    console.log(\`  - Version: \${manifest.version}\`);
    console.log(\`  - Git commit: \${manifest.gitCommit}\`);
    console.log(\`  - Environment: \${manifest.environment}\`);
    
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
          console.warn(\`⚠️  Checksum mismatch: \${filePath}\`);
          failed++;
        }
      }
    });
    
    console.log(\`✅ Verified \${verified} files, \${failed} failed\`);
    
    if (failed > 0) {
      throw new Error(\`Backup integrity check failed: \${failed} files corrupted\`);
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
          fs.copyFileSync(dest, \`\${dest}.backup\`);
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

module.exports = RecoveryManager;`;

  fs.writeFileSync(
    path.join(__dirname, '../scripts/recovery.js'),
    recoveryScript
  );
}

function generateBackupWorkflow() {
  const workflowContent = `name: Automated Backup

on:
  schedule:
    # Daily backup at 2 AM UTC
    - cron: '0 2 * * *'
  workflow_dispatch:
    inputs:
      backup_type:
        description: 'Type of backup to create'
        required: true
        default: 'full'
        type: choice
        options:
          - full
          - content-only
          - config-only

jobs:
  backup:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      with:
        fetch-depth: 0 # Full history for complete backup
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        cache-dependency-path: 'automatron-website/package-lock.json'
    
    - name: Install dependencies
      working-directory: ./automatron-website
      run: npm ci
    
    - name: Create backup
      working-directory: ./automatron-website
      run: node scripts/backup.js
      env:
        BACKUP_TYPE: \${{ github.event.inputs.backup_type || 'full' }}
    
    - name: Upload backup to artifacts
      uses: actions/upload-artifact@v3
      with:
        name: website-backup-\${{ github.run_number }}
        path: automatron-website/backups/*.tar.gz
        retention-days: 90
    
    - name: Upload to S3 (if configured)
      if: env.AWS_ACCESS_KEY_ID
      working-directory: ./automatron-website
      run: |
        # Install AWS CLI
        curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
        unzip awscliv2.zip
        sudo ./aws/install
        
        # Upload backup
        aws s3 cp backups/ s3://\${{ secrets.BACKUP_S3_BUCKET }}/automatron-website/ --recursive --exclude "*" --include "*.tar.gz"
      env:
        AWS_ACCESS_KEY_ID: \${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
        AWS_DEFAULT_REGION: \${{ secrets.AWS_DEFAULT_REGION }}
    
    - name: Cleanup old backups
      working-directory: ./automatron-website
      run: |
        # Keep only last 7 local backups
        ls -t backups/*.tar.gz | tail -n +8 | xargs -r rm
    
    - name: Notify backup completion
      if: failure()
      uses: actions/github-script@v7
      with:
        script: |
          github.rest.issues.create({
            owner: context.repo.owner,
            repo: context.repo.repo,
            title: 'Backup Failed - \${{ github.run_number }}',
            body: 'Automated backup failed. Please check the workflow logs and investigate.',
            labels: ['backup', 'critical']
          });`;

  fs.writeFileSync(
    path.join(__dirname, '../.github/workflows/backup.yml'),
    workflowContent
  );
}

function generateBackupDocumentation() {
  const documentation = `# Backup and Recovery Procedures

## Overview
This document outlines the backup and recovery procedures for the Automatron.ai website.

## Backup Strategy

### What is Backed Up
- **Content**: All MDX files, images, and static assets
- **Configuration**: Package files, Next.js config, environment templates
- **Code**: Source code, components, and utilities
- **Deployment**: Scripts, workflows, and deployment configurations

### Backup Schedule
- **Daily**: Full backup at 2 AM UTC
- **On-demand**: Manual backups via GitHub Actions
- **Pre-deployment**: Automatic backup before major releases

### Storage Locations
1. **GitHub Actions Artifacts** (90 days retention)
2. **AWS S3** (long-term storage, if configured)
3. **Local Development** (manual backups)

## Creating Backups

### Automated Backups
Backups are automatically created daily via GitHub Actions:
\`\`\`bash
# Trigger manual backup
gh workflow run backup.yml
\`\`\`

### Manual Backups
\`\`\`bash
# Create full backup
npm run backup

# Or use the script directly
node scripts/backup.js
\`\`\`

### Backup Contents
Each backup includes:
- Compressed archive (.tar.gz)
- Manifest file with metadata
- File checksums for integrity verification
- Git commit information

## Recovery Procedures

### Full Site Recovery
\`\`\`bash
# Download backup archive
# Extract and restore
node scripts/recovery.js path/to/backup.tar.gz
\`\`\`

### Partial Recovery
\`\`\`bash
# Extract specific files from backup
tar -xzf backup.tar.gz specific/file/path
\`\`\`

### Emergency Recovery Steps
1. **Assess the situation**
   - Identify what needs to be recovered
   - Determine the scope of the issue

2. **Select appropriate backup**
   - Check backup manifest for timestamp and version
   - Verify backup integrity

3. **Prepare recovery environment**
   - Ensure clean working directory
   - Backup current state if partially functional

4. **Execute recovery**
   - Run recovery script
   - Verify restored files
   - Test functionality

5. **Validate recovery**
   - Run tests
   - Check critical functionality
   - Monitor for issues

## Backup Verification

### Integrity Checks
- SHA256 checksums for all files
- Manifest validation
- Archive format verification

### Test Restores
- Monthly test restores to verify backup quality
- Automated validation in staging environment

## Disaster Recovery

### RTO/RPO Targets
- **Recovery Time Objective (RTO)**: 4 hours
- **Recovery Point Objective (RPO)**: 24 hours

### Escalation Procedures
1. **Level 1**: Automated recovery attempts
2. **Level 2**: Manual recovery by development team
3. **Level 3**: Full disaster recovery with external support

### Communication Plan
- Status page updates
- Team notifications
- Customer communication (if applicable)

## Monitoring and Alerting

### Backup Monitoring
- Daily backup success/failure alerts
- Storage capacity monitoring
- Backup integrity verification

### Recovery Testing
- Monthly recovery drills
- Automated recovery validation
- Documentation updates

## Security Considerations

### Backup Security
- Encrypted storage for sensitive data
- Access controls on backup storage
- Audit logging for backup access

### Recovery Security
- Verification of backup authenticity
- Secure recovery procedures
- Post-recovery security validation

## Maintenance

### Regular Tasks
- Review backup logs weekly
- Test recovery procedures monthly
- Update documentation quarterly
- Review and update retention policies annually

### Backup Cleanup
- Automated cleanup of old backups
- Archive important historical backups
- Monitor storage usage

## Troubleshooting

### Common Issues
1. **Backup fails to create**
   - Check disk space
   - Verify permissions
   - Review error logs

2. **Recovery fails**
   - Verify backup integrity
   - Check target directory permissions
   - Ensure dependencies are available

3. **Partial corruption**
   - Use checksums to identify corrupted files
   - Restore only affected files
   - Verify application functionality

### Support Contacts
- Development Team: dev@automatron.ai
- Infrastructure: ops@automatron.ai
- Emergency: +1-XXX-XXX-XXXX`;

  fs.writeFileSync(
    path.join(__dirname, '../deployment/backup-recovery.md'),
    documentation
  );
}

function main() {
  console.log('💾 Setting up backup and recovery procedures...');
  
  // Create necessary directories
  const dirs = ['backups', 'recovery'];
  dirs.forEach(dir => {
    const dirPath = path.join(__dirname, '..', dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });
  
  // Generate scripts and documentation
  generateBackupScript();
  generateRecoveryScript();
  generateBackupWorkflow();
  generateBackupDocumentation();
  
  console.log('✅ Backup and recovery setup complete!');
  console.log('📋 Files created:');
  console.log('  - scripts/backup.js');
  console.log('  - scripts/recovery.js');
  console.log('  - .github/workflows/backup.yml');
  console.log('  - deployment/backup-recovery.md');
  console.log('');
  console.log('🚀 Next steps:');
  console.log('  1. Test backup creation: npm run backup');
  console.log('  2. Configure S3 storage (optional)');
  console.log('  3. Set up monitoring alerts');
  console.log('  4. Schedule regular recovery tests');
  console.log('  5. Review and customize retention policies');
}

if (require.main === module) {
  main();
}

module.exports = {
  backupConfig,
  generateBackupScript,
  generateRecoveryScript,
  generateBackupWorkflow,
  generateBackupDocumentation
};