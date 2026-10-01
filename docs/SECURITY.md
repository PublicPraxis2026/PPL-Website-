# Security and Privacy

## Threat model

The MVP is a static public website.

Keep security controls proportionate to that architecture.

## MVP privacy target

Prefer:

- zero tracking
- zero analytics
- zero cookies
- zero user-data collection
- zero third-party embeds

unless later requirements explicitly change this.

## No application backend

Do not introduce:

- authentication
- sessions
- account storage
- databases
- server-side forms
- user profiles

## Deployment security

Later deployment work should consider:

- HTTPS
- Content-Security-Policy
- Referrer-Policy
- X-Content-Type-Options
- Permissions-Policy
- `frame-ancestors`

The CSP must reflect actual site requirements rather than being cargo-culted.

Document production security behaviour.
