# Multi-Currency Payout API Update Summary

## Overview
Updated the multi-currency payout/transfer functionality to match the actual API specification.

## API Endpoint Changes

### POST - Create Payout

#### Before:
- Endpoint: `/currency/accounts/{currency}/payouts`
- Supported currencies: USD, EUR, GBP

#### After:
- Endpoint: `/api/v1/currency/accounts/{currency}/payouts`
- Supported currencies: USD, EUR, GBP, **NGN** (added)

### GET - Fetch Payouts

#### Before:
- Endpoint: `/currency/accounts/{currency}/payouts`

#### After:
- Endpoint: `/api/v1/currency/accounts/{currency}/payouts`
- Query Parameters: `limit` (default: 50), `offset` (default: 0)

### GET - Fetch Transactions

#### Before:
- Endpoint: `/currency/accounts/{currency}/transactions`

#### After:
- Endpoint: `/api/v1/currency/accounts/{currency}/transactions`
- Query Parameters: `limit` (default: 50), `offset` (default: 0)

## Request Payload Changes (POST Create Payout)

### Before:
```typescript
{
  destinationId: string;
  amount: number;
  reference?: string;
  description?: string;
  walletPin: string;
}
```

### After (matching API spec):
```typescript
{
  destination_id: string;  // Changed to snake_case
  amount: number;
  description?: string;    // Kept optional
  // Removed: reference, walletPin
}
```

## Response Structure

### Create Payout (POST)
```json
{
  "message": "Payout created successfully",
  "payout": {
    "id": "550e8400-e29b-41d4-a716-446655440050",
    "destination_id": "550e8400-e29b-41d4-a716-446655440040",
    "amount": 100.5,
    "description": "Payment for services",
    "status": "pending",
    "fee": 2.5,
    "created_at": "2025-01-20T10:30:00.000Z"
  }
}
```

### Get Payouts (GET)
```json
{
  "payouts": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440050",
      "account_id": "acc_1234567890",
      "destination_id": "550e8400-e29b-41d4-a716-446655440040",
      "amount": 100.5,
      "currency": "USD",
      "status": "completed",
      "reference": "payout_ref_1234567890",
      "fee": 2.5,
      "created_at": "2025-01-20T10:30:00.000Z",
      "updated_at": "2025-01-20T10:35:00.000Z"
    }
  ],
  "count": 1,
  "limit": 50,
  "offset": 0
}
```

### Get Transactions (GET)
```json
{
  "transactions": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440020",
      "account_id": "acc_1234567890",
      "amount": 100.5,
      "currency": "USD",
      "transaction_type": "credit",
      "status": "completed",
      "description": "Deposit from external source",
      "reference": "ref_1234567890",
      "created_at": "2025-01-19T14:30:00.000Z",
      "updated_at": "2025-01-19T14:30:00.000Z"
    }
  ],
  "count": 2,
  "limit": 50,
  "offset": 0
}
```

## Files Modified

### 1. `/src/api/currency/currency.apis.ts`
- Updated `createPayoutRequest` endpoint to `/api/v1/currency/accounts/{currency}/payouts`
- Updated `getCurrencyAccountPayoutsRequest` endpoint to `/api/v1/currency/accounts/{currency}/payouts`
- Updated `getCurrencyAccountTransactionsRequest` endpoint to `/api/v1/currency/accounts/{currency}/transactions`
- Added NGN to all currency type definitions
- Updated functions:
  - `getCurrencyAccountByCurrencyRequest`
  - `getCurrencyAccountTransactionsRequest` ✅ **Updated endpoint**
  - `getCurrencyAccountDepositsRequest`
  - `getCurrencyAccountPayoutsRequest` ✅ **Updated endpoint**
  - `getCurrencyAccountPayoutDestinationsRequest`
  - `createPayoutDestinationRequest`
  - `createPayoutRequest` ✅ **Updated endpoint**

### 2. `/src/api/currency/currency.types.ts`
- Updated `ICreatePayout` interface:
  - Changed `destinationId` to `destination_id`
  - Removed `reference` field
  - Removed `walletPin` field
- Updated `ICurrencyTransaction` interface:
  - Added `account_id` field
  - Added `currency` field
  - Added `updated_at` field
- Updated `ICurrencyPayout` interface:
  - Added `account_id` field
  - Added `destination_id` field
  - Added `currency` field
  - Added `updated_at` field
  - Reordered fields to match API response
- Added NGN to `ICurrencyAccount` and `ICreateCurrencyAccount` currency types

### 3. `/src/api/currency/currency.queries.ts`
- Added NGN support to all currency-related hooks:
  - `useGetCurrencyAccountByCurrency`
  - `useGetCurrencyAccountTransactions` ✅ **Now uses updated endpoint**
  - `useGetCurrencyAccountDeposits`
  - `useGetCurrencyAccountPayouts` ✅ **Now uses updated endpoint**
  - `useGetCurrencyAccountPayoutDestinations`
  - `useCreateCurrencyAccountPayoutDestination`
  - `useCreateCurrencyAccountPayout` ✅ **Now uses updated endpoint**
  - `useGetBanksByCurrency`
  - `useGetTransferFee`

### 4. `/src/components/modals/currency/CreatePayoutModal.tsx`
- Removed `reference` state and input field
- Removed `walletPin` state and PIN input field
- Removed `PinInputWithFingerprint` import (no longer needed)
- Updated payload to use `destination_id` instead of `destinationId`
- Simplified form validation (removed PIN length check)

## Breaking Changes
⚠️ **Important**: The following fields have been removed from the payout creation flow:
1. **Reference field** - No longer supported by the API
2. **Wallet PIN** - No longer required for payout creation

## New Features
✅ **NGN Currency Support**: All multi-currency endpoints now support Nigerian Naira (NGN) in addition to USD, EUR, and GBP.

## Testing Recommendations
1. Test payout creation with all supported currencies (USD, EUR, GBP, NGN)
2. Verify that the API endpoints are correctly called with `/api/v1` prefix
3. Confirm that `destination_id` is properly sent in the request
4. Test error handling for the new API response structure
5. Verify that the removal of PIN and reference fields doesn't break existing flows
6. Test GET endpoints for payouts and transactions with pagination (limit/offset)
7. Verify that the response data is correctly parsed and displayed in the UI

## API Documentation Reference

### POST - Create Payout
- **Method**: POST
- **Endpoint**: `/api/v1/currency/accounts/{currency}/payouts`
- **Parameters**: 
  - `currency` (path): NGN, USD, EUR, GBP
- **Request Body**:
  ```json
  {
    "destination_id": "550e8400-e29b-41d4-a716-446655440040",
    "amount": 100.5,
    "description": "Payment for services"
  }
  ```
- **Response Codes**:
  - 201: Payout created successfully
  - 400: Bad request - Invalid input, insufficient balance, or account not found
  - 401: Unauthorized - Invalid or missing JWT token
  - 404: Account or destination not found

### GET - Fetch Payouts
- **Method**: GET
- **Endpoint**: `/api/v1/currency/accounts/{currency}/payouts`
- **Parameters**: 
  - `currency` (path): NGN, USD, EUR, GBP
  - `limit` (query): Number of payouts to retrieve (default: 50)
  - `offset` (query): Pagination offset (default: 0)
- **Response Codes**:
  - 200: Payouts retrieved successfully
  - 400: Bad request - Invalid currency or account not found
  - 401: Unauthorized - Invalid or missing JWT token
  - 404: Account not found for this currency

### GET - Fetch Transactions
- **Method**: GET
- **Endpoint**: `/api/v1/currency/accounts/{currency}/transactions`
- **Parameters**: 
  - `currency` (path): NGN, USD, EUR, GBP
  - `limit` (query): Number of transactions to retrieve (default: 50)
  - `offset` (query): Pagination offset (default: 0)
- **Response Codes**:
  - 200: Transactions retrieved successfully
  - 400: Bad request - Invalid currency or account not found
  - 401: Unauthorized - Invalid or missing JWT token
  - 404: Account not found for this currency

