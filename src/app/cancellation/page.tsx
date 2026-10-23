import { PolicyLayout } from '@/components/PolicyLayout';
import { policies } from '@/data/policies';
import { CancellationForm } from '@/components/CancellationForm';

export const metadata = {
  title: 'Order Cancellation Policy & Refund Terms — AURA MOBILE',
  description: 'Procedures for canceling orders prior to dispatch, handling courier delivery refusals, and processing card refunds.',
};

export default function CancellationPage() {
  return (
    <PolicyLayout policy={policies.cancellation}>
      <CancellationForm />
    </PolicyLayout>
  );
}
