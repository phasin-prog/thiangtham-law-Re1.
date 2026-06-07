import { ServiceDetail } from '@/components/service-detail'
import { services } from '@/lib/site-data'

export default function InheritanceLawPage() {
  const service = services.find((item) => item.slug === 'inheritance-law')

  if (!service) {
    throw new Error('Service "inheritance-law" not found')
  }

  return <ServiceDetail service={service} />
}
