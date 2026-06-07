import { ServiceDetail } from '@/components/service-detail'
import { services } from '@/lib/site-data'

export default function EnforcementPage() {
  const service = services.find((item) => item.slug === 'enforcement')

  if (!service) {
    throw new Error('Service "enforcement" not found')
  }

  return <ServiceDetail service={service} />
}
