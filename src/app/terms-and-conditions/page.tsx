import React from 'react';
import PolicyLayout from '@/components/legal/PolicyLayout';

export default function TermsAndConditions() {
  return (
    <PolicyLayout title="Terms & Conditions" lastUpdated="February 15, 2026">
      <h2>1. Introduction</h2>
      <p>
        These Terms & Conditions ("T&C") govern your access to and use of the financial services provided by VALAR GLOBAL SERVICES LIMITED ("ValarPay", "we", "us", or "our"). These T&C form a legally binding contract between you and ValarPay.
      </p>

      <h2>2. Account Registration and Security</h2>
      <p>
        When you create an account, you must provide accurate, current, and complete information (KYC). You are solely responsible for maintaining the confidentiality of your account credentials (passwords, PINs, OTPs). ValarPay will never ask for your PIN or password. You must notify us immediately of any unauthorized use of your account.
      </p>

      <h2>3. Financial Transactions and Fees</h2>
      <p>
        ValarPay facilitates electronic money transfers, bill payments, and merchant acquiring. By initiating a transaction, you authorize us to debit your wallet for the transaction amount and any applicable fees. 
      </p>
      <ul>
        <li>All fees are explicitly stated before a transaction is confirmed.</li>
        <li>Transactions are generally irreversible once processed.</li>
        <li>We reserve the right to impose limits on transaction amounts and frequencies in accordance with regulatory requirements.</li>
      </ul>

      <h2>4. Compliance with Central Bank Regulations</h2>
      <p>
        ValarPay operates in strict compliance with the regulations set forth by the Central Bank of Nigeria (CBN) and other relevant financial authorities. We are obligated to report suspicious transactions to the Nigerian Financial Intelligence Unit (NFIU).
      </p>

      <h2>5. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, ValarPay shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, resulting from your use of the Services or any unauthorized access to our servers.
      </p>

      <h2>6. Governing Law</h2>
      <p>
        These T&C shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria, without regard to its conflict of law principles.
      </p>
    </PolicyLayout>
  );
}
