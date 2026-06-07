import { ServiceDetail } from '@/components/service-detail'
import { services } from '@/lib/site-data'

export default function CivilCasePage() {
  const service = services.find((item) => item.slug === 'civil-case')

  if (!service) {
    throw new Error('Service "civil-case" not found')
  }

  return <ServiceDetail service={service} />
}
