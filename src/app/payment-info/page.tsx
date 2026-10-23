import { PolicyLayout } from '@/components/PolicyLayout';
import { policies } from '@/data/policies';

export const metadata = {
  title: 'Payment Methods & Gateway Standards — AURA MOBILE',
  description: 'Accepted global payment instruments, Apple Pay, Google Pay, Visa, Mastercard, AMEX, and 3-D Secure 2.0 standards.',
};

export default function PaymentInfoPage() {
  return <PolicyLayout policy={policies['payment-info']} />;
}
