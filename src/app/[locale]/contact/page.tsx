import { Metadata } from 'next'
import { Layout } from '@/components/common'
import { ContactFormWrapper } from '@/components/forms/contact/contact-form-wrapper'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, Phone, Clock, MessageSquare } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us - Start Your Automation Project | Automatron',
  description: 'Ready to save 2-5 hours per week with automation? Tell us about your project and get a custom proposal within 24 hours.',
  openGraph: {
    title: 'Contact Us - Start Your Automation Project | Automatron',
    description: 'Ready to save 2-5 hours per week with automation? Tell us about your project and get a custom proposal within 24 hours.',
  }
}

export default function ContactPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Start Your Automation Project
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Ready to save 2-5 hours per week? Tell us about your current processes and we'll create a custom automation solution for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>Get In Touch</span>
                </CardTitle>
                <CardDescription>
                  We're here to help you automate your workflows and save valuable time.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">contact@automatron.ai</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">Response Time</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Within 24 hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What Happens Next?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Requirements Review</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">We analyze your current process and automation needs</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-green-600 dark:text-green-400">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Custom Proposal</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Detailed solution with timeline and pricing</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-purple-600 dark:text-purple-400">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Quick Call</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Brief discussion to finalize details and answer questions</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-orange-600 dark:text-orange-400">4</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Implementation</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">We build and deliver your automation solution</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-6">
                <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  Free Automation Assessment
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Not sure where to start? We offer a free 15-minute consultation to identify your best automation opportunities and potential time savings.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ContactFormWrapper />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Common questions about our automation services and process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">How long does it take to get started?</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Most projects can start within 1-2 days after requirements are finalized. Simple automations are often completed within a week.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">What if I'm not technical?</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Perfect! Our solutions are designed for non-technical users. We provide simple instructions and can walk you through everything.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Do you offer ongoing support?</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Yes, our Care Plan packages include ongoing support, updates, and new automation requests for a monthly fee.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">What if the automation doesn't work as expected?</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    All packages include revisions and we guarantee our solutions work as specified. We also provide comprehensive testing and documentation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
    </Layout>
  )
}