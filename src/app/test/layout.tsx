import { type Metadata } from 'next'

import '@/styles/tailwind.css'
import { RootLayout } from '@/components/RootLayout'

export const metadata: Metadata = {
  title: {
    template: '%s - Prophet Town',
    default: 'Prophet Town - An executive technology partner you can trust',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootLayout isBlank>{children}</RootLayout>
}
