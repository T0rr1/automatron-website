import { Metadata } from 'next'
import Link from 'next/link'
import { Layout } from '@/components/common'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Download, FileText, Code, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Download Sample Scripts | Automatron.ai',
  description: 'Download free automation sample scripts including file organizers, CSV mergers, and more. All scripts include safety features and documentation.',
  keywords: 'automation scripts, free download, PowerShell, Python, file organization, CSV merger',
}

const sampleFiles = [
  {
    name: 'File Organizer',
    filename: 'file-organizer.ps1',
    type: 'PowerShell',
    description: 'Automatically organizes files in your Downloads folder by type with safety features',
    features: ['Preview mode', 'Configurable age threshold', 'Automatic folder creation', 'Detailed logging'],
    size: '3.2 KB',
    icon: <FileText className="w-6 h-6" />
  },
  {
    name: 'CSV Merger',
    filename: 'csv-merger.py',
    type: 'Python',
    description: 'Combines multiple CSV files with validation, deduplication, and error handling',
    features: ['Column validation', 'Duplicate removal', 'Data cleaning', 'Source file tracking'],
    size: '4.8 KB',
    icon: <Code className="w-6 h-6" />
  },
  {
    name: 'Documentation',
    filename: 'README.md',
    type: 'Markdown',
    description: 'Complete setup instructions, usage examples, and customization guide',
    features: ['Quick start guide', 'Usage examples', 'Safety instructions', 'Customization tips'],
    size: '2.1 KB',
    icon: <FileText className="w-6 h-6" />
  }
]

export default function SampleScriptsDownloadPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-automation-50 dark:from-brand-950 dark:via-neutral-900 dark:to-automation-950">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <Link href="/" className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 mb-6">
              <ArrowLeft className="w-4 h-4" />
              Back to Homepage
            </Link>
            
            <Badge variant="secondary" className="mb-4">
              Free Download
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Sample Automation Scripts
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Download our sample automation scripts to see what&apos;s possible. 
              All scripts include safety features and are ready to customize for your needs.
            </p>
          </div>

          {/* Safety Notice */}
          <div className="flex items-center justify-center gap-2 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg max-w-3xl mx-auto mb-12">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Safety First:</strong> All scripts run in preview mode by default. 
              Review the code and test with sample data before using on important files.
            </p>
          </div>

          {/* Download Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {sampleFiles.map((file) => (
              <Card key={file.filename} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-brand-100 dark:bg-brand-900 rounded-lg text-brand-600 dark:text-brand-400">
                      {file.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{file.name}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {file.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{file.size}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {file.description}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    {file.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <a 
                    href={`/downloads/sample-scripts/${file.filename}`}
                    download
                    className="w-full"
                  >
                    <Button className="w-full group">
                      <Download className="mr-2 w-4 h-4 transition-transform group-hover:translate-y-1" />
                      Download {file.name}
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Download All Button */}
          <div className="text-center mb-12">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">Download All Scripts</h2>
                <p className="text-muted-foreground mb-6">
                  Get all sample scripts and documentation in one convenient package.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="/downloads/sample-scripts/README.md"
                    download
                  >
                    <Button size="lg" className="group">
                      <Download className="mr-2 w-4 h-4 transition-transform group-hover:translate-y-1" />
                      Start with README
                    </Button>
                  </a>
                  
                  <Link href="/contact">
                    <Button variant="outline" size="lg">
                      Get Custom Scripts
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Usage Instructions */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">Quick Start Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-brand-600 font-bold">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Download Scripts</h3>
                  <p className="text-sm text-muted-foreground">
                    Click the download buttons above to get the scripts
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-automation-100 dark:bg-automation-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-automation-600 font-bold">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Read Documentation</h3>
                  <p className="text-sm text-muted-foreground">
                    Review the README.md for setup and usage instructions
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-brand-600 font-bold">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Test Safely</h3>
                  <p className="text-sm text-muted-foreground">
                    Run scripts in preview mode first with test data
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-automation-100 dark:bg-automation-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-automation-600 font-bold">4</span>
                  </div>
                  <h3 className="font-semibold mb-2">Customize</h3>
                  <p className="text-sm text-muted-foreground">
                    Modify scripts to fit your specific workflow needs
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-brand-600 to-automation-600 text-white">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">Need Custom Automation?</h2>
                <p className="text-brand-100 mb-6 max-w-2xl mx-auto">
                  These samples show what&apos;s possible. Get fully customized automation solutions 
                  tailored to your specific business needs and workflows.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button size="lg" variant="secondary">
                      Get Free Assessment
                    </Button>
                  </Link>
                  <Link href="/services">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-600">
                      View Our Services
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  )
}