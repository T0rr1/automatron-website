# Automatron.ai Sample Scripts

Welcome to our collection of sample automation scripts! These scripts demonstrate the types of automation solutions we create for our clients.

## 🚀 Quick Start

### Prerequisites
- **PowerShell Scripts**: Windows PowerShell 5.1+ or PowerShell Core 7+
- **Python Scripts**: Python 3.7+ with pandas library

### Installation
1. Download the scripts to your preferred directory
2. For Python scripts: `pip install pandas` (if not already installed)
3. Review the script parameters and customize as needed
4. Run in preview mode first to see what changes will be made

## 📁 Available Scripts

### 1. File Organizer (PowerShell)
**File**: `file-organizer.ps1`

Automatically organizes files in your Downloads folder by type (documents, images, videos, etc.).

**Features**:
- Safe preview mode (default)
- Configurable age threshold
- Automatic folder creation
- Detailed logging
- Support for 8 file categories

**Usage**:
```powershell
# Preview what would be organized
.\file-organizer.ps1

# Actually organize files older than 7 days
.\file-organizer.ps1 -Execute

# Organize files older than 30 days with verbose output
.\file-organizer.ps1 -Execute -DaysOld 30 -Verbose

# Organize from custom source folder
.\file-organizer.ps1 -SourcePath "C:\MyFolder" -Execute
```

### 2. CSV Merger (Python)
**File**: `csv-merger.py`

Combines multiple CSV files with data validation, deduplication, and error handling.

**Features**:
- Automatic file discovery
- Column validation
- Duplicate removal
- Data cleaning
- Comprehensive logging
- Source file tracking

**Usage**:
```bash
# Merge all CSV files in data folder
python csv-merger.py "data/*.csv" merged_output.csv

# Merge with required column validation
python csv-merger.py "reports/*.csv" combined.csv --required-columns Name Email Date Amount

# Keep duplicates if needed
python csv-merger.py "sales*.csv" sales_combined.csv --keep-duplicates
```

## 🛡️ Safety Features

All scripts include safety features:

- **Preview Mode**: See what changes will be made before executing
- **Validation**: Check data integrity before processing
- **Logging**: Detailed logs of all operations
- **Error Handling**: Graceful handling of common issues
- **Backup Recommendations**: Suggestions for backing up data

## 🔧 Customization

These scripts are designed to be easily customizable:

1. **File Types**: Modify the `$FileTypes` dictionary in PowerShell or file patterns in Python
2. **Destinations**: Change output folders and naming conventions
3. **Filters**: Adjust age thresholds, size limits, or other criteria
4. **Logging**: Customize log formats and destinations

## 📞 Need Help?

These are simplified examples of our automation capabilities. For production-ready solutions tailored to your specific needs:

- **Free Assessment**: [Contact us](https://automatron.ai/contact) for a free automation assessment
- **Custom Scripts**: We create fully customized automation solutions
- **Support**: Ongoing support and maintenance available
- **Training**: Learn to modify and extend your automation scripts

## 🎯 What's Next?

1. **Try the Scripts**: Run them in preview mode on test data
2. **Identify Opportunities**: Look for repetitive tasks in your workflow
3. **Get Assessment**: Schedule a free consultation to discuss your automation needs
4. **Scale Up**: Let us create production-ready solutions for your business

## 📋 Common Use Cases

Our clients typically automate:

- **File Management**: Organizing downloads, project files, archives
- **Data Processing**: Merging reports, cleaning datasets, format conversion
- **Email Management**: Sorting attachments, organizing inbox rules
- **Report Generation**: Automated Excel reports with charts and formatting
- **System Maintenance**: Cleanup scripts, backup automation, log management
- **Workflow Integration**: Connecting different tools and systems

## 🔒 Security & Privacy

- Scripts run locally on your machine
- No data is sent to external servers
- Source code is fully visible and auditable
- Follow security best practices for your environment

---

**Automatron.ai** - Automating workflows, one script at a time.

Visit us at [automatron.ai](https://automatron.ai) | Email: hello@automatron.ai