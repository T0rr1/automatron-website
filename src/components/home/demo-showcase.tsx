'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Typography } from '@/components/ui/typography'
import { Container, Section } from '@/components/common'
import { 
  Copy, 
  Check, 
  Play, 
  FileText, 
  Database, 
  BarChart3,
  ArrowRight,
  Download,
  Eye,
  AlertCircle
} from 'lucide-react'
import { CodeDisplay } from './code-display'
import { WorkflowDiagram } from './workflow-diagram'
import { SampleOutput } from './sample-output'

interface DemoExample {
  id: string
  title: string
  description: string
  category: 'scripting' | 'reporting' | 'hygiene'
  icon: React.ReactNode
  beforeScenario: string
  afterScenario: string
  timeSaved: string
  sampleCode: {
    language: 'powershell' | 'python'
    code: string
    filename: string
  }
  sampleInputs: Array<{
    name: string
    type: string
    example: string
  }>
  sampleOutputs: Array<{
    name: string
    type: string
    preview: string
  }>
  workflow: {
    steps: Array<{
      title: string
      description: string
      type: 'input' | 'process' | 'output'
    }>
  }
}

const demoExamples: DemoExample[] = [
  {
    id: 'file-cleanup',
    title: 'Automated File Cleanup',
    description: 'Organize and archive files based on age, type, and naming patterns',
    category: 'scripting',
    icon: <FileText className="w-5 h-5" />,
    beforeScenario: 'Manually sorting through hundreds of files in Downloads folder every week',
    afterScenario: 'Automated script runs weekly, organizing files into proper folders with backup',
    timeSaved: '2-3 hours/week',
    sampleCode: {
      language: 'powershell',
      filename: 'Organize-Downloads.ps1',
      code: `# Automated File Organization Script
# Safely moves files based on type and age with logging

param(
    [string]$SourcePath = "$env:USERPROFILE\\Downloads",
    [string]$DestinationBase = "$env:USERPROFILE\\Documents\\Organized",
    [int]$DaysOld = 7,
    [switch]$DryRun
)

# Create organized folder structure
$folders = @{
    'Documents' = @('*.pdf', '*.doc', '*.docx', '*.txt')
    'Images' = @('*.jpg', '*.jpeg', '*.png', '*.gif', '*.bmp')
    'Archives' = @('*.zip', '*.rar', '*.7z', '*.tar')
    'Spreadsheets' = @('*.xlsx', '*.xls', '*.csv')
}

Write-Host "Starting file organization..." -ForegroundColor Green
Write-Host "Source: $SourcePath" -ForegroundColor Cyan
Write-Host "Dry Run: $($DryRun.IsPresent)" -ForegroundColor Yellow

$moveCount = 0
foreach ($category in $folders.Keys) {
    $destFolder = Join-Path $DestinationBase $category
    
    if (-not $DryRun -and -not (Test-Path $destFolder)) {
        New-Item -Path $destFolder -ItemType Directory -Force | Out-Null
        Write-Host "Created folder: $destFolder" -ForegroundColor Green
    }
    
    foreach ($pattern in $folders[$category]) {
        $files = Get-ChildItem -Path $SourcePath -Filter $pattern | 
                 Where-Object { $_.LastWriteTime -lt (Get-Date).AddDays(-$DaysOld) }
        
        foreach ($file in $files) {
            if ($DryRun) {
                Write-Host "Would move: $($file.Name) -> $category" -ForegroundColor Yellow
            } else {
                Move-Item -Path $file.FullName -Destination $destFolder -Force
                Write-Host "Moved: $($file.Name) -> $category" -ForegroundColor Green
            }
            $moveCount++
        }
    }
}

Write-Host "Organization complete! Processed $moveCount files." -ForegroundColor Green`
    },
    sampleInputs: [
      {
        name: 'Downloads Folder',
        type: 'Directory',
        example: '247 mixed files (PDFs, images, documents, archives)'
      },
      {
        name: 'Age Threshold',
        type: 'Parameter',
        example: '7 days (configurable)'
      }
    ],
    sampleOutputs: [
      {
        name: 'Organized Structure',
        type: 'Directory Tree',
        preview: 'Documents/Organized/\n├── Documents/ (45 files)\n├── Images/ (89 files)\n├── Archives/ (12 files)\n└── Spreadsheets/ (23 files)'
      },
      {
        name: 'Activity Log',
        type: 'Log File',
        preview: 'Moved: report-2024.pdf -> Documents\nMoved: vacation.jpg -> Images\nProcessed 169 files successfully'
      }
    ],
    workflow: {
      steps: [
        {
          title: 'Scan Source Folder',
          description: 'Identify files older than threshold',
          type: 'input'
        },
        {
          title: 'Categorize by Type',
          description: 'Group files by extension patterns',
          type: 'process'
        },
        {
          title: 'Create Folder Structure',
          description: 'Build organized directory tree',
          type: 'process'
        },
        {
          title: 'Move Files Safely',
          description: 'Transfer with backup and logging',
          type: 'output'
        }
      ]
    }
  },
  {
    id: 'csv-merge',
    title: 'CSV Data Merging',
    description: 'Combine multiple CSV files with data validation and formatting',
    category: 'reporting',
    icon: <Database className="w-5 h-5" />,
    beforeScenario: 'Manually copying data between Excel files, prone to errors and formatting issues',
    afterScenario: 'Automated merging with validation, duplicate detection, and formatted output',
    timeSaved: '3-4 hours/week',
    sampleCode: {
      language: 'python',
      filename: 'merge_csv_reports.py',
      code: `#!/usr/bin/env python3
"""
CSV Merge and Validation Tool
Combines multiple CSV files with data validation and formatting
"""

import pandas as pd
import glob
import os
from datetime import datetime
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('csv_merge.log'),
        logging.StreamHandler()
    ]
)

def merge_csv_files(input_pattern, output_file, required_columns=None):
    """
    Merge multiple CSV files with validation
    
    Args:
        input_pattern (str): Glob pattern for input files
        output_file (str): Path for merged output file
        required_columns (list): Required column names for validation
    """
    
    # Find all matching CSV files
    csv_files = glob.glob(input_pattern)
    if not csv_files:
        logging.error(f"No files found matching pattern: {input_pattern}")
        return False
    
    logging.info(f"Found {len(csv_files)} CSV files to merge")
    
    merged_data = []
    file_stats = {}
    
    for file_path in csv_files:
        try:
            # Read CSV with error handling
            df = pd.read_csv(file_path, encoding='utf-8-sig')
            
            # Validate required columns
            if required_columns:
                missing_cols = set(required_columns) - set(df.columns)
                if missing_cols:
                    logging.warning(f"File {file_path} missing columns: {missing_cols}")
                    continue
            
            # Add source file column for tracking
            df['source_file'] = os.path.basename(file_path)
            df['processed_date'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            
            # Clean data
            df = df.dropna(how='all')  # Remove empty rows
            df = df.drop_duplicates()  # Remove duplicates
            
            merged_data.append(df)
            file_stats[file_path] = len(df)
            
            logging.info(f"Processed {file_path}: {len(df)} rows")
            
        except Exception as e:
            logging.error(f"Error processing {file_path}: {str(e)}")
            continue
    
    if not merged_data:
        logging.error("No valid data to merge")
        return False
    
    # Combine all dataframes
    final_df = pd.concat(merged_data, ignore_index=True, sort=False)
    
    # Remove duplicates across files
    initial_count = len(final_df)
    final_df = final_df.drop_duplicates(subset=[col for col in final_df.columns 
                                               if col not in ['source_file', 'processed_date']])
    final_count = len(final_df)
    
    logging.info(f"Removed {initial_count - final_count} duplicate records")
    
    # Save merged file
    final_df.to_csv(output_file, index=False, encoding='utf-8-sig')
    
    # Generate summary report
    summary = {
        'total_files_processed': len(csv_files),
        'total_records': final_count,
        'duplicates_removed': initial_count - final_count,
        'output_file': output_file,
        'file_breakdown': file_stats
    }
    
    logging.info(f"Merge complete! {final_count} records saved to {output_file}")
    return summary

if __name__ == "__main__":
    # Example usage
    required_cols = ['Name', 'Email', 'Date', 'Amount']
    
    result = merge_csv_files(
        input_pattern="reports/*.csv",
        output_file="merged_report.csv",
        required_columns=required_cols
    )
    
    if result:
        print(f"Success! Merged {result['total_records']} records")
    else:
        print("Merge failed - check logs for details")`
    },
    sampleInputs: [
      {
        name: 'Multiple CSV Files',
        type: 'File Set',
        example: 'sales_jan.csv, sales_feb.csv, sales_mar.csv (3 files, ~500 rows each)'
      },
      {
        name: 'Required Columns',
        type: 'Configuration',
        example: 'Name, Email, Date, Amount (validation rules)'
      }
    ],
    sampleOutputs: [
      {
        name: 'Merged Dataset',
        type: 'CSV File',
        preview: 'merged_report.csv\n1,247 total records\n23 duplicates removed\nValidated and formatted'
      },
      {
        name: 'Processing Log',
        type: 'Log File',
        preview: 'Processed sales_jan.csv: 487 rows\nProcessed sales_feb.csv: 523 rows\nRemoved 23 duplicate records'
      }
    ],
    workflow: {
      steps: [
        {
          title: 'Scan Input Files',
          description: 'Find all CSV files matching pattern',
          type: 'input'
        },
        {
          title: 'Validate Structure',
          description: 'Check required columns and data types',
          type: 'process'
        },
        {
          title: 'Clean & Deduplicate',
          description: 'Remove empty rows and duplicates',
          type: 'process'
        },
        {
          title: 'Generate Report',
          description: 'Create merged file with summary log',
          type: 'output'
        }
      ]
    }
  },
  {
    id: 'report-generation',
    title: 'Automated Report Generation',
    description: 'Create formatted Excel reports with charts and summaries',
    category: 'reporting',
    icon: <BarChart3 className="w-5 h-5" />,
    beforeScenario: 'Spending hours manually formatting Excel reports and creating charts',
    afterScenario: 'One-click report generation with professional formatting and visualizations',
    timeSaved: '4-5 hours/week',
    sampleCode: {
      language: 'python',
      filename: 'generate_sales_report.py',
      code: `#!/usr/bin/env python3
"""
Automated Excel Report Generator
Creates professional reports with charts and formatting
"""

import pandas as pd
import openpyxl
from openpyxl.chart import BarChart, Reference, LineChart
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils.dataframe import dataframe_to_rows
from datetime import datetime
import os

class ReportGenerator:
    def __init__(self, data_file, template_config=None):
        self.data_file = data_file
        self.config = template_config or self.default_config()
        self.workbook = openpyxl.Workbook()
        
    def default_config(self):
        return {
            'title_font': Font(name='Arial', size=16, bold=True, color='FFFFFF'),
            'header_font': Font(name='Arial', size=12, bold=True),
            'title_fill': PatternFill(start_color='366092', end_color='366092', fill_type='solid'),
            'header_fill': PatternFill(start_color='D9E2F3', end_color='D9E2F3', fill_type='solid'),
            'border': Border(
                left=Side(style='thin'),
                right=Side(style='thin'),
                top=Side(style='thin'),
                bottom=Side(style='thin')
            )
        }
    
    def load_and_process_data(self):
        """Load data and perform basic analysis"""
        try:
            self.df = pd.read_csv(self.data_file)
            
            # Basic data processing
            if 'Date' in self.df.columns:
                self.df['Date'] = pd.to_datetime(self.df['Date'])
                self.df['Month'] = self.df['Date'].dt.strftime('%Y-%m')
            
            # Calculate summary statistics
            self.summary_stats = {
                'total_records': len(self.df),
                'date_range': f"{self.df['Date'].min().strftime('%Y-%m-%d')} to {self.df['Date'].max().strftime('%Y-%m-%d')}" if 'Date' in self.df.columns else 'N/A',
                'total_amount': self.df['Amount'].sum() if 'Amount' in self.df.columns else 0,
                'avg_amount': self.df['Amount'].mean() if 'Amount' in self.df.columns else 0
            }
            
            return True
            
        except Exception as e:
            print(f"Error loading data: {e}")
            return False
    
    def create_summary_sheet(self):
        """Create executive summary sheet"""
        ws = self.workbook.active
        ws.title = "Executive Summary"
        
        # Title
        ws['A1'] = f"Sales Report - {datetime.now().strftime('%B %Y')}"
        ws['A1'].font = self.config['title_font']
        ws['A1'].fill = self.config['title_fill']
        ws['A1'].alignment = Alignment(horizontal='center')
        ws.merge_cells('A1:D1')
        
        # Summary metrics
        summary_data = [
            ['Metric', 'Value'],
            ['Total Records', self.summary_stats['total_records']],
            ['Date Range', self.summary_stats['date_range']],
            ['Total Amount', f"$\{self.summary_stats['total_amount']:,.2f}"],
            ['Average Amount', f"$\{self.summary_stats['avg_amount']:,.2f}"]
        ]
        
        for row_idx, row_data in enumerate(summary_data, start=3):
            for col_idx, value in enumerate(row_data, start=1):
                cell = ws.cell(row=row_idx, column=col_idx, value=value)
                if row_idx == 3:  # Header row
                    cell.font = self.config['header_font']
                    cell.fill = self.config['header_fill']
                cell.border = self.config['border']
        
        # Auto-adjust column widths
        for column in ws.columns:
            max_length = 0
            column_letter = column[0].column_letter
            for cell in column:
                try:
                    if len(str(cell.value)) > max_length:
                        max_length = len(str(cell.value))
                except:
                    pass
            adjusted_width = min(max_length + 2, 50)
            ws.column_dimensions[column_letter].width = adjusted_width
    
    def create_data_sheet(self):
        """Create detailed data sheet"""
        ws = self.workbook.create_sheet("Detailed Data")
        
        # Add data to worksheet
        for r in dataframe_to_rows(self.df, index=False, header=True):
            ws.append(r)
        
        # Format header row
        for cell in ws[1]:
            cell.font = self.config['header_font']
            cell.fill = self.config['header_fill']
            cell.border = self.config['border']
        
        # Format data rows
        for row in ws.iter_rows(min_row=2, max_row=ws.max_row):
            for cell in row:
                cell.border = self.config['border']
        
        # Auto-adjust column widths
        for column in ws.columns:
            max_length = 0
            column_letter = column[0].column_letter
            for cell in column:
                try:
                    if len(str(cell.value)) > max_length:
                        max_length = len(str(cell.value))
                except:
                    pass
            adjusted_width = min(max_length + 2, 50)
            ws.column_dimensions[column_letter].width = adjusted_width
    
    def create_charts_sheet(self):
        """Create charts and visualizations"""
        if 'Amount' not in self.df.columns or 'Month' not in self.df.columns:
            return
            
        ws = self.workbook.create_sheet("Charts")
        
        # Monthly summary data
        monthly_summary = self.df.groupby('Month')['Amount'].sum().reset_index()
        
        # Add monthly data to sheet
        ws['A1'] = 'Month'
        ws['B1'] = 'Total Amount'
        
        for idx, (month, amount) in enumerate(zip(monthly_summary['Month'], monthly_summary['Amount']), start=2):
            ws[f'A{idx}'] = month
            ws[f'B{idx}'] = amount
        
        # Create bar chart
        chart = BarChart()
        chart.title = "Monthly Sales Summary"
        chart.y_axis.title = 'Amount ($)'
        chart.x_axis.title = 'Month'
        
        data = Reference(ws, min_col=2, min_row=1, max_row=len(monthly_summary) + 1)
        categories = Reference(ws, min_col=1, min_row=2, max_row=len(monthly_summary) + 1)
        
        chart.add_data(data, titles_from_data=True)
        chart.set_categories(categories)
        
        ws.add_chart(chart, "D2")
    
    def generate_report(self, output_file):
        """Generate complete report"""
        print("Loading and processing data...")
        if not self.load_and_process_data():
            return False
        
        print("Creating summary sheet...")
        self.create_summary_sheet()
        
        print("Creating detailed data sheet...")
        self.create_data_sheet()
        
        print("Creating charts...")
        self.create_charts_sheet()
        
        # Save workbook
        self.workbook.save(output_file)
        print(f"Report generated successfully: {output_file}")
        
        return True

if __name__ == "__main__":
    # Generate report
    generator = ReportGenerator("sales_data.csv")
    
    output_filename = f"sales_report_\{datetime.now().strftime('%Y%m%d')}.xlsx"
    
    if generator.generate_report(output_filename):
        print(f"✅ Report ready: \{output_filename}")
        print(f"📊 \{generator.summary_stats['total_records']} records processed")
        print(f"💰 Total: $\{generator.summary_stats['total_amount']:,.2f}")
    else:
        print("❌ Report generation failed")`
    },
    sampleInputs: [
      {
        name: 'Sales Data CSV',
        type: 'Data File',
        example: 'sales_data.csv (Date, Customer, Amount, Category columns)'
      },
      {
        name: 'Report Template',
        type: 'Configuration',
        example: 'Company branding, chart types, summary metrics'
      }
    ],
    sampleOutputs: [
      {
        name: 'Formatted Excel Report',
        type: 'XLSX File',
        preview: 'sales_report_20241224.xlsx\n• Executive Summary\n• Detailed Data\n• Charts & Visualizations'
      },
      {
        name: 'Summary Statistics',
        type: 'Metrics',
        preview: '1,247 records processed\n$45,678 total sales\n$36.75 average transaction'
      }
    ],
    workflow: {
      steps: [
        {
          title: 'Load Data Source',
          description: 'Import CSV with validation',
          type: 'input'
        },
        {
          title: 'Process & Analyze',
          description: 'Calculate summaries and metrics',
          type: 'process'
        },
        {
          title: 'Apply Formatting',
          description: 'Professional styling and layout',
          type: 'process'
        },
        {
          title: 'Generate Charts',
          description: 'Create visualizations and export',
          type: 'output'
        }
      ]
    }
  }
]

export function DemoShowcase() {
  const [activeDemo, setActiveDemo] = useState<string>(demoExamples[0].id)
  const [activeTab, setActiveTab] = useState<'overview' | 'code' | 'workflow' | 'samples'>('overview')

  const currentDemo = demoExamples.find(demo => demo.id === activeDemo) || demoExamples[0]

  return (
    <Section 
      as="section"
      padding="lg" 
      background="muted" 
      className="demo-section section--alt relative"
      aria-label="Interactive automation demos"
    >
      <Container>
        <div className="text-center space-y-6 mb-12">
          <Badge variant="automation" className="mb-4">
            🔧 Live Examples
          </Badge>
          
          <Typography variant="h2" className="text-3xl lg:text-4xl font-bold">
            See Automation in Action
          </Typography>
          
          <Typography variant="lead" className="max-w-3xl mx-auto text-muted-foreground">
            Explore real automation examples with sample code, workflows, and outputs. 
            All examples are simulated and run locally for safety.
          </Typography>

          {/* Safety Notice */}
          <div className="callout flex items-center justify-center gap-2 max-w-2xl mx-auto">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
            <Typography variant="small" className="text-amber-800 dark:text-amber-200">
              These are demonstration examples that run locally. No code is executed on our servers.
            </Typography>
          </div>
        </div>

        {/* Demo Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {demoExamples.map((demo) => (
            <button
              key={demo.id}
              onClick={() => {
                setActiveDemo(demo.id)
                setActiveTab('overview')
              }}
              className={`p-6 rounded-lg border-2 transition-all duration-200 text-left hover:scale-105 ${
                activeDemo === demo.id
                  ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/20'
                  : 'border-border bg-background hover:border-brand-300'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-full ${
                  activeDemo === demo.id
                    ? 'bg-brand-500 text-white'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {demo.icon}
                </div>
                <Typography variant="h4" className="font-semibold">
                  {demo.title}
                </Typography>
              </div>
              
              <Typography variant="small" className="text-muted-foreground mb-3">
                {demo.description}
              </Typography>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant={demo.category === 'scripting' ? 'default' : 'secondary'} className="text-xs">
                    {demo.category}
                  </Badge>
                  <Typography variant="small" className="font-medium text-automation-600 dark:text-automation-400">
                    Saves {demo.timeSaved}
                  </Typography>
                </div>
                
                {/* Social proof line */}
                <div className="text-xs text-gray-500 dark:text-gray-400 italic">
                  {demo.id === 'file-cleanup' && '"Took my file sorting from 2 hrs to 10 min." — Local shop'}
                  {demo.id === 'csv-merge' && '"Cut my report prep from 4 hrs to 15 min." — Data analyst'}
                  {demo.id === 'report-generation' && '"My weekly reports now generate themselves." — Manager'}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Demo Content */}
        <div className="demo-card bg-background rounded-lg border shadow-sm">
          {/* Tab Navigation */}
          <div className="border-b">
            <div className="flex flex-wrap gap-1 p-1">
              {[
                { id: 'overview', label: 'Overview', icon: <Eye className="w-4 h-4" /> },
                { id: 'code', label: 'Sample Code', icon: <FileText className="w-4 h-4" /> },
                { id: 'workflow', label: 'Workflow', icon: <ArrowRight className="w-4 h-4" /> },
                { id: 'samples', label: 'Input/Output', icon: <Database className="w-4 h-4" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <Typography variant="h3" className="text-xl font-semibold mb-4">
                    {currentDemo.title}
                  </Typography>
                  <Typography variant="p" className="text-muted-foreground">
                    {currentDemo.description}
                  </Typography>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Typography variant="h4" className="font-medium mb-2 text-red-600 dark:text-red-400">
                        Before (Manual Process)
                      </Typography>
                      <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <Typography variant="small" className="text-red-800 dark:text-red-200">
                          {currentDemo.beforeScenario}
                        </Typography>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Typography variant="h4" className="font-medium mb-2 text-green-600 dark:text-green-400">
                        After (Automated)
                      </Typography>
                      <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                        <Typography variant="small" className="text-green-800 dark:text-green-200">
                          {currentDemo.afterScenario}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center p-6 bg-automation-50 dark:bg-automation-950/20 border border-automation-200 dark:border-automation-800 rounded-lg">
                  <div className="text-center">
                    <Typography variant="h3" className="text-2xl font-bold text-automation-600 dark:text-automation-400 mb-2">
                      {currentDemo.timeSaved}
                    </Typography>
                    <Typography variant="small" className="text-automation-700 dark:text-automation-300">
                      Time Saved Per Week
                    </Typography>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'code' && (
              <CodeDisplay
                code={currentDemo.sampleCode.code}
                language={currentDemo.sampleCode.language}
                filename={currentDemo.sampleCode.filename}
              />
            )}

            {activeTab === 'workflow' && (
              <WorkflowDiagram workflow={currentDemo.workflow} />
            )}

            {activeTab === 'samples' && (
              <SampleOutput
                inputs={currentDemo.sampleInputs}
                outputs={currentDemo.sampleOutputs}
              />
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12 space-y-6">
          <Typography variant="h3" className="text-xl font-semibold">
            Ready to Automate Your Workflows?
          </Typography>
          
          <div className="flex flex-col gap-4 justify-center max-w-md mx-auto">
            <Link href="/contact" className="w-full">
              <Button size="lg" className="w-full group h-[56px]">
                Use This For My Business
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            
            <Link href="/downloads" className="text-emerald-700 hover:text-emerald-800 underline font-medium">
              Download Sample (ZIP)
            </Link>
          </div>

          <Typography variant="small" className="text-muted-foreground">
            All scripts include documentation, configuration files, and safety features
          </Typography>
        </div>
      </Container>
    </Section>
  )
}