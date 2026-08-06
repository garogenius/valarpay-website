import React from 'react';
import PolicyLayout from '@/components/legal/PolicyLayout';

export default function DataProtectionPolicy() {
  return (
    <PolicyLayout title="Data Protection Policy" lastUpdated="March 01, 2026">
      <h2>1. Overview</h2>
      <p>
        VALAR GLOBAL SERVICES LIMITED is committed to protecting the privacy and security of the personal data we process. This Data Protection Policy outlines our adherence to the Nigerian Data Protection Regulation (NDPR) and other global data protection standards.
      </p>

      <h2>2. Data Processing Principles</h2>
      <p>
        We ensure that all personal data is:
      </p>
      <ul>
        <li>Processed lawfully, fairly, and in a transparent manner.</li>
        <li>Collected for specified, explicit, and legitimate purposes.</li>
        <li>Adequate, relevant, and limited to what is necessary.</li>
        <li>Accurate and, where necessary, kept up to date.</li>
        <li>Kept in a form which permits identification for no longer than is necessary.</li>
        <li>Processed securely to protect against unauthorized or unlawful processing, accidental loss, destruction, or damage.</li>
      </ul>

      <h2>3. Security Measures</h2>
      <p>
        We implement robust technical and organizational measures to safeguard your data, including end-to-end encryption (TLS 1.3), AES-256 database encryption at rest, strict access controls, and regular security audits performed by independent third parties.
      </p>

      <h2>4. Data Breaches</h2>
      <p>
        In the unlikely event of a personal data breach that is likely to result in a high risk to the rights and freedoms of our users, we will notify the National Information Technology Development Agency (NITDA) and the affected users without undue delay, typically within 72 hours of becoming aware of the breach.
      </p>
    </PolicyLayout>
  );
}
