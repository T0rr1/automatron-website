'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { 
  Copy, 
  Check, 
  FileText, 
  Database, 
  Image, 
  Archive,
  BarChart3,
  Download,
  Eye,
  FolderOpen
} from 'lucide-react'

interface SampleInput {
  name: string
  type: string
  example: string
}

interface SampleOutput {
  name: string
  type: string
  preview: string
}

interface SampleOutputProps {
  inputs: SampleInput[]
  outputs: SampleOutput[]
}

export function SampleOutput({ inputs, outputs }: SampleOutputProps) {
  const [copiedItem, setCopiedItem] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'inputs' | 'outputs'>('inputs')

  const handleCopy = async (text: string, itemId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItem(itemId)
      setTimeout(() => setCopiedItem(null), 2000)
    } catch (error) {
      console.error('Failed to copy text:', error)
    }
  }

  const getTypeIcon = (type: string) => {
    const lowerType = type.toLowerCase()
    
    if (lowerType.includes('directory') || lowerType.includes('folder')) {
      return <FolderOpen className="w-4 h-4" />
    }
    if (lowerType.includes('csv') || lowerType.includes('data')) {
      return <Database className="w-4 h-4" />
    }
    if (lowerType.includes('log') || lowerType.includes('file')) {
      return <FileText className="w-4 h-4" />
    }
    if (lowerType.includes('image') || lowerType.includes('picture')) {
      return <Image className="w-4 h-4" />
    }
    if (lowerType.includes('archive') || lowerType.includes('zip')) {
      return <Archive className="w-4 h-4" />
    }
    if (lowerType.includes('chart') || lowerType.includes('report')) {
      return <BarChart3 className="w-4 h-4" />
    }
    
    return <FileText className="w-4 h-4" />
  }

  const getTypeColor = (type: string) => {
    const lowerType = type.toLowerCase()
    
    if (lowerType.includes('directory') || lowerType.includes('folder')) {
      return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800'
    }
    if (lowerType.includes('csv') || lowerType.includes('data')) {
      return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800'
    }
    if (lowerType.includes('log')) {
      return 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800'
    }
    if (lowerType.includes('report') || lowerType.includes('chart')) {
      return 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800'
    }
    
    return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-950/20 border-gray-200 dark:border-gray-800'
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Typography variant="h3" className="text-xl font-semibold mb-2">
          Sample Inputs & Outputs
        </Typography>
        <Typography variant="p" className="text-muted-foreground">
          See what goes in and what comes out of the automation process
        </Typography>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="flex bg-muted rounded-lg p-1">
          <button
            onClick={() => setActiveTab('inputs')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'inputs'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            📥 Sample Inputs
          </button>
          <button
            onClick={() => setActiveTab('outputs')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'outputs'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            📤 Expected Outputs
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {activeTab === 'inputs' && (
          <div className="space-y-4">
            <Typography variant="h4" className="font-medium text-center mb-6">
              What You Provide
            </Typography>
            
            {inputs.map((input, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                {/* Header */}
                <div className={`flex items-center justify-between p-4 border-b ${getTypeColor(input.type)}`}>
                  <div className="flex items-center gap-3">
                    {getTypeIcon(input.type)}
                    <div>
                      <Typography variant="small" className="font-medium">
                        {input.name}
                      </Typography>
                      <Typography variant="small" className="opacity-75 text-xs">
                        {input.type}
                      </Typography>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(input.example, `input-${index}`)}
                    className="h-8 px-3"
                  >
                    {copiedItem === `input-${index}` ? (
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
                </div>

                {/* Content */}
                <div className="p-4 bg-background">
                  <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-mono bg-muted/50 p-3 rounded border">
                    {input.example}
                  </pre>
                </div>
              </div>
            ))}

            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <Typography variant="small" className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                💡 Input Requirements
              </Typography>
              <div className="space-y-1 text-sm text-blue-700 dark:text-blue-300">
                <div>• Files can be in any accessible folder on your system</div>
                <div>• No special formatting required - we handle the cleanup</div>
                <div>• Backup copies are created before any modifications</div>
                <div>• You can test with sample data first</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'outputs' && (
          <div className="space-y-4">
            <Typography variant="h4" className="font-medium text-center mb-6">
              What You Receive
            </Typography>
            
            {outputs.map((output, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                {/* Header */}
                <div className={`flex items-center justify-between p-4 border-b ${getTypeColor(output.type)}`}>
                  <div className="flex items-center gap-3">
                    {getTypeIcon(output.type)}
                    <div>
                      <Typography variant="small" className="font-medium">
                        {output.name}
                      </Typography>
                      <Typography variant="small" className="opacity-75 text-xs">
                        {output.type}
                      </Typography>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(output.preview, `output-${index}`)}
                      className="h-8 px-3"
                    >
                      {copiedItem === `output-${index}` ? (
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
                      className="h-8 px-3"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      Preview
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 bg-background">
                  <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-mono bg-muted/50 p-3 rounded border">
                    {output.preview}
                  </pre>
                </div>
              </div>
            ))}

            <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
              <Typography variant="small" className="font-medium text-green-800 dark:text-green-200 mb-2">
                ✅ Delivery Includes
              </Typography>
              <div className="space-y-1 text-sm text-green-700 dark:text-green-300">
                <div>• All processed files in organized structure</div>
                <div>• Detailed activity logs with timestamps</div>
                <div>• Configuration files for future runs</div>
                <div>• Documentation and usage instructions</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Download Section */}
      <div className="text-center space-y-4 pt-6 border-t">
        <Typography variant="h4" className="font-medium">
          Want to See More Examples?
        </Typography>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download Sample Files
          </Button>
          
          <Button variant="outline" size="sm">
            <FileText className="w-4 h-4 mr-2" />
            View Documentation
          </Button>
        </div>

        <Typography variant="small" className="text-muted-foreground">
          All examples include real sample data and expected outputs
        </Typography>
      </div>
    </div>
  )
}