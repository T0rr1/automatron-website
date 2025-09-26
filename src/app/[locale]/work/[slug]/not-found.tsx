import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Search } from 'lucide-react'

export default function CaseStudyNotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <div className="text-6xl mb-4">🔍</div>
          <CardTitle className="text-2xl">Case Study Not Found</CardTitle>
          <CardDescription>
            The case study you're looking for doesn't exist or may have been moved.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Don't worry! We have plenty of other success stories to explore.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href={"/work" as any} className="flex-1">
              <Button className="w-full">
                <Search className="mr-2 h-4 w-4" />
                Browse Case Studies
              </Button>
            </Link>
            <Link href={"/" as any} className="flex-1">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}