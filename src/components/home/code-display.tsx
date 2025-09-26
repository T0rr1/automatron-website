'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { Copy, Check, Download, FileText } from 'lucide-react'
import { codeToHtml } from 'shiki'

interface CodeDisplayProps {
  code: string
  language: 'powershell' | 'python'
  filename: string
  showLineNumbers?: boolean
}

export function CodeDisplay({ 
  code, 
  language, 
  filename, 
  showLineNumbers = true 
}: CodeDisplayProps) {
  const [highlightedCode, setHighlightedCode] = useState<string>('')
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const highlightCode = async () => {
      try {
        setIsLoading(true)
        
        const html = await codeToHtml(code, {
          lang: language === 'powershell' ? 'powershell' : 'python',
          theme: 'github-dark',
          transformers: [
            {
              pre(node) {
                // Add custom classes to the pre element
                node.properties.class = [
                  ...(Array.isArray(node.properties.class) ? node.properties.class : []),
                  'overflow-x-auto',
                  'rounded-lg',
                  'border',
                  'bg-gray-950',
                  'p-4',
                  'text-sm'
                ].join(' ')
              }
            }
          ]
        })
        
        setHighlightedCode(html)
      } catch (error) {
        console.error('Error highlighting code:', error)
        // Fallback to plain text with basic formatting
        setHighlightedCode(`<pre class="overflow-x-auto rounded-lg border bg-gray-950 p-4 text-sm text-gray-100"><code>${code}</code></pre>`)
      } finally {
        setIsLoading(false)
      }
    }

    highlightCode()
  }, [code, language])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy code:', error)
    }
  }

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getLanguageIcon = () => {
    switch (language) {
      case 'powershell':
        return '🔷'
      case 'python':
        return '🐍'
      default:
        return '📄'
    }
  }

  const getLanguageLabel = () => {
    switch (language) {
      case 'powershell':
        return 'PowerShell'
      case 'python':
        return 'Python'
      default:
        return 'Code'
    }
  }

  return (
    <div className="space-y-4">
      {/* File Header */}
      <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 border rounded-t-lg">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-muted-foreground" />
            <Typography variant="small" className="font-mono font-medium">
              {filename}
            </Typography>
          </div>
          
          <div className="flex items-center gap-1 px-2 py-1 bg-background border rounded text-xs">
            <span>{getLanguageIcon()}</span>
            <span className="font-medium">{getLanguageLabel()}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-8 px-3"
            disabled={isLoading}
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 mr-1" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 mr-1" />
                Copy
              </>
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDownload}
            className="h-8 px-3"
            disabled={isLoading}
          >
            <Download className="w-3 h-3 mr-1" />
            Download
          </Button>
        </div>
      </div>

      {/* Code Content */}
      <div className="relative">
        {isLoading ? (
          <div className="flex items-center justify-center p-8 bg-gray-950 rounded-b-lg border border-t-0">
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              <Typography variant="small">Loading syntax highlighting...</Typography>
            </div>
          </div>
        ) : (
          <div 
            className="code-container rounded-b-lg border border-t-0 overflow-hidden"
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        )}
      </div>

      {/* Code Info */}
      <div className="flex flex-wrap items-center gap-4 p-4 bg-muted/50 border rounded-lg">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          <span>Production-ready code</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          <span>Includes error handling</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
          <span>Comprehensive logging</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
          <span>Safety features included</span>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <Typography variant="small" className="font-medium text-blue-800 dark:text-blue-200 mb-2">
          💡 How to use this script:
        </Typography>
        
        <div className="space-y-1 text-sm text-blue-700 dark:text-blue-300">
          {language === 'powershell' ? (
            <>
              <div>1. Save the script as <code className="px-1 py-0.5 bg-blue-100 dark:bg-blue-900 rounded font-mono text-xs">{filename}</code></div>
              <div>2. Open PowerShell as Administrator (if needed)</div>
              <div>3. Run: <code className="px-1 py-0.5 bg-blue-100 dark:bg-blue-900 rounded font-mono text-xs">.\{filename} -DryRun</code> to test first</div>
              <div>4. Remove <code className="px-1 py-0.5 bg-blue-100 dark:bg-blue-900 rounded font-mono text-xs">-DryRun</code> to execute for real</div>
            </>
          ) : (
            <>
              <div>1. Save the script as <code className="px-1 py-0.5 bg-blue-100 dark:bg-blue-900 rounded font-mono text-xs">{filename}</code></div>
              <div>2. Install required packages: <code className="px-1 py-0.5 bg-blue-100 dark:bg-blue-900 rounded font-mono text-xs">pip install pandas openpyxl</code></div>
              <div>3. Run: <code className="px-1 py-0.5 bg-blue-100 dark:bg-blue-900 rounded font-mono text-xs">python {filename}</code></div>
              <div>4. Check the generated log file for results</div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}