import { ServiceDetail } from '@/components/service-detail'
import { services } from '@/lib/site-data'

export default function FamilyLawPage() {
  const service = services.find((item) => item.slug === 'family-law')

  if (!service) {
    throw new Error('Service "family-law" not found')
  }

  return <ServiceDetail service={service} />
}
