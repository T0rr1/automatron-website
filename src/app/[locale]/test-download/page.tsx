export default function TestDownloadPage() {
  return (
    <div className="p-8">
      <h1>Test Download Page</h1>
      <p>If you can see this, the routing is working!</p>
      <a href="/downloads/sample-scripts/README.md" download>
        Download README
      </a>
    </div>
  )
}