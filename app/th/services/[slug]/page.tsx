import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ServiceDetail } from '@/components/service-detail'
import { getLegalService, serviceRouteSlugs } from '@/lib/data/services'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return serviceRouteSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = getLegalService(slug)
  return service
    ? { 
        title: service.title, 
        description: service.description,
        alternates: {
          canonical: `https://thiangtham-law.com/th/services/${slug}`,
        }
      }
    : { title: 'ไม่พบบริการ' }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = getLegalService(slug)
  if (!service) notFound()
  return <ServiceDetail service={service} />
}
