import { ServiceDetail } from '@/components/service-detail'
import { services } from '@/lib/site-data'

export default function DebtCasePage() {
  const service = services.find((item) => item.slug === 'debt-case')

  if (!service) {
    throw new Error('Service "debt-case" not found')
  }

  return <ServiceDetail service={service} />
}
