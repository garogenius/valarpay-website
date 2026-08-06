import React from 'react';
import PolicyLayout from '@/components/legal/PolicyLayout';

export default function TermsOfUse() {
  return (
    <PolicyLayout title="Terms of Use" lastUpdated="January 10, 2026">
      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing and using ValarPay's website, API, or mobile applications (collectively, the "Services"), you agree to comply with and be bound by these Terms of Use. If you do not agree to these terms, you may not access or use the Services.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        To use our Services, you must be at least 18 years old and capable of forming a binding contract. By registering, you represent and warrant that you meet these eligibility requirements and that all information provided during registration is accurate and complete.
      </p>

      <h2>3. Acceptable Use Policy</h2>
      <p>
        You agree not to use the Services for any unlawful or prohibited purpose. Prohibited activities include, but are not limited to:
      </p>
      <ul>
        <li>Violating any local, state, national, or international law or regulation.</li>
        <li>Engaging in fraudulent activities, money laundering, or terrorist financing.</li>
        <li>Attempting to gain unauthorized access to our systems, networks, or other users' accounts.</li>
        <li>Distributing malware, viruses, or any other malicious code.</li>
      </ul>

      <h2>4. Intellectual Property</h2>
      <p>
        All content, trademarks, logos, and software associated with the Services are the exclusive property of VALAR GLOBAL SERVICES LIMITED. You are granted a limited, non-exclusive, non-transferable license to use the Services in accordance with these Terms.
      </p>

      <h2>5. Termination</h2>
      <p>
        We reserve the right to suspend or terminate your access to the Services at any time, without notice, for conduct that we believe violates these Terms of Use or is harmful to other users of the Services, us, or third parties, or for any other reason in our sole discretion.
      </p>

      <h2>6. Contact Information</h2>
      <p>
        If you have any questions or concerns regarding these Terms of Use, please contact our legal team at <a href="mailto:legal@valarpay.com">legal@valarpay.com</a>.
      </p>
    </PolicyLayout>
  );
}
