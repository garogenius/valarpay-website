import React from 'react';
import PolicyLayout from '@/components/legal/PolicyLayout';

export default function CookiesPolicy() {
  return (
    <PolicyLayout title="Cookies Policy" lastUpdated="March 01, 2026">
      <h2>1. What Are Cookies?</h2>
      <p>
        Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when you visit our website. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
      </p>

      <h2>2. How We Use Cookies</h2>
      <p>
        ValarPay uses cookies to enhance your browsing experience, secure your session, and analyze site traffic. Specifically, we use:
      </p>
      <ul>
        <li><strong>Essential Cookies:</strong> Strictly necessary for the operation of our platform. They include cookies that enable you to log into secure areas of our website.</li>
        <li><strong>Analytical/Performance Cookies:</strong> Allow us to recognize and count the number of visitors and to see how visitors move around our website. This helps us improve the way our website works.</li>
        <li><strong>Functionality Cookies:</strong> Used to recognize you when you return to our website. This enables us to personalize our content for you and remember your preferences.</li>
      </ul>

      <h2>3. Managing Your Cookies</h2>
      <p>
        You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. However, this may prevent you from taking full advantage of the ValarPay platform.
      </p>
    </PolicyLayout>
  );
}
