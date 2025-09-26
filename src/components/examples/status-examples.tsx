"use client"

export function StatusExamples() {
  return (
    <div className="space-y-6 p-6">
      <h3 className="text-xl font-semibold text-text">Status Colors</h3>
      
      {/* Status Badges */}
      <div className="flex flex-wrap gap-3">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-success/10 text-success border border-success/20">
          ✓ Success
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-warning/10 text-warning border border-warning/20">
          ⚠ Warning
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-error/10 text-error border border-error/20">
          ✕ Error
        </span>
      </div>

      {/* Status Buttons */}
      <div className="flex flex-wrap gap-3">
        <button className="bg-success text-success-foreground rounded-lg px-4 py-2 font-semibold hover:opacity-90 transition-opacity">
          Approve
        </button>
        <button className="bg-warning text-warning-foreground rounded-lg px-4 py-2 font-semibold hover:opacity-90 transition-opacity">
          Review
        </button>
        <button className="bg-error text-error-foreground rounded-lg px-4 py-2 font-semibold hover:opacity-90 transition-opacity">
          Reject
        </button>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface border border-success/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-sm font-medium text-success">Active</span>
          </div>
          <p className="text-text">System is running normally</p>
        </div>
        
        <div className="bg-surface border border-warning/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-warning rounded-full"></div>
            <span className="text-sm font-medium text-warning">Warning</span>
          </div>
          <p className="text-text">Requires attention</p>
        </div>
        
        <div className="bg-surface border border-error/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-error rounded-full"></div>
            <span className="text-sm font-medium text-error">Error</span>
          </div>
          <p className="text-text">Action required</p>
        </div>
      </div>
    </div>
  )
}