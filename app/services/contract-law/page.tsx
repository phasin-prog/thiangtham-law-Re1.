import { ServiceDetail } from '@/components/service-detail'
import { services } from '@/lib/site-data'

export default function ContractLawPage() {
  const service = services.find((item) => item.slug === 'contract-law')

  if (!service) {
    throw new Error('Service "contract-law" not found')
  }

  return <ServiceDetail service={service} />
}
