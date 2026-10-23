import { PolicyLayout } from '@/components/PolicyLayout';
import { policies } from '@/data/policies';

export const metadata = {
  title: 'Payment Security & Data Encryption — AURA MOBILE',
  description: 'Enterprise-grade TLS 1.3 encryption, PCI-DSS Level 1 compliance, and 3-D Secure 2.0 authentication.',
};

export default function SecurityPage() {
  return <PolicyLayout policy={policies.security} />;
}
