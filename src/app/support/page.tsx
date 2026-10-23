import { PolicyLayout } from '@/components/PolicyLayout';
import { policies } from '@/data/policies';

export const metadata = {
  title: 'Client Concierge & Dispute Resolution — AURA MOBILE',
  description: 'Round-the-clock priority assistance, dedicated warranty concierge, and transparent inquiry resolution.',
};

export default function SupportPage() {
  return <PolicyLayout policy={policies.support} />;
}
