import { PolicyLayout } from '@/components/PolicyLayout';
import { policies } from '@/data/policies';

export const metadata = {
  title: 'Privacy Policy & Data Protection — AURA MOBILE',
  description: 'Our commitment to protecting your personal data in full compliance with GDPR and global privacy standards.',
};

export default function PrivacyPage() {
  return <PolicyLayout policy={policies.privacy} />;
}
