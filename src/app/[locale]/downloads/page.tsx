import { Metadata } from 'next'
import Link from 'next/link'
import { Layout } from '@/components/common'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Download, FileText, Code, ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Downloads | Automatron.ai',
  description: 'Download free automation sample scripts and resources.',
}

export default function DownloadsPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-automation-50 dark:from-brand-950 dark:via-neutral-900 dark:to-automation-950">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <Link href="/" className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 mb-6">
              <ArrowLeft className="w-4 h-4" />
              Back to Homepage
            </Link>
            
            <Badge variant="secondary" className="mb-4">
              Free Downloads
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Sample Automation Scripts
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Download our sample automation scripts to see what&apos;s possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  File Organizer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  PowerShell script that organizes files by type with safety features.
                </p>
                <a 
                  href="/downloads/sample-scripts/file-organizer.ps1"
                  download="file-organizer.ps1"
                  className="w-full"
                >
                  <Button className="w-full">
                    <Download className="mr-2 w-4 h-4" />
                    Download
                  </Button>
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  CSV Merger
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Python script that combines multiple CSV files with validation.
                </p>
                <a 
                  href="/downloads/sample-scripts/csv-merger.py"
                  download="csv-merger.py"
                  className="w-full"
                >
                  <Button className="w-full">
                    <Download className="mr-2 w-4 h-4" />
                    Download
                  </Button>
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Documentation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Complete setup instructions and usage examples.
                </p>
                <a 
                  href="/downloads/sample-scripts/README.md"
                  download="README.md"
                  className="w-full"
                >
                  <Button className="w-full">
                    <Download className="mr-2 w-4 h-4" />
                    Download
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Card className="bg-gradient-to-r from-brand-600 to-automation-600 text-white max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">Need Custom Automation?</h2>
                <p className="text-brand-100 mb-6">
                  Get fully customized automation solutions tailored to your business needs.
                </p>
                <Link href="/contact">
                  <Button size="lg" variant="secondary">
                    Get Free Assessment
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  )
}