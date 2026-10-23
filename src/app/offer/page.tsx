import { PolicyLayout } from '@/components/PolicyLayout';
import { policies } from '@/data/policies';
import { PolicyCallout } from '@/components/PolicyCallout';

export const metadata = {
  title: 'Terms of Sale & Public Offer — AURA MOBILE',
  description: 'Standard terms governing the purchase, order placement, and fulfillment of flagship consumer electronics.',
};

export default function OfferPage() {
  return (
    <PolicyLayout policy={policies.offer}>
      <PolicyCallout type="offer" />
    </PolicyLayout>
  );
}
