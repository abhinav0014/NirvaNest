# MASTER PROMPT — Build **NirvaNest**

## Role
You are acting as a **senior product architect, backend engineer, frontend engineer, and UX designer**.  
Your task is to design and implement **NirvaNest**, a **production-ready Nepal-first C2C marketplace**, inspired by **OLX / Facebook Marketplace**, with **optional auction functionality like eBay**.

This is not a demo or tutorial.  
It must be **secure, scalable, realistic, and free of architectural loopholes**.

---

## 1. Product Overview

**NirvaNest** is a consumer-to-consumer marketplace where users can:
- Sell items at fixed prices (primary flow)
- Enable auctions optionally (secondary flow)
- Negotiate prices in-app
- Use local Nepal payment systems
- Meet offline or transact through the platform

The platform is designed for **real Nepalese users first**, but architected to scale globally later.

---

## 2. Core Business Rules

- Marketplace type: **C2C**
- Region (initial): **Nepal**
- Currency: **NPR (multi-currency ready)**
- Admin involvement: **Minimal by default, full override available**
- Realtime tech: **No WebSockets** (polling + workers only)
- Architecture: **Modular monolith**

---

## 3. Payment System

### Supported Providers
- eSewa
- Khalti
- ConnectIPS

### Fixed-Price Listings
- Payment is **optional**
- Users may:
  - Meet and pay offline (cash)
  - Pay via platform
- If platform payment is used:
  - Funds are temporarily held
  - Released after buyer confirmation or timeout

### Auction Listings
- Platform-mediated payment is **mandatory**
- Auction ends → highest bidder wins
- Winner must pay within a fixed time window
- Funds are temporarily held
- Released after confirmation or timeout
- If unpaid → auction fails gracefully

### Payment Rules
- Frontend callbacks are never trusted
- Only server-verified webhooks update payment state
- Payments are idempotent
- Orders lock during payment

---

## 4. Authentication & Identity

- Primary identifier: **Phone number**
- OTP verification: **Mandatory**
- SMS provider: **Sparrow SMS**
- Email: Optional but encouraged
- JWT authentication with rotation
- Roles: user, admin, superadmin

---

## 5. Search & Discovery

- Use an **external search engine**
- Preferred: **Meilisearch**
- Search logic abstracted behind a service layer
- PostgreSQL never used for public search
- Filters:
  - Category
  - Location
  - Price range
  - Fixed vs auction
  - Negotiable flag

---

## 6. Image Storage & CDN

- Object storage: **Cloudflare R2**
- CDN: Cloudflare
- Backend generates signed upload URLs
- Client uploads directly
- Thumbnails generated asynchronously
- S3-compatible design for future portability

---

## 7. Auctions & Bidding Rules

- Platform-defined bid increments (tiered by price)
- Seller cannot define increments
- Bid validation is transactional
- Auction finalization handled by background workers
- No race conditions or double winners

---

## 8. Negotiation & Chat

- Listings may be marked **Negotiable**
- Built-in offer system:
  - Buyer makes offer
  - Seller accepts, counters, or rejects
- In-app chat required
- Phone numbers not publicly exposed by default

---

## 9. Background Jobs

- Worker system: **ARQ + Redis**
- Workers handle:
  - Auction finalization
  - Payment verification
  - Search indexing
  - Notifications

---

## 10. Admin System

- Admin panel inside same Next.js app (`/admin`)
- Fully role-protected
- Admins can modify or delete any data
- Freeze users and resolve disputes
- Every admin action logged
- No silent overrides

---

## 11. Categories

- Hierarchical (parent → child)
- Core categories:
  - Electronics
  - Vehicles
  - Real Estate
  - Fashion
  - Home & Garden
  - Jobs & Services
  - Mobile & Accessories

---

## 12. Tech Stack (Locked)

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Server Components for SEO pages
- Client Components only where required
- Zustand or Redux for state

### Backend
- FastAPI (async)
- PostgreSQL
- Redis
- REST APIs (gRPC-ready internally)

---

## 13. Project Structure

### Frontend

/app /(public) /(auth) /(dashboard) /api /components /lib /store /types /styles

### Backend

/app /core /api/v1 /domains /integrations /workers

Rules:
- Routes never access DB directly
- Business logic lives in services
- Repositories handle DB access only
- No circular dependencies

---

## 14. Database Design (PostgreSQL)

Core tables:
- users
- listings
- auctions
- bids
- orders
- payments
- reviews
- notifications
- admin_actions
- categories

Rules:
- UUID primary keys
- Soft deletes
- Proper indexing
- JSONB for flexible fields

---

## 15. Frontend Design System

### Color Palette
- Primary Blue: `#1E3A8A`
- Accent Blue: `#3B82F6`
- Success Green: `#10B981`
- Warning Amber: `#F59E0B`
- Error Red: `#EF4444`
- Neutral Slate range for backgrounds and text

### Typography
- Font: **Inter**
- Clean weights only
- No decorative fonts

---

## 16. Language, Theme & Animations

- Use simple, neutral, human language
- Avoid slang or marketing tone
- Theme must feel calm and trustworthy
- Animations should be subtle only:
  - Fade-ins
  - Small hover transitions
  - Light loading indicators
- No heavy motion or parallax

---

## 17. Security & Abuse Prevention

- Rate limiting
- Fraud flags
- Shadow bans
- Soft deletes
- Audit logs
- No frontend trust for critical logic

---

## 18. Non-Negotiable Rules (Zero Loopholes)

- No direct DB access from routes
- No synchronous payment logic
- No trusting client data
- No premature microservices
- No hidden admin actions
- No business logic in UI

---

## Final Expectation

Deliver:
- Production-ready code
- Typed API contracts
- Secure auth & payment flows
- Scalable architecture
- UX aligned with Nepalese users

If any assumption is unclear, ask before coding.  
Do not simplify.  
Do not skip edge cases.
