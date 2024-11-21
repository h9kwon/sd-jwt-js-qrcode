# sd-jwt-js-qrcode

A toolkit for simulating **Selective Disclosure JSON Web Tokens (SD-JWT)** workflows using QR codes. This repository demonstrates the interactions between **issuer**, **holder**, and **verifier** roles in a decentralized identifier (DID) ecosystem. The toolkit enables encoding, selective disclosure, and verification of verifiable credentials (VC) and presentations (VP) through QR code interactions.

## Features

- **SD-JWT Workflow Simulation**: Issue, hold, and verify credentials using SD-JWT.
- **QR Code Integration**: Encode and decode credential data for offline and secure interactions.
- **Custom Claims Support**: Specify claims and selective disclosure preferences.
- **Express Backend**: Simulates issuer, holder, and verifier endpoints.
- **React Frontend**: Interactive UI for holder functionalities and QR code handling.

## Basic Workflow

1. **Issuer**: Issues an SD-JWT containing claims, disclosures, and selective disclosure settings.
2. **Holder**: Receives and manages the SD-JWT. Selects claims for selective disclosure and generates a verifiable presentation (VP).
3. **Verifier**: Decodes and verifies the VP to validate the disclosed claims.
