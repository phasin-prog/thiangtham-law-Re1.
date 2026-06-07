import { ServiceDetail } from '@/components/service-detail'
import { services } from '@/lib/site-data'

export default function LegalAdvisoryPage() {
  const service = services.find((item) => item.slug === 'legal-advisory')

  if (!service) {
    throw new Error('Service "legal-advisory" not found')
  }

  return <ServiceDetail service={service} />
}
