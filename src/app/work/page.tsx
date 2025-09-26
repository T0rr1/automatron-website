import { redirect } from 'next/navigation'

export default function WorkPage() {
  // Redirect to the localized version
  redirect('/en/work')
}