import React from 'react';
import PolicyLayout from '@/components/legal/PolicyLayout';

export default function RefundPolicy() {
  return (
    <PolicyLayout title="Refund Policy" lastUpdated="April 12, 2026">
      <h2>1. General Principle</h2>
      <p>
        At ValarPay, we strive to ensure that all transactions are processed seamlessly. However, we understand that errors or technical failures may occasionally result in unauthorized or duplicated debits. This Refund Policy outlines the conditions under which refunds are processed.
      </p>

      <h2>2. Eligible Scenarios for Refunds</h2>
      <p>
        You may be eligible for a refund in the following situations:
      </p>
      <ul>
        <li><strong>Failed Transactions:</strong> Your wallet was debited, but the beneficiary (e.g., a merchant or another bank account) did not receive the funds due to a system error.</li>
        <li><strong>Duplicate Charges:</strong> You were charged multiple times for a single transaction.</li>
        <li><strong>Unauthorized Transactions:</strong> A transaction was completed on your account without your authorization, provided you reported the compromise in a timely manner.</li>
      </ul>

      <h2>3. Non-Refundable Scenarios</h2>
      <p>
        Refunds will not be issued in the following cases:
      </p>
      <ul>
        <li>You successfully transferred funds to the wrong account number due to your own error. (ValarPay cannot forcefully reverse completed bank transfers).</li>
        <li>You willingly participated in a scam or fraudulent scheme.</li>
        <li>The goods or services purchased from a merchant were defective (such disputes must be handled directly with the merchant).</li>
      </ul>

      <h2>4. Processing Timelines</h2>
      <p>
        For internal ValarPay-to-ValarPay transactions, approved refunds are processed within 24 hours. For transactions involving external banks or third-party payment gateways, refunds typically take between 3 to 7 business days to reflect in your account, depending on the settlement cycles of the involved institutions.
      </p>
    </PolicyLayout>
  );
}
