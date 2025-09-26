import { Metadata } from 'next'
import Link from 'next/link'
import { Layout } from '@/components/common'
import { TimeSavingsCalculator } from '@/components/forms/time-savings-calculator'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle, Clock, DollarSign, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Time Savings Calculator | Automatron.ai',
  description: 'Calculate how much time and money you could save with automation. Get instant ROI estimates for your business processes.',
  keywords: 'automation calculator, time savings, ROI calculator, business automation, productivity calculator',
}

export default function CalculatorPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-automation-50 dark:from-brand-950 dark:via-neutral-900 dark:to-automation-950">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Free Tool
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Time Savings Calculator
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover exactly how much time and money automation could save your business. 
            Get instant ROI calculations based on your specific workflows.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="p-6">
              <Clock className="h-12 w-12 text-automation-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Save 2-5 Hours Weekly</h3>
              <p className="text-sm text-muted-foreground">
                Most clients save between 2-5 hours per week on repetitive tasks
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <DollarSign className="h-12 w-12 text-brand-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Instant ROI Analysis</h3>
              <p className="text-sm text-muted-foreground">
                See your potential return on investment and payback period
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <Zap className="h-12 w-12 text-automation-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Quick Setup</h3>
              <p className="text-sm text-muted-foreground">
                Most automations are delivered within 1-7 days
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Calculator */}
        <TimeSavingsCalculator className="mb-12" />

        {/* How It Works */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-center mb-8">How Our Calculator Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-brand-600 font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Input Your Tasks</h3>
                <p className="text-sm text-muted-foreground">
                  Tell us about your repetitive tasks and how long they take
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-automation-100 dark:bg-automation-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-automation-600 font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Calculate Savings</h3>
                <p className="text-sm text-muted-foreground">
                  Our algorithm estimates time savings based on automation efficiency
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-brand-600 font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">See ROI Impact</h3>
                <p className="text-sm text-muted-foreground">
                  View your potential return on investment and payback period
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-automation-100 dark:bg-automation-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-automation-600 font-bold">4</span>
                </div>
                <h3 className="font-semibold mb-2">Get Started</h3>
                <p className="text-sm text-muted-foreground">
                  Book a free assessment to discuss your automation needs
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Common Scenarios */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-center mb-8">Common Automation Scenarios</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-automation-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">File Organization</h4>
                    <p className="text-sm text-muted-foreground">
                      Automatically sort downloads, organize project files, and clean up folders
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-automation-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Email Management</h4>
                    <p className="text-sm text-muted-foreground">
                      Sort emails, save attachments, and organize your inbox automatically
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-automation-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Report Generation</h4>
                    <p className="text-sm text-muted-foreground">
                      Create weekly/monthly reports from your data automatically
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-automation-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Data Processing</h4>
                    <p className="text-sm text-muted-foreground">
                      Merge CSV files, clean data, and format spreadsheets
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-automation-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">System Maintenance</h4>
                    <p className="text-sm text-muted-foreground">
                      Automate backups, software updates, and system cleanup
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-automation-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Custom Workflows</h4>
                    <p className="text-sm text-muted-foreground">
                      Automate any repetitive task specific to your business
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-brand-600 to-automation-600 text-white">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Ready to Start Saving Time?</h2>
              <p className="text-brand-100 mb-6 max-w-2xl mx-auto">
                Get a free automation assessment and discover exactly how we can help 
                streamline your workflows and save you hours every week.
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