---
sidebar_label: "ADR-010: Payment Token Storage"
description: "Decision to store only opaque gateway tokens for saved payment methods, keeping raw card data out of Curriculab's systems."
---

# ADR-010: Payment Gateway Token Storage — No Raw Card Data

**Date:** 2026-02-19
**Status:** Accepted

## Context

Students can save payment methods (credit card, ACH bank account) for future tuition and fee payments. Subsequent charges should be processable without the student re-entering their full card details.

Storing or transmitting raw card numbers (Primary Account Number / PAN), CVV, or full bank account numbers in Curriculab's application tier would bring the system into **PCI DSS scope for card data storage** (Self-Assessment Questionnaire D). SAQ D is the most demanding PCI compliance tier, requiring:

- Annual on-site assessment by a Qualified Security Assessor (QSA)
- Encryption of card data at rest and in transit throughout every system that touches the data
- Strict network segmentation between card-data-handling components and the rest of the application
- Extensive logging, monitoring, and access control requirements on all systems in scope

This compliance burden is avoidable: modern payment gateways (Stripe, Braintree, Adyen) offer tokenization — the gateway collects raw card data directly from the browser or mobile client (via a gateway-hosted form or JavaScript SDK), and returns an opaque token that represents the card. Subsequent charges are made by sending this token to the gateway, never the raw card number.

## Decision

`SavedPaymentMethod.provider_token` stores **only the opaque token returned by the payment gateway**. Raw card numbers, CVV, and full bank account numbers are never collected by, transmitted through, stored in, or logged by the Curriculab application tier.

Display metadata — `last_four`, `card_brand`, `expiry_month`, `expiry_year` — is stored as non-sensitive structured columns. This data is sufficient to display "Visa ending in 4242 — expires 12/27" without exposing sensitive card data.

When a student initiates a payment using a saved method, the application sends `provider_token` to the gateway API to process the charge. The gateway handles all card data; Curriculab handles only the resulting charge status.

CVV is never stored under any circumstances — card network rules prohibit storing CVV even in encrypted form, and gateways do not return it in tokenization responses.

## Consequences

**Positive**
- The Curriculab application tier is out of PCI DSS scope for card data storage, dramatically reducing compliance burden and audit cost.
- Breach impact is bounded: an attacker who exfiltrates `SavedPaymentMethod` rows obtains opaque, gateway-specific tokens that cannot be used to extract card numbers or process charges outside the gateway's fraud controls.
- Display metadata (`last_four`, `card_brand`, expiry) provides a good user experience without touching sensitive data.
- The design is gateway-agnostic at the schema level — `provider_token` holds whatever string the gateway returns; switching gateways requires a re-tokenization migration, not a schema change.

**Negative**
- Curriculab is dependent on the gateway for the full saved-payment lifecycle: card updates when a card is re-issued (gateway handles via account updater services), deletions, and dispute handling all flow through the gateway.
- If the gateway invalidates a token (account closure, provider policy change, extended inactivity), the saved method silently becomes unusable until a charge attempt fails. The application must handle this failure gracefully and prompt the student to re-add the payment method.
- Migrating from one payment gateway to another requires re-tokenizing all saved payment methods — either by asking students to re-enter card details or by using the source gateway's token migration API (if available).

**Neutral**
- The choice of payment gateway (Stripe, Braintree, Adyen, etc.) is not decided by this ADR. Any gateway that offers server-side tokenization is compatible with this design.

## Alternatives Considered

**Store raw card numbers (PAN) encrypted at rest**
Encrypting PAN before storage is a common attempt to reduce PCI scope, but storing encrypted card data still places the application in PCI DSS SAQ D scope — the encryption key is itself a high-value target and must be managed under PCI controls. Breach impact is reduced (attacker must also compromise the key) but not eliminated. All systems that can access the key are in scope. Rejected.

**Store raw card numbers unencrypted**
Not acceptable under any circumstances. Immediate PCI DSS violation; maximum breach liability. Rejected.

**No saved payment methods**
Students re-enter card details for every payment. Eliminates all card-data handling concerns. Rejected because saving a payment method is an explicit product requirement (PAY-003) and a significant usability feature for recurring tuition payments.

**Store card data via a PCI-compliant vault service (e.g., a dedicated card vault)**
A separate infrastructure component that stores encrypted card data and returns a vault token for use in the application — functionally equivalent to a gateway token but self-operated. Adds significant infrastructure and operational complexity (key management, HSM, compliance scope on the vault itself). The payment gateway already provides this capability as part of its core service. Rejected in favour of using the gateway's tokenization directly.
