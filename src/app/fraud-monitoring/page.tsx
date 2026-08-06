import React from 'react';
import PolicyLayout from '@/components/legal/PolicyLayout';

export default function FraudMonitoring() {
  return (
    <PolicyLayout title="Fraud Monitoring & User Security" lastUpdated="April 05, 2026">
      <h2>1. Our Security Infrastructure</h2>
      <p>
        Security is at the core of ValarPay. We employ bank-grade security protocols to protect your funds and personal data. Our infrastructure includes end-to-end encryption, regular penetration testing, and continuous compliance with PCI-DSS standards.
      </p>

      <h2>2. Automated Fraud Monitoring</h2>
      <p>
        ValarPay uses advanced machine learning algorithms and heuristic analysis to monitor all transactions in real-time. Our systems are designed to detect anomalous behavior, such as:
      </p>
      <ul>
        <li>Unusually large transaction volumes.</li>
        <li>Logins from unrecognized or high-risk geographical locations.</li>
        <li>Rapid succession of failed PIN or OTP attempts.</li>
      </ul>
      <p>
        If suspicious activity is detected, our system may temporarily freeze the account and require the user to undergo additional biometric or document verification to restore access.
      </p>

      <h2>3. User Responsibilities</h2>
      <p>
        While we provide robust security, users play a critical role in preventing fraud. You must:
      </p>
      <ul>
        <li>Never share your PIN, password, or OTP with anyone, including individuals claiming to be ValarPay staff.</li>
        <li>Enable Two-Factor Authentication (2FA) on your account.</li>
        <li>Ensure your mobile device is secured with a screen lock and biometric authentication.</li>
        <li>Report a lost or stolen phone to us immediately so we can disable your account access on that device.</li>
      </ul>

      <h2>4. Reporting Fraud</h2>
      <p>
        If you suspect that your account has been compromised, contact us immediately at <a href="mailto:fraud@valarpay.com">fraud@valarpay.com</a> or use the emergency "Lock Account" feature in the app.
      </p>
    </PolicyLayout>
  );
}
