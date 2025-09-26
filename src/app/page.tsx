import React from 'react'
import { Header } from '@/components/common/header'
import { Footer } from '@/components/common/footer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 text-center">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Save 2-5 hours per week with automation
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Professional automation solutions for busy professionals. 
              Streamline your workflow and focus on what matters most.
            </p>
            <Link href="/contact">
              <Button size="lg" className="text-lg px-8 py-4">
                Get Started
              </Button>
            </Link>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-16 px-4 bg-muted/50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 bg-background rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Basic Scripting</h3>
                <p className="text-muted-foreground mb-4">
                  Automate repetitive tasks with custom scripts and workflows.
                </p>
                <p className="font-semibold">Starting at $50</p>
              </div>
              
              <div className="p-6 bg-background rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Email Automation</h3>
                <p className="text-muted-foreground mb-4">
                  Set up automated email workflows and responses.
                </p>
                <p className="font-semibold">Starting at $75</p>
              </div>
              
              <div className="p-6 bg-background rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Reporting</h3>
                <p className="text-muted-foreground mb-4">
                  Generate automated reports and data analysis.
                </p>
                <p className="font-semibold">Starting at $100</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}