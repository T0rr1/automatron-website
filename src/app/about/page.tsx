import React from 'react'
import { Header } from '@/components/common/header'
import { Footer } from '@/components/common/footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold mb-8 text-center">About Automatron</h1>
          
          <div className="prose prose-lg mx-auto">
            <p className="text-xl text-muted-foreground text-center mb-12">
              We help busy professionals reclaim their time through smart automation solutions.
            </p>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                <p className="text-muted-foreground">
                  To empower professionals and businesses by automating repetitive tasks, 
                  allowing them to focus on what truly matters - growing their business 
                  and achieving their goals.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Our Approach</h2>
                <p className="text-muted-foreground">
                  We believe in practical, cost-effective automation solutions. 
                  Every project is tailored to your specific needs, ensuring maximum 
                  impact and return on investment.
                </p>
              </div>
            </div>

            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-8">Why Choose Automatron?</h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="p-6 border rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Expert Solutions</h3>
                  <p className="text-muted-foreground">
                    Years of experience in automation across various industries and platforms.
                  </p>
                </div>

                <div className="p-6 border rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Time Savings</h3>
                  <p className="text-muted-foreground">
                    Our clients typically save 2-5 hours per week through our automation solutions.
                  </p>
                </div>

                <div className="p-6 border rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Ongoing Support</h3>
                  <p className="text-muted-foreground">
                    We provide continued support and optimization for all our automation projects.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}