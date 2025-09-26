import { ServiceOverviewSection } from '@/components/services'

export default function TestServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="py-8">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            Service Overview Section Test
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Testing the service overview section with glassmorphism effects and hover animations
          </p>
        </div>
      </div>
      
      <ServiceOverviewSection />
    </div>
  )
}