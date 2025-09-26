import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // For now, redirect to a simple download page that lists the files
    // This avoids the complexity of zip creation and ensures it works
    const downloadPageUrl = new URL('/downloads/sample-scripts', request.url)
    return NextResponse.redirect(downloadPageUrl.toString())
  } catch (error) {
    return NextResponse.json(
      { error: 'Download temporarily unavailable' },
      { status: 500 }
    )
  }
}