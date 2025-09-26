import React from 'react'
import { Header } from '@/components/common/header'
import { Footer } from '@/components/common/footer'

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-8">Our Services</h1>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Basic Scripting</h2>
              <p className="text-muted-foreground mb-4">
                Automate simple, repetitive tasks with custom scripts. Perfect for file management, 
                data processing, and routine operations.
              </p>
              <div className="mb-4">
                <span className="text-2xl font-bold">$50</span>
                <span className="text-muted-foreground">/project</span>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• File organization scripts</li>
                <li>• Data conversion tools</li>
                <li>• Basic automation workflows</li>
              </ul>
            </div>

            <div className="p-6 border rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Email Automation</h2>
              <p className="text-muted-foreground mb-4">
                Set up automated email workflows, responses, and notifications 
                to streamline your communication.
              </p>
              <div className="mb-4">
                <span className="text-2xl font-bold">$75</span>
                <span className="text-muted-foreground">/project</span>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Auto-responders</li>
                <li>• Email scheduling</li>
                <li>• Notification systems</li>
              </ul>
            </div>

            <div className="p-6 border rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Reporting</h2>
              <p className="text-muted-foreground mb-4">
                Generate automated reports and data analysis to keep track 
                of your business metrics and performance.
              </p>
              <div className="mb-4">
                <span className="text-2xl font-bold">$100</span>
                <span className="text-muted-foreground">/project</span>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Custom dashboards</li>
                <li>• Automated data collection</li>
                <li>• Performance analytics</li>
              </ul>
            </div>

            <div className="p-6 border rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Website Automation</h2>
              <p className="text-muted-foreground mb-4">
                Automate website tasks like content updates, form processing, 
                and user interactions.
              </p>
              <div className="mb-4">
                <span className="text-2xl font-bold">$150</span>
                <span className="text-muted-foreground">/project</span>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Content management</li>
                <li>• Form automation</li>
                <li>• User workflow optimization</li>
              </ul>
            </div>

            <div className="p-6 border rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">PC Helper</h2>
              <p className="text-muted-foreground mb-4">
                Personal computer automation and optimization to improve 
                your daily workflow and productivity.
              </p>
              <div className="mb-4">
                <span className="text-2xl font-bold">$125</span>
                <span className="text-muted-foreground">/project</span>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• System optimization</li>
                <li>• Backup automation</li>
                <li>• Productivity tools</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}