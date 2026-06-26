import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ServiceDetail } from '@/components/service-detail'
import { englishServiceRouteSlugs, getEnglishLegalService } from '@/lib/data/services-en'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return englishServiceRouteSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = getEnglishLegalService(slug)
  return service
    ? { title: service.title, description: service.description }
    : { title: 'Service Not Found' }
}

export default async function EnglishServicePage({ params }: Props) {
  const { slug } = await params
  const service = getEnglishLegalService(slug)
  if (!service) notFound()
  return <ServiceDetail service={service} locale="en" />
}
