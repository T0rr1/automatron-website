#!/usr/bin/env python3
"""
Automatron.ai Sample Script - CSV Merger
Combines multiple CSV files with validation and deduplication
"""

import pandas as pd
import glob
import os
import sys
from datetime import datetime
import argparse

def setup_logging():
    """Configure logging for the script"""
    import logging
    
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(levelname)s - %(message)s',
        handlers=[
            logging.FileHandler(f'csv_merge_{datetime.now().strftime("%Y%m%d_%H%M%S")}.log'),
            logging.StreamHandler()
        ]
    )
    return logging.getLogger(__name__)

def validate_csv_structure(file_path, required_columns=None):
    """Validate CSV file structure and return basic info"""
    try:
        # Read just the header to check structure
        df_sample = pd.read_csv(file_path, nrows=0)
        
        info = {
            'file': file_path,
            'columns': list(df_sample.columns),
            'valid': True,
            'missing_columns': []
        }
        
        if required_columns:
            missing = set(required_columns) - set(df_sample.columns)
            if missing:
                info['valid'] = False
                info['missing_columns'] = list(missing)
        
        return info
        
    except Exception as e:
        return {
            'file': file_path,
            'valid': False,
            'error': str(e)
        }

def merge_csv_files(input_pattern, output_file, required_columns=None, remove_duplicates=True):
    """
    Merge multiple CSV files with validation
    
    Args:
        input_pattern (str): Glob pattern for input files (e.g., "data/*.csv")
        output_file (str): Output file path
        required_columns (list): Required columns for validation
        remove_duplicates (bool): Whether to remove duplicate rows
    
    Returns:
        dict: Summary of the merge operation
    """
    
    logger = setup_logging()
    
    # Find all matching CSV files
    csv_files = glob.glob(input_pattern)
    if not csv_files:
        logger.error(f"No files found matching pattern: {input_pattern}")
        return None
    
    logger.info(f"Found {len(csv_files)} CSV files to merge")
    
    # Validate all files first
    validation_results = []
    valid_files = []
    
    for file_path in csv_files:
        result = validate_csv_structure(file_path, required_columns)
        validation_results.append(result)
        
        if result['valid']:
            valid_files.append(file_path)
            logger.info(f"✓ Valid: {os.path.basename(file_path)}")
        else:
            if 'error' in result:
                logger.error(f"✗ Error in {os.path.basename(file_path)}: {result['error']}")
            else:
                logger.warning(f"✗ Missing columns in {os.path.basename(file_path)}: {result['missing_columns']}")
    
    if not valid_files:
        logger.error("No valid files to merge")
        return None
    
    # Merge valid files
    merged_data = []
    file_stats = {}
    
    for file_path in valid_files:
        try:
            df = pd.read_csv(file_path, encoding='utf-8-sig')
            
            # Add metadata columns
            df['source_file'] = os.path.basename(file_path)
            df['processed_date'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            
            # Clean data
            initial_rows = len(df)
            df = df.dropna(how='all')  # Remove completely empty rows
            cleaned_rows = len(df)
            
            merged_data.append(df)
            file_stats[file_path] = {
                'initial_rows': initial_rows,
                'cleaned_rows': cleaned_rows,
                'empty_rows_removed': initial_rows - cleaned_rows
            }
            
            logger.info(f"Processed {os.path.basename(file_path)}: {cleaned_rows} rows ({initial_rows - cleaned_rows} empty rows removed)")
            
        except Exception as e:
            logger.error(f"Error processing {file_path}: {str(e)}")
            continue
    
    # Combine all dataframes
    final_df = pd.concat(merged_data, ignore_index=True, sort=False)
    
    # Remove duplicates if requested
    initial_count = len(final_df)
    if remove_duplicates:
        # Remove duplicates based on all columns except metadata
        data_columns = [col for col in final_df.columns if col not in ['source_file', 'processed_date']]
        final_df = final_df.drop_duplicates(subset=data_columns)
    
    final_count = len(final_df)
    duplicates_removed = initial_count - final_count
    
    # Save merged file
    final_df.to_csv(output_file, index=False, encoding='utf-8-sig')
    
    # Generate summary
    summary = {
        'input_files': len(csv_files),
        'valid_files': len(valid_files),
        'total_rows': final_count,
        'duplicates_removed': duplicates_removed,
        'output_file': output_file,
        'file_stats': file_stats
    }
    
    logger.info(f"\n=== Merge Complete ===")
    logger.info(f"Input files: {summary['input_files']}")
    logger.info(f"Valid files processed: {summary['valid_files']}")
    logger.info(f"Total rows in output: {summary['total_rows']}")
    logger.info(f"Duplicates removed: {summary['duplicates_removed']}")
    logger.info(f"Output saved to: {output_file}")
    
    return summary

def main():
    parser = argparse.ArgumentParser(description='Merge multiple CSV files with validation')
    parser.add_argument('input_pattern', help='Glob pattern for input files (e.g., "data/*.csv")')
    parser.add_argument('output_file', help='Output file path')
    parser.add_argument('--required-columns', nargs='+', help='Required column names')
    parser.add_argument('--keep-duplicates', action='store_true', help='Keep duplicate rows')
    
    args = parser.parse_args()
    
    result = merge_csv_files(
        input_pattern=args.input_pattern,
        output_file=args.output_file,
        required_columns=args.required_columns,
        remove_duplicates=not args.keep_duplicates
    )
    
    if result:
        print(f"\n✅ Success! Merged {result['total_rows']} rows into {args.output_file}")
        sys.exit(0)
    else:
        print("\n❌ Merge failed - check logs for details")
        sys.exit(1)

if __name__ == "__main__":
    # Example usage when run directly
    if len(sys.argv) == 1:
        print("CSV Merger - Automatron.ai Sample Script")
        print("\nUsage examples:")
        print("  python csv-merger.py 'data/*.csv' merged_output.csv")
        print("  python csv-merger.py 'reports/*.csv' combined.csv --required-columns Name Email Date")
        print("  python csv-merger.py 'sales*.csv' sales_combined.csv --keep-duplicates")
        print("\nFor help: python csv-merger.py --help")
    else:
        main()