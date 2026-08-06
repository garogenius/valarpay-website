"use client";

import React, { useState } from 'react';
import DeveloperSidebar from './DeveloperSidebar';
import DocIntroduction from './content/DocIntroduction';
import EndpointReference from './content/EndpointReference';

export default function DeveloperPortal({ 
  initialTab = 'Introduction',
  mode = 'docs'
}: { 
  initialTab?: string;
  mode?: 'docs' | 'reference';
}) {
  const [activeTab, setActiveTab] = useState(initialTab);

  const renderContent = () => {
    switch (activeTab) {
      
      // ==========================================
      // GET STARTED
      // ==========================================
      case 'Introduction':
        return <DocIntroduction />;
      case 'Quick Start':
        return (
          <div className="animate-in fade-in duration-500 max-w-4xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Quick Start Guide</h1>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Welcome to the ValarPay Quick Start guide. In just a few minutes, you'll learn how to authenticate with our API, create a customer, and process your first test payment.
            </p>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-6">
              <h3 className="font-bold text-gray-900 mb-2">1. Obtain your API Keys</h3>
              <p className="text-gray-500 text-sm">Log into your dashboard, navigate to the Developer settings, and copy your <code className="bg-gray-200 text-black px-1 rounded">x-api-key</code> and Bearer token.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-6">
              <h3 className="font-bold text-gray-900 mb-2">2. Make your first request</h3>
              <p className="text-gray-500 text-sm">Use your preferred client library or cURL to ping our Authentication endpoint to verify your credentials are active.</p>
            </div>
          </div>
        );
      case 'Client':
      case 'Libraries':
        return (
          <div className="animate-in fade-in duration-500 max-w-4xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{activeTab}</h1>
            <p className="text-gray-600 leading-relaxed">
              We provide official SDKs and client libraries for Node.js, Python, PHP, Ruby, and Go. Using an official library ensures you are always up to date with the latest features and security patches.
            </p>
          </div>
        );

      // ==========================================
      // GUIDE
      // ==========================================
      case 'Authentication':
        return (
          <div className="animate-in fade-in duration-500 max-w-4xl flex flex-col gap-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Authentication</h1>
            <p className="text-gray-600 text-[15px] leading-relaxed">
              The ValarPay API uses API keys to authenticate requests. You can view and manage your API keys in the Developer Dashboard. We provide both <strong>Test</strong> and <strong>Live</strong> mode keys. Test mode keys do not affect actual data and cannot interact with real banking networks.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-md">
              <p className="text-sm text-yellow-800"><strong>Security Warning:</strong> Your API keys carry many privileges. Do not share your secret API keys in publicly accessible areas such as GitHub, client-side code, or mobile apps.</p>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mt-4">Bearer Tokens</h2>
            <p className="text-gray-600 text-[15px] leading-relaxed">
              Most endpoints require a Bearer token in the Authorization header. You acquire a temporary Bearer token by authenticating a user via the <code>/auth/login</code> endpoint.
            </p>
            <div className="bg-[#1E1E1E] text-gray-300 p-4 rounded-xl font-mono text-[13px]">
              <span className="text-pink-400">Authorization</span>: Bearer eyJhbGciOiJIUzI1Ni...
            </div>
          </div>
        );

      case 'Error Handling':
        return (
          <div className="animate-in fade-in duration-500 max-w-4xl flex flex-col gap-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Error Handling</h1>
            <p className="text-gray-600 text-[15px] leading-relaxed">
              ValarPay uses conventional HTTP response codes to indicate the success or failure of an API request. Codes in the <code>2xx</code> range indicate success, <code>4xx</code> indicate client errors (e.g. invalid parameters), and <code>5xx</code> indicate server errors.
            </p>
            <h2 className="text-xl font-bold text-gray-900 mt-4">Standard Error Format</h2>
            <p className="text-gray-600 text-[15px]">When an error occurs, the API returns a structured JSON object containing a detailed message and a specific error code for programmatic handling.</p>
            <div className="bg-[#1E1E1E] text-gray-300 p-5 rounded-xl font-mono text-[13px] overflow-x-auto">
              <pre>{`{
  "error": {
    "code": "insufficient_funds",
    "message": "The wallet does not have enough balance to complete the transfer.",
    "doc_url": "https://valarpay.com/docs/errors#insufficient_funds"
  }
}`}</pre>
            </div>
          </div>
        );

      case 'Pagination':
        return (
          <div className="animate-in fade-in duration-500 max-w-4xl flex flex-col gap-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Pagination</h1>
            <p className="text-gray-600 text-[15px] leading-relaxed">
              All top-level API resources that return lists of items (like Transactions, Orders, or Customers) support cursor-based pagination to fetch data efficiently.
            </p>
            <h2 className="text-xl font-bold text-gray-900 mt-4">Using Cursors</h2>
            <p className="text-gray-600 text-[15px]">
              Instead of traditional offset pagination which can be slow on large datasets, ValarPay uses <code>starting_after</code> and <code>ending_before</code> cursors. A cursor is simply the ID of the last object you received.
            </p>
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl">
              <code className="text-sm text-blue-600 font-mono">GET /v1/transactions?limit=50&starting_after=txn_89437298</code>
            </div>
          </div>
        );

      case 'Webhook':
        return (
          <div className="animate-in fade-in duration-500 max-w-4xl flex flex-col gap-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Webhooks</h1>
            <p className="text-gray-600 text-[15px] leading-relaxed">
              Webhooks allow ValarPay to notify your application asynchronously when events happen in your account, such as a successful payment, a failed payout, or a dispute being raised.
            </p>
            <h2 className="text-xl font-bold text-gray-900 mt-4">Validating Signatures</h2>
            <p className="text-gray-600 text-[15px]">
              To ensure the webhook is actually coming from ValarPay, we include an <code>x-valarpay-signature</code> header in every payload. You should compute an HMAC SHA-256 hash using your Webhook Secret and compare it against this header.
            </p>
            <div className="bg-[#1E1E1E] text-gray-300 p-5 rounded-xl font-mono text-[13px] overflow-x-auto">
              <pre>{`// Node.js Express Example
const crypto = require('crypto');
const signature = req.headers['x-valarpay-signature'];
const hash = crypto.createHmac('sha256', process.env.WEBHOOK_SECRET)
                   .update(req.rawBody)
                   .digest('hex');

if (hash !== signature) {
  return res.status(401).send('Invalid Signature');
}`}</pre>
            </div>
          </div>
        );

      case 'Response':
      case 'Request':
        return (
          <div className="animate-in fade-in duration-500 max-w-4xl flex flex-col gap-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{activeTab} Architecture</h1>
            <p className="text-gray-600 text-[15px] leading-relaxed">
              ValarPay's API is designed around RESTful principles. All {activeTab.toLowerCase()} payloads must be formatted as strict JSON. We require the <code>Content-Type: application/json</code> header to be present on all POST and PUT requests.
            </p>
            <p className="text-gray-600 text-[15px] leading-relaxed">
              Standard date-time fields follow the ISO 8601 format (e.g., <code>2025-06-01T20:55:55.374Z</code>). Currency amounts are consistently represented as standard decimal units (e.g., NGN 50000.50) rather than smallest subunits, unless explicitly specified otherwise.
            </p>
          </div>
        );

      // ==========================================
      // CORE RESOURCES
      // ==========================================
      case 'Accept Payment':
      case 'Payment':
        return (
          <div className="animate-in fade-in duration-500 max-w-4xl flex flex-col gap-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Accepting Payments</h1>
            <p className="text-gray-600 text-[15px] leading-relaxed">
              ValarPay provides multiple channels for you to accept payments globally. Whether you need a hosted checkout page, inline payment widgets, or direct server-to-server API processing, our Payment Intent architecture handles the heavy lifting of compliance, 3D Secure authentication, and fraud prevention.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="p-6 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-900 text-lg mb-2">Checkout Links</h3>
                <p className="text-sm text-gray-500">The fastest way to get paid. Generate a secure, ValarPay-hosted URL and redirect your users to complete their transaction.</p>
              </div>
              <div className="p-6 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-900 text-lg mb-2">Inline Widgets</h3>
                <p className="text-sm text-gray-500">Embed our secure payment iframe directly into your web app using the ValarPay.js SDK for a seamless user experience.</p>
              </div>
            </div>
          </div>
        );

      case 'Subscription':
      case 'Invoicing':
      case 'Orders':
        return (
          <div className="animate-in fade-in duration-500 max-w-4xl flex flex-col gap-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Billing & {activeTab}</h1>
            <p className="text-gray-600 text-[15px] leading-relaxed">
              The ValarPay Billing engine allows you to easily manage recurring logic. You can define Plans (e.g., $10/month), attach Customers to those plans to create Subscriptions, and automatically handle prorations, upgrades, and failed payment dunning logic.
            </p>
            <ul className="list-disc pl-5 space-y-3 text-gray-600 text-[15px]">
              <li><strong>Smart Retries:</strong> If a recurring charge fails, our machine learning models automatically retry the card at optimal times.</li>
              <li><strong>Webhooks:</strong> Listen to <code>invoice.payment_succeeded</code> events to provision service in real-time.</li>
              <li><strong>Proration:</strong> Instantly calculate cost differences when a user upgrades from a Basic to Pro tier mid-month.</li>
            </ul>
          </div>
        );

      case 'Payout':
      case 'Refund':
      case 'Split Payment':
      case 'Transaction Search':
      case 'Overview':
        return (
          <div className="animate-in fade-in duration-500 max-w-4xl flex flex-col gap-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{activeTab}</h1>
            <p className="text-gray-600 text-[15px] leading-relaxed">
              Dive deep into the programmatic management of your financial ecosystem. The {activeTab} endpoints allow you to orchestrate complex money movement operations entirely via API.
            </p>
            <div className="p-6 bg-blue-50 text-blue-800 rounded-xl border border-blue-100 flex items-start gap-4">
              <svg className="w-6 h-6 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <div>
                <span className="font-bold block mb-1">Developer Notice</span>
                <span className="text-sm">Extended schema definitions and compliance requirements for {activeTab} routing are fully detailed in the v2.0 endpoint specifications. Ensure your API keys have the necessary permissions enabled in your dashboard before initiating test requests.</span>
              </div>
            </div>
          </div>
        );

      // ==========================================
      // API REFERENCE
      // ==========================================
      case 'Register User':
        return (
          <EndpointReference 
            title="Register User"
            description="Register a new user account within the ValarPay ecosystem."
            method="POST"
            path="/api/v1/auth/register-user"
            headers={[
              { name: 'authorization', type: 'Bearer Token', description: 'Set value to Bearer <token>' },
              { name: 'x-api-key', type: 'string', description: 'Set value to 2442555352662653' }
            ]}
            bodyParamsJSON={`{
  "username": "AbuksLC",
  "fullname": "Abuks Inc",
  "email": "abuksincce@gmail.com",
  "password": "Caicedo123",
  "dateOfBirth": "8-Mar-1996",
  "countryCode": "NGN",
  "companyRegistrationNumber": "RC-234555",
  "accountType": "BUSINESS",
  "referralCode": ""
}`}
            curlRequest={`curl --location 'https://api.valarpay.com/v1/auth/register-user' \\
--header 'x-api-key: 2442555352662653' \\
--data-raw '{
  "username": "AbuksLC",
  "fullname": "Abuks Inc",
  "email": "abuksincce@gmail.com",
  "password": "Caicedo123",
  "dateOfBirth": "8-Mar-1996",
  "countryCode": "NGN",
  "companyRegistrationNumber": "RC-234555",
  "accountType": "BUSINESS",
  "referralCode": ""
}'`}
            sampleResponse={`{
  "message": "user created successfully",
  "user": {
    "id": "4c8c3a7e-58a0-4c3c-8915-d73317ae4f43",
    "email": "abuksincce@gmail.com",
    "username": "AbuksLC",
    "fullname": "Abuks Inc",
    "createdAt": "2025-06-01T20:55:55.374Z",
    "status": "active",
    "accountType": "BUSINESS"
  },
  "statusCode": 200
}`}
          />
        );

      case 'Login':
        return (
          <EndpointReference 
            title="Login"
            description="Authenticate an existing user and retrieve a session token."
            method="POST"
            path="/api/v1/auth/login"
            headers={[
              { name: 'x-api-key', type: 'string', description: 'Your public API key' }
            ]}
            bodyParamsJSON={`{
  "email": "abuksincce@gmail.com",
  "password": "Caicedo123"
}`}
            curlRequest={`curl --location 'https://api.valarpay.com/v1/auth/login' \\
--header 'x-api-key: 2442555352662653' \\
--data-raw '{
  "email": "abuksincce@gmail.com",
  "password": "Caicedo123"
}'`}
            sampleResponse={`{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "4c8c3a7e-58a0-4c3c-8915-d73317ae4f43",
    "email": "abuksincce@gmail.com"
  },
  "statusCode": 200
}`}
          />
        );

      case 'Transfer':
        return (
          <EndpointReference 
            title="Initiate Transfer"
            description="Transfer funds securely from a ValarPay wallet to a bank account."
            method="POST"
            path="/api/v1/transactions/transfer"
            headers={[
              { name: 'authorization', type: 'Bearer Token', description: 'Session token' },
              { name: 'x-api-key', type: 'string', description: 'Your public API key' }
            ]}
            bodyParamsJSON={`{
  "amount": 50000,
  "currency": "NGN",
  "recipientBankCode": "090286",
  "recipientAccountNumber": "0123456789",
  "narration": "Payment for services"
}`}
            curlRequest={`curl --location 'https://api.valarpay.com/v1/transactions/transfer' \\
--header 'authorization: Bearer eyJhbGci...' \\
--header 'x-api-key: 2442555352662653' \\
--data-raw '{
  "amount": 50000,
  "currency": "NGN",
  "recipientBankCode": "090286",
  "recipientAccountNumber": "0123456789",
  "narration": "Payment for services"
}'`}
            sampleResponse={`{
  "message": "Transfer initiated successfully",
  "transactionId": "txn_8943729847293",
  "status": "pending",
  "fee": 50.00,
  "statusCode": 201
}`}
          />
        );

      case 'Get Balance':
        return (
          <EndpointReference 
            title="Get Wallet Balance"
            description="Retrieve the current available balance for a specific wallet."
            method="GET"
            path="/api/v1/wallet/balance"
            headers={[
              { name: 'authorization', type: 'Bearer Token', description: 'Session token' },
              { name: 'x-api-key', type: 'string', description: 'Your public API key' }
            ]}
            curlRequest={`curl --location --request GET 'https://api.valarpay.com/v1/wallet/balance?currency=NGN' \\
--header 'authorization: Bearer eyJhbGci...' \\
--header 'x-api-key: 2442555352662653'`}
            sampleResponse={`{
  "message": "Balance retrieved",
  "data": {
    "currency": "NGN",
    "availableBalance": 450000.50,
    "ledgerBalance": 450000.50
  },
  "statusCode": 200
}`}
          />
        );

      case 'Verify Account':
        return (
          <EndpointReference 
            title="Verify Account (KYC)"
            description="Submit Bank Verification Number (BVN) or National Identity Number (NIN) to verify a user account."
            method="POST"
            path="/api/v1/auth/verify"
            headers={[
              { name: 'authorization', type: 'Bearer Token', description: 'Session token' },
              { name: 'x-api-key', type: 'string', description: 'Your public API key' }
            ]}
            bodyParamsJSON={`{
  "bvn": "22334455667",
  "nin": "12345678901",
  "verificationType": "BVN"
}`}
            curlRequest={`curl --location 'https://api.valarpay.com/v1/auth/verify' \\
--header 'authorization: Bearer eyJhbGci...' \\
--header 'x-api-key: 2442555352662653' \\
--data-raw '{
  "bvn": "22334455667",
  "verificationType": "BVN"
}'`}
            sampleResponse={`{
  "message": "Account verified successfully",
  "data": {
    "userId": "4c8c3a7e-58a0-4c3c-8915-d73317ae4f43",
    "kycLevel": 2,
    "verifiedAt": "2025-06-01T21:10:00.000Z"
  },
  "statusCode": 200
}`}
          />
        );

      case 'Transaction History':
        return (
          <EndpointReference 
            title="Get Transaction History"
            description="Retrieve a paginated list of all transactions associated with a wallet."
            method="GET"
            path="/api/v1/transactions?limit=10&page=1"
            headers={[
              { name: 'authorization', type: 'Bearer Token', description: 'Session token' },
              { name: 'x-api-key', type: 'string', description: 'Your public API key' }
            ]}
            curlRequest={`curl --location --request GET 'https://api.valarpay.com/v1/transactions?limit=10&page=1' \\
--header 'authorization: Bearer eyJhbGci...' \\
--header 'x-api-key: 2442555352662653'`}
            sampleResponse={`{
  "message": "Transactions retrieved",
  "data": {
    "transactions": [
      {
        "id": "txn_8943729847293",
        "type": "debit",
        "amount": 50000,
        "currency": "NGN",
        "status": "successful",
        "createdAt": "2025-06-01T14:30:00.000Z"
      }
    ],
    "meta": {
      "total": 1,
      "page": 1,
      "limit": 10
    }
  },
  "statusCode": 200
}`}
          />
        );

      case 'Create Virtual Account':
        return (
          <EndpointReference 
            title="Create Virtual Account"
            description="Generate a dedicated static virtual bank account number for a customer."
            method="POST"
            path="/api/v1/virtual-accounts"
            headers={[
              { name: 'authorization', type: 'Bearer Token', description: 'Session token' },
              { name: 'x-api-key', type: 'string', description: 'Your public API key' }
            ]}
            bodyParamsJSON={`{
  "email": "customer@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+2348123456789"
}`}
            curlRequest={`curl --location 'https://api.valarpay.com/v1/virtual-accounts' \\
--header 'authorization: Bearer eyJhbGci...' \\
--header 'x-api-key: 2442555352662653' \\
--data-raw '{
  "email": "customer@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+2348123456789"
}'`}
            sampleResponse={`{
  "message": "Virtual account created",
  "data": {
    "accountName": "ValarPay - John Doe",
    "accountNumber": "9876543210",
    "bankName": "Wema Bank",
    "currency": "NGN"
  },
  "statusCode": 201
}`}
          />
        );

      case 'Update Webhook':
        return (
          <EndpointReference 
            title="Update Webhook URL"
            description="Set or update the webhook URL to receive real-time event notifications."
            method="PUT"
            path="/api/v1/settings/webhook"
            headers={[
              { name: 'authorization', type: 'Bearer Token', description: 'Session token' },
              { name: 'x-api-key', type: 'string', description: 'Your public API key' }
            ]}
            bodyParamsJSON={`{
  "webhookUrl": "https://your-domain.com/webhooks/valarpay",
  "secretHash": "whsec_supersecretkey"
}`}
            curlRequest={`curl --location --request PUT 'https://api.valarpay.com/v1/settings/webhook' \\
--header 'authorization: Bearer eyJhbGci...' \\
--header 'x-api-key: 2442555352662653' \\
--data-raw '{
  "webhookUrl": "https://your-domain.com/webhooks/valarpay",
  "secretHash": "whsec_supersecretkey"
}'`}
            sampleResponse={`{
  "message": "Webhook settings updated",
  "data": {
    "webhookUrl": "https://your-domain.com/webhooks/valarpay",
    "isActive": true
  },
  "statusCode": 200
}`}
          />
        );

      default:
        return (
          <div className="w-full flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-500">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{activeTab}</h2>
            <p className="text-gray-500 max-w-lg">
              Detailed documentation and API references for {activeTab} are currently being updated. Please check back later.
            </p>
          </div>
        );
    }
  };

  return (
    <section className="w-full bg-white relative">
      <div className="w-full flex flex-col lg:flex-row items-start relative">
        
        {/* Sidebar Navigation */}
        <DeveloperSidebar activeTab={activeTab} setActiveTab={setActiveTab} mode={mode} />

        {/* Dynamic Content Area */}
        <div className="w-full lg:flex-1 p-6 md:p-10 lg:p-12 lg:pl-20 min-h-[800px] max-w-[1200px]">
          {renderContent()}
        </div>

      </div>
    </section>
  );
}
