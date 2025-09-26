"use client"

export function DesignSystemExample() {
  return (
    <div className="space-y-8 p-8">
      <h2 className="text-2xl font-semibold text-text">Design System Example</h2>
      
      {/* Card Example */}
      <div className="bg-surface text-text border border-border rounded-lg shadow-card p-6">
        <h3 className="text-lg font-semibold">Automation Service</h3>
        <p className="text-muted mt-2">Save 2–5 hours/week with our expert automation solutions.</p>
        <div className="mt-4 flex gap-3">
          <button className="rounded-md bg-accent text-accent-foreground px-4 py-2 focus:shadow-focus">
            Get My Intake
          </button>
          <button className="rounded-md bg-surface text-text border border-border px-4 py-2 hover:bg-bg">
            Learn More
          </button>
        </div>
      </div>

      {/* Color Tokens Demo */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-bg border border-border rounded-lg p-4">
          <div className="w-full h-8 bg-bg rounded mb-2"></div>
          <span className="text-sm text-muted">Background</span>
        </div>
        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="w-full h-8 bg-surface rounded mb-2"></div>
          <span className="text-sm text-muted">Surface</span>
        </div>
        <div className="bg-accent border border-border rounded-lg p-4">
          <div className="w-full h-8 bg-accent rounded mb-2"></div>
          <span className="text-sm text-accent-foreground">Accent</span>
        </div>
        <div className="bg-border border border-border rounded-lg p-4">
          <div className="w-full h-8 bg-border rounded mb-2"></div>
          <span className="text-sm text-muted">Border</span>
        </div>
      </div>

      {/* Typography Example */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-text">Heading 1</h1>
        <h2 className="text-3xl font-semibold text-text">Heading 2</h2>
        <h3 className="text-xl font-semibold text-text">Heading 3</h3>
        <p className="text-base text-text">Body text with normal weight and color.</p>
        <p className="text-base text-muted">Muted text for secondary information.</p>
      </div>
    </div>
  )
}