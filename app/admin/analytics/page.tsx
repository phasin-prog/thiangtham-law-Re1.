import { Metadata } from 'next'
import { AnalyticsDashboard } from './analytics-dashboard'

export const metadata: Metadata = {
  title: 'Website analytics',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminAnalyticsPage() {
  return <AnalyticsDashboard />
}
