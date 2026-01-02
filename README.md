# NirvaNest

**NirvaNest** is a Nepal-first **consumer-to-consumer marketplace** inspired by OLX and eBay, built using **Next.js** and **FastAPI**. The platform focuses on simple fixed-price reselling with optional auction functionality, local payment support, and a scalable, production-ready system design.

---

## Overview

NirvaNest allows users to buy and sell items easily within Nepal, using a familiar marketplace flow that emphasizes trust and accessibility. Sellers can post listings without manual approval, while buyers can browse, negotiate, or participate in auctions depending on the listing type.

The platform is designed around real usage patterns in Nepal, with **phone-based authentication**, **NPR currency**, and support for **eSewa, Khalti, and ConnectIPS**, while remaining flexible enough to expand internationally in the future.

---

## Key Features

- Fixed-price listings (OLX-style reselling)
- Optional auction-based selling (eBay-inspired)
- Phone number authentication with OTP
- Local payment integrations (eSewa, Khalti, ConnectIPS)
- Optional platform-mediated payments
- Secure auction finalization and payment verification
- In-app negotiation and chat system
- Hierarchical categories with advanced filters
- Admin dashboard with full override and audit logging

---

## Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Server Components for SEO-focused pages
- Client Components for interactive features

### Backend
- FastAPI (async)
- PostgreSQL
- Redis
- ARQ for background jobs

### Infrastructure
- Cloudflare R2 for image storage
- CDN-backed image delivery
- External search engine (Meilisearch)
- Webhook-based payment verification

---

## Architecture Highlights

- Modular monolith architecture
- Clear separation between routes, services, and repositories
- No direct database access from API routes
- Background workers for auctions, payments, and search indexing
- Designed to scale cleanly without early microservices

---

## Payment Model

### Fixed-Price Listings
- Offline payment (meetup/cash) allowed
- Platform payment optional

### Auction Listings
- Platform-mediated payment required
- Winner must pay within a defined time window

Funds are temporarily held and released after buyer confirmation or a timeout period. Frontend payment callbacks are never trusted.

---

## Security & Reliability

- Server-side validation for all critical actions
- Transaction-safe bidding logic
- Idempotent payment handling
- Rate limiting and abuse prevention
- Admin actions fully logged for accountability

---

## Design Principles

- Mobile-first user experience
- Clean, minimal interface
- Clear pricing and seller visibility
- Trust-focused layout and colors
- Subtle animations only where useful

---

## Status

NirvaNest is designed as a **real-world, production-ready marketplace**, not a demo project. The architecture supports real users, real payments, and long-term growth.

---

## Future Enhancements

- Multi-country and multi-currency support
- Additional payment gateways
- Delivery and logistics integrations
- Advanced moderation and fraud detection
