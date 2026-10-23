import { PolicyLayout } from '@/components/PolicyLayout';
import { policies } from '@/data/policies';
import { PolicyCallout } from '@/components/PolicyCallout';

export const metadata = {
  title: 'Returns, Replacement & Global Care — AURA MOBILE',
  description: '14-day hassle-free returns, certified warranty replacement, and prompt refund processing terms.',
};

export default function ReturnsPage() {
  return (
    <PolicyLayout policy={policies.returns}>
      <PolicyCallout type="returns" />
    </PolicyLayout>
  );
}
