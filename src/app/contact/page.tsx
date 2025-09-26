import React from 'react'
import { Header } from '@/components/common/header'
import { Footer } from '@/components/common/footer'
import { ContactForm } from '@/components/forms/contact/contact-form'

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
          
          <div className="mb-8 text-center">
            <p className="text-lg text-muted-foreground">
              Ready to automate your workflow? Get in touch with us to discuss 
              your project and see how we can help you save time.
            </p>
          </div>

          <div className="bg-background p-8 rounded-lg border shadow-sm">
            <ContactForm />
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-8 text-center">
            <div>
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-muted-foreground">hello@automatron.com</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Response Time</h3>
              <p className="text-muted-foreground">Within 24 hours</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}