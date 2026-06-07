import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ServiceDetail } from '@/components/service-detail'
import { services } from '@/lib/site-data'

type Props = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = services.find((item) => item.slug === params.slug)

  if (!service) {
    return {
      title: 'บริการทางกฎหมาย',
    }
  }

  return {
    title: `${service.title} | สำนักกฎหมายเที่ยงธรรมทนายความ`,
    description: service.short,
  }
}

export default function ServiceDetailPage({ params }: Props) {
  const service = services.find((item) => item.slug === params.slug)

  if (!service) {
    notFound()
  }

  return <ServiceDetail service={service} />
}
