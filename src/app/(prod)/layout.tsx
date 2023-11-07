import { RootLayout } from '@/components/RootLayout'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return <RootLayout>{children}</RootLayout>
}
