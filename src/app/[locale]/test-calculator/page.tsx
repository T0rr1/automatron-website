import { TimeSavingsCalculator } from '@/components/forms/time-savings-calculator'
import { TimeSavingsWidget } from '@/components/forms/time-savings-widget'

export default function TestCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold">Calculator Test Page</h1>
      
      <div>
        <h2 className="text-2xl font-semibold mb-4">Full Calculator</h2>
        <TimeSavingsCalculator />
      </div>
      
      <div>
        <h2 className="text-2xl font-semibold mb-4">Widget (Compact)</h2>
        <div className="max-w-md">
          <TimeSavingsWidget compact />
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-semibold mb-4">Widget (Full)</h2>
        <div className="max-w-lg">
          <TimeSavingsWidget />
        </div>
      </div>
    </div>
  )
}