import React from 'react';
import PolicyLayout from '@/components/legal/PolicyLayout';

export default function DisputeHandling() {
  return (
    <PolicyLayout title="Dispute & Complaint Handling" lastUpdated="March 10, 2026">
      <h2>1. Our Commitment</h2>
      <p>
        At ValarPay, we are committed to providing excellent service. However, we understand that things may occasionally go wrong. We have established this Dispute & Complaint Handling policy to ensure that all customer concerns are addressed promptly, fairly, and transparently.
      </p>

      <h2>2. How to File a Complaint</h2>
      <p>
        If you are dissatisfied with any aspect of our service or wish to dispute a transaction, you can file a complaint through the following channels:
      </p>
      <ul>
        <li><strong>Email:</strong> Send an email to <a href="mailto:support@valarpay.com">support@valarpay.com</a> with the subject line "Complaint/Dispute - [Your Account Number]".</li>
        <li><strong>In-App Support:</strong> Use the live chat feature or the "Report an Issue" button directly within the ValarPay mobile app.</li>
        <li><strong>Phone:</strong> Call our 24/7 customer support hotline at 02013309609.</li>
      </ul>

      <h2>3. The Resolution Process</h2>
      <p>
        Upon receiving your complaint, we will:
      </p>
      <ul>
        <li>Acknowledge receipt within 24 hours.</li>
        <li>Assign a dedicated support specialist to investigate the issue.</li>
        <li>Provide a resolution or a detailed update within 5 working days. Complex cases involving third-party banks may take up to 14 working days.</li>
      </ul>

      <h2>4. Escalation</h2>
      <p>
        If you are not satisfied with the initial resolution, you may escalate the matter by emailing our Compliance Officer. If the issue remains unresolved after internal escalation, you have the right to report the matter to the Consumer Protection Department of the Central Bank of Nigeria (CBN).
      </p>
    </PolicyLayout>
  );
}
