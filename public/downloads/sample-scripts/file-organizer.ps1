# Automatron.ai Sample Script - File Organizer
# This script organizes files in your Downloads folder by type
# Safe mode enabled by default - use -Execute to actually move files

param(
    [string]$SourcePath = "$env:USERPROFILE\Downloads",
    [string]$DestinationBase = "$env:USERPROFILE\Documents\Organized",
    [int]$DaysOld = 7,
    [switch]$Execute,
    [switch]$Verbose
)

# File type mappings
$FileTypes = @{
    'Documents' = @('*.pdf', '*.doc', '*.docx', '*.txt', '*.rtf', '*.odt')
    'Images' = @('*.jpg', '*.jpeg', '*.png', '*.gif', '*.bmp', '*.tiff', '*.webp')
    'Videos' = @('*.mp4', '*.avi', '*.mkv', '*.mov', '*.wmv', '*.flv', '*.webm')
    'Audio' = @('*.mp3', '*.wav', '*.flac', '*.aac', '*.ogg', '*.wma')
    'Archives' = @('*.zip', '*.rar', '*.7z', '*.tar', '*.gz', '*.bz2')
    'Spreadsheets' = @('*.xlsx', '*.xls', '*.csv', '*.ods')
    'Presentations' = @('*.pptx', '*.ppt', '*.odp')
    'Code' = @('*.js', '*.py', '*.html', '*.css', '*.json', '*.xml', '*.sql')
}

Write-Host "=== Automatron.ai File Organizer ===" -ForegroundColor Cyan
Write-Host "Source: $SourcePath" -ForegroundColor Yellow
Write-Host "Destination: $DestinationBase" -ForegroundColor Yellow
Write-Host "Age threshold: $DaysOld days" -ForegroundColor Yellow

if (-not $Execute) {
    Write-Host "PREVIEW MODE - No files will be moved" -ForegroundColor Red
    Write-Host "Use -Execute parameter to actually move files" -ForegroundColor Red
}

$totalFiles = 0
$movedFiles = 0

foreach ($category in $FileTypes.Keys) {
    $destFolder = Join-Path $DestinationBase $category
    
    # Create destination folder if it doesn't exist
    if ($Execute -and -not (Test-Path $destFolder)) {
        New-Item -Path $destFolder -ItemType Directory -Force | Out-Null
        Write-Host "Created folder: $destFolder" -ForegroundColor Green
    }
    
    foreach ($pattern in $FileTypes[$category]) {
        $files = Get-ChildItem -Path $SourcePath -Filter $pattern -File | 
                 Where-Object { $_.LastWriteTime -lt (Get-Date).AddDays(-$DaysOld) }
        
        foreach ($file in $files) {
            $totalFiles++
            
            if ($Execute) {
                try {
                    Move-Item -Path $file.FullName -Destination $destFolder -Force
                    $movedFiles++
                    if ($Verbose) {
                        Write-Host "Moved: $($file.Name) -> $category" -ForegroundColor Green
                    }
                } catch {
                    Write-Host "Error moving $($file.Name): $($_.Exception.Message)" -ForegroundColor Red
                }
            } else {
                Write-Host "Would move: $($file.Name) -> $category" -ForegroundColor Yellow
            }
        }
    }
}

Write-Host "`n=== Summary ===" -ForegroundColor Cyan
Write-Host "Total files processed: $totalFiles" -ForegroundColor White

if ($Execute) {
    Write-Host "Files moved: $movedFiles" -ForegroundColor Green
    Write-Host "Organization complete!" -ForegroundColor Green
} else {
    Write-Host "This was a preview. Use -Execute to actually move files." -ForegroundColor Yellow
}

# Usage examples:
# .\file-organizer.ps1                    # Preview mode
# .\file-organizer.ps1 -Execute           # Actually move files
# .\file-organizer.ps1 -Execute -Verbose  # Move files with detailed output
# .\file-organizer.ps1 -DaysOld 30        # Only move files older than 30 days