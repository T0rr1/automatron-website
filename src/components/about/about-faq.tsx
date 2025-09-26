'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { ArrowRight, MessageCircle } from 'lucide-react'
import Link from 'next/link'

const faqData = [
  {
    question: "What makes Automatron.ai different from other automation services?",
    answer: "We specialize in practical, safety-first automation for small businesses and solo professionals. Unlike enterprise-focused providers, we deliver quick wins (1-7 day turnaround) with built-in safeguards like dry-run modes, comprehensive logging, and easy rollback procedures. Our Windows-first approach means better compatibility and faster deployment for most small business environments."
  },
  {
    question: "How do you ensure my data stays safe during automation?",
    answer: "Data safety is our top priority. We follow a 'move, don't delete' policy, always create backups before making changes, and include dry-run modes so you can preview exactly what will happen. Every automation includes comprehensive logging and easy rollback procedures. We also provide detailed documentation so you understand exactly what was changed and how to reverse it if needed."
  },
  {
    question: "What if I'm not technical? Can I still use your services?",
    answer: "Absolutely! Our services are designed for busy professionals who want results without technical complexity. We handle all the technical implementation and provide clear, non-technical documentation. You'll receive step-by-step guides, and we're always available to explain how everything works in plain English."
  },
  {
    question: "How quickly can you deliver automation solutions?",
    answer: "Most of our services are delivered within 1-7 days. Simple scripts (file cleanup, CSV processing) often take 1-2 days, while more complex automations (reporting systems, email workflows) typically take 3-7 days. We'll give you a specific timeline during our initial consultation based on your requirements."
  },
  {
    question: "Do you only work with Windows systems?",
    answer: "While we specialize in Windows environments (where most small businesses operate), we also create cross-platform solutions using Python when needed. Our Windows-first approach means faster, more reliable automation for the majority of our clients, but we can adapt to macOS and Linux environments when required."
  },
  {
    question: "What kind of support do you provide after delivery?",
    answer: "Every project includes documentation, training materials, and 30 days of email support. For ongoing needs, we offer Care Plan subscriptions ($149-$399/month) that include regular maintenance, updates, and priority support. We also provide one-time support sessions if you need help later."
  },
  {
    question: "Can you integrate with our existing software and systems?",
    answer: "Yes! We specialize in integrating with common business tools like Office 365, Excel, Outlook, SharePoint, and various cloud services. We can also work with most software that has APIs or can export/import data. During our consultation, we'll assess your current systems and recommend the best integration approach."
  },
  {
    question: "What if the automation doesn't work as expected?",
    answer: "We stand behind our work with a satisfaction guarantee. If an automation doesn't perform as specified, we'll fix it at no charge. Our dry-run testing and comprehensive documentation minimize issues, but if problems arise, we'll work with you until everything functions correctly."
  },
  {
    question: "How do you price your services?",
    answer: "We offer transparent, fixed-price packages: Starter ($249-$499) for simple automations, Bundle ($699-$1,200) for comprehensive solutions, Website Basic ($699-$1,200) for web projects, and Care Plans ($149-$399/month) for ongoing support. Pricing depends on complexity and scope, which we'll discuss during your free assessment."
  },
  {
    question: "Do you provide training on how to use the automations?",
    answer: "Yes! Every delivery includes user-friendly documentation with screenshots and step-by-step instructions. For complex automations, we can provide live training sessions via screen share. Our goal is to make you completely comfortable using and maintaining your new automated workflows."
  }
]

export function AboutFAQ() {
  return (
    <div className="space-y-12">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto"
      >
        <Badge variant="outline" className="mb-4">
          Frequently Asked Questions
        </Badge>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
          Everything You Need to{' '}
          <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Know About Us
          </span>
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Common questions about our automation services, approach, and how we can help your business
        </p>
      </motion.div>

      {/* FAQ Accordion */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <Accordion type="single" collapsible className="space-y-4">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <AccordionItem 
                value={`item-${index}`}
                className="border rounded-lg px-6 hover:shadow-md transition-all duration-300"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-semibold text-base pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-6 pt-2">
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </motion.div>

      {/* Contact CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center bg-muted/50 rounded-2xl p-8"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
          <MessageCircle className="h-8 w-8" />
        </div>
        
        <h3 className="text-2xl font-bold mb-4">
          Still Have Questions?
        </h3>
        
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          We're here to help! Schedule a free consultation to discuss your specific automation needs 
          and get personalized answers to your questions.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="group">
            <Link href={"/contact" as any}>
              Schedule Free Consultation
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg">
            <Link href={"/services" as any}>
              Explore Services
            </Link>
          </Button>
        </div>
        
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            <strong>Quick Response:</strong> We typically respond to inquiries within 2-4 hours during business days
          </p>
        </div>
      </motion.div>
    </div>
  )
}