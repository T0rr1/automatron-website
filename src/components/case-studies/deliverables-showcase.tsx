'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  FileText, 
  Code, 
  Settings, 
  BookOpen, 
  Download,
  CheckCircle,
  Package
} from 'lucide-react'

interface DeliverablesShowcaseProps {
  deliverables: string[]
}

export function DeliverablesShowcase({ deliverables }: DeliverablesShowcaseProps) {
  const getDeliverableIcon = (deliverable: string) => {
    const lower = deliverable.toLowerCase()
    if (lower.includes('script') || lower.includes('code')) {
      return <Code className="h-5 w-5 text-blue-500" />
    }
    if (lower.includes('config') || lower.includes('setting')) {
      return <Settings className="h-5 w-5 text-purple-500" />
    }
    if (lower.includes('documentation') || lower.includes('guide') || lower.includes('manual')) {
      return <BookOpen className="h-5 w-5 text-green-500" />
    }
    if (lower.includes('template') || lower.includes('excel') || lower.includes('report')) {
      return <FileText className="h-5 w-5 text-orange-500" />
    }
    return <Package className="h-5 w-5 text-primary" />
  }

  const getDeliverableType = (deliverable: string) => {
    const lower = deliverable.toLowerCase()
    if (lower.includes('script') || lower.includes('code')) return 'Code'
    if (lower.includes('config') || lower.includes('setting')) return 'Configuration'
    if (lower.includes('documentation') || lower.includes('guide')) return 'Documentation'
    if (lower.includes('template') || lower.includes('excel')) return 'Template'
    if (lower.includes('training') || lower.includes('material')) return 'Training'
    return 'Asset'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Package className="h-5 w-5 text-primary" />
          What You Receive
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-muted-foreground mb-6">
            Every automation project includes comprehensive deliverables to ensure you can 
            maintain and understand your new automated processes.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {deliverables.map((deliverable, index) => (
              <DeliverableItem 
                key={index} 
                deliverable={deliverable}
                icon={getDeliverableIcon(deliverable)}
                type={getDeliverableType(deliverable)}
              />
            ))}
          </div>

          {/* Sample Deliverables Preview */}
          <div className="mt-8 p-6 bg-muted/30 rounded-lg">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Download className="h-4 w-4" />
              Sample Deliverable Structure
            </h4>
            <div className="space-y-2 text-sm font-mono bg-background p-4 rounded border">
              <div>📁 automation-project/</div>
              <div className="ml-4">📄 README.md</div>
              <div className="ml-4">⚙️ config.json</div>
              <div className="ml-4">📁 scripts/</div>
              <div className="ml-8">🔧 main-automation.ps1</div>
              <div className="ml-8">🔧 backup-routine.py</div>
              <div className="ml-4">📁 documentation/</div>
              <div className="ml-8">📖 user-guide.pdf</div>
              <div className="ml-8">📖 troubleshooting.md</div>
              <div className="ml-4">📁 logs/</div>
              <div className="ml-8">📊 execution-log.txt</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface DeliverableItemProps {
  deliverable: string
  icon: React.ReactNode
  type: string
}

function DeliverableItem({ deliverable, icon, type }: DeliverableItemProps) {
  return (
    <div className="flex items-start gap-3 p-4 bg-background rounded-lg border">
      <div className="flex-shrink-0 mt-0.5">
        {icon}
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">{deliverable}</span>
          <Badge variant="outline" className="text-xs">
            {type}
          </Badge>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <CheckCircle className="h-3 w-3 text-green-500" />
          <span>Included</span>
        </div>
      </div>
    </div>
  )
}