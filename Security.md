# Security, Privacy and Limitations

Scope
This document lists known security limitations, threat mitigations applied in the prototype, recommended hardening steps, and how the app handles user data and consent. This is a hackathon prototype; the document is intentionally pragmatic and prioritizes demo safety over full production hardening.

Core principles
- Local-first storage and inference where possible to preserve user consent and privacy.
- Minimal external communication by default; any network call should be obvious in the UI and require user opt-in.
- Auditable ephemeral deletion: when a user burns a memory, an append-only audit entry is recorded and visible to the user.

Known limitations (prototype risk list)
1. Storage encryption
   - Current prototype stores blobs in IndexedDB without device-level encryption.
   - Recommendation: add per-device encryption (Web Crypto API) and protect keys behind user authentication.

2. Authentication and access control
   - Prototype uses minimal/no authentication.
   - Recommendation: add device-bound passkeys or OS-level authentication to access sensitive memories.

3. Native helper security
   - If using a native inference helper (localhost REST or socket), communication is not authenticated by default.
   - Recommendation: use mutual TLS or a local secret token bound at install time; restrict the helper to loopback and bind to localhost only.

4. Supply-chain and dependency risk
   - Dependencies should be pinned. Prototype may contain floating versions for rapid development.
   - Recommendation: pin versions, run dependency-scan tools (Snyk, npm audit), and establish reproducible builds.

5. Audit log tamper-resistance
   - The audit log is stored in the same local storage and can be modified by someone with full device access.
   - Recommendation: store an additional HMAC-signed copy of the audit entries or append hashes to a local immutable file accessible only to the app.

6. Privacy and consent UI
   - Consent UI exists but requires UX hardening to meet real-world legal standards (GDPR/CCPA).
   - Recommendation: add clear, multi-step consent flows and options for export, portability, and full irreversible deletion.

7. Data exfiltration risks
   - Any demo features that export or sync to cloud storage must be explicit and opt-in; currently these features are disabled by default.
   - Recommendation: keep all networked features opt-in and implement rate-limiting and telemetry consent.

Mitigations included in the prototype
- Local-only mode enabled by default; no external sync unless user toggles it.
- Auditable deletion: deletion is visible and logged to give users a record of the action.
- Size quotas on memory store to reduce accidental data bloat.

Hardening checklist for production (prioritized)
1. Encrypt IndexedDB blobs with Web Crypto using a key derived from a user passphrase and device-bound secret.
2. Add device-level authentication (biometric/passkey) to open the app or view sensitive entries.
3. Secure native helper: bind to localhost, require a locally stored secret, and use TLS if possible.
4. Implement robust dependency scanning and pin exact versions in package.json.
5. Implement tamper-evident audit logs using chained hashes/HMAC.
6. Add consent records export, breach response plan, and privacy policy tailored to your jurisdiction.
7. Perform a threat model review and penetration test before any public release.

Incident response (basic)
- If a data breach is suspected during demo: immediately disable network exports, revoke any keys, notify affected users and contest organizers per rules.
- Keep an emergency build that disables all network features for quick redeploy during demos.

Legal and liability note
- This project is a hackathon prototype and is not production-ready. The maintainers make no warranties about security or legal compliance.
- For any public release or commercial use, consult legal counsel and perform a full security and privacy audit.

Contact and reporting
- Open an issue in this repo for security reports. If a critical vulnerability is found during the hackathon, create a private channel to the maintainers and tag the issue as high priority.
