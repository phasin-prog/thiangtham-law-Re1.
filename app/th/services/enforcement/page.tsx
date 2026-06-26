import { ServiceDetail } from '@/components/service-detail'
import { getLegalService } from '@/lib/data/services'

export default function EnforcementPage() {
  const service = getLegalService('enforcement')

  if (!service) {
    throw new Error('Service "enforcement" not found')
  }

  return <ServiceDetail service={service} />
}
