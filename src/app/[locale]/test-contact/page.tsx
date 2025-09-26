import { ContactForm } from '@/components/forms/contact/contact-form'

export default function TestContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Contact Form Test</h1>
        <ContactForm />
      </div>
    </div>
  )
}