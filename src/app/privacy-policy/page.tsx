import React from 'react';
import PolicyLayout from '@/components/legal/PolicyLayout';

export default function PrivacyPolicy() {
  return (
    <PolicyLayout title="Privacy Policy" lastUpdated="March 01, 2026">
      <h2>1. Information We Collect</h2>
      <p>
        At ValarPay, we collect various types of information to provide and improve our services. This includes:
      </p>
      <ul>
        <li><strong>Personal Identification Information:</strong> Name, email address, phone number, Date of Birth, BVN, NIN, and government-issued ID.</li>
        <li><strong>Financial Information:</strong> Transaction history, wallet balances, bank account details, and card information (processed securely via PCI-DSS compliant partners).</li>
        <li><strong>Technical Data:</strong> IP address, device type, operating system, and app usage statistics.</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>
        We use the collected information for the following purposes:
      </p>
      <ul>
        <li>To process transactions and provide financial services.</li>
        <li>To verify your identity and comply with Anti-Money Laundering (AML) and Know Your Customer (KYC) regulations.</li>
        <li>To communicate with you regarding your account, updates, and promotional offers.</li>
        <li>To detect, prevent, and mitigate fraud and security incidents.</li>
      </ul>

      <h2>3. Data Sharing and Disclosure</h2>
      <p>
        We do not sell your personal data. We may share your information with:
      </p>
      <ul>
        <li><strong>Service Providers:</strong> Third-party vendors who assist in operating our platform (e.g., identity verification services, cloud hosting).</li>
        <li><strong>Financial Partners:</strong> Banks and card networks required to process your transactions.</li>
        <li><strong>Legal Authorities:</strong> When required by law or in response to a valid legal request from regulatory bodies or law enforcement.</li>
      </ul>

      <h2>4. Your Rights</h2>
      <p>
        Depending on your jurisdiction (such as under the NDPR), you have the right to request access to, correction of, or deletion of your personal data. You may also object to processing or request data portability. To exercise these rights, please contact our Data Protection Officer.
      </p>
    </PolicyLayout>
  );
}
