import { ServiceDetail } from '@/components/service-detail'
import { services } from '@/lib/site-data'

export default function CriminalCasePage() {
  const service = services.find((item) => item.slug === 'criminal-case')

  if (!service) {
    throw new Error('Service "criminal-case" not found')
  }

  return <ServiceDetail service={service} />
}
