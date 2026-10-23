import { PolicyLayout } from '@/components/PolicyLayout';
import { policies } from '@/data/policies';

export const metadata = {
  title: 'Worldwide Delivery & Logistics Hubs — AURA MOBILE',
  description: 'Global express dispatch, insured priority air transport with DHL and FedEx, and direct delivery terms.',
};

export default function DeliveryPage() {
  return <PolicyLayout policy={policies.delivery} />;
}
