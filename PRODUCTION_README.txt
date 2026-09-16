ARK-OS / N.O.I.S.E. Harbour · v40.3 Production Bundle

DEPLOYMENT
1. Upload index.html, index.css, manifest.webmanifest, sw.js, the icons/ directory and the public/ directory to the same web root.
2. Serve the site over HTTPS (required for service-worker/PWA installation outside localhost).
3. Keep sw.js at the application root so its scope covers the complete interface.
4. index.html is the complete production entry point. Runtime logic is embedded in that file.

GITHUB PAGES
1. Push this repository to GitHub.
2. In GitHub, open Settings -> Pages.
3. Under Build and deployment, set Source to GitHub Actions.
4. The included .github/workflows/pages.yml workflow publishes the static root on every push to main.
5. .nojekyll is included so GitHub Pages serves the static assets exactly as committed.

BOUNDARY NOTICE STATE
The Operational Signal Notice uses one first-party technically necessary cookie:
  arkos_signal_notice_ack=v40
Lifetime: up to 365 days
Purpose: remember that the notice was acknowledged.
It stores no identity, runtime observation, form content or navigation history.

PWA
Compatible browsers can expose the native install prompt. On iPhone/iPad, the interface provides Share → Add to Home Screen guidance. The app icon, manifest and offline-capable service worker are included.

Reality remains the acceptance test. ∴


INSTALL SURFACE · v40.3
The in-app “Install ARK-OS” control remains visible whenever the app is not already running in standalone mode.
If the browser supports a native install prompt, ARK-OS uses it. Otherwise the control gives platform-specific installation guidance.
A downloaded file:// copy or ChatGPT/sandbox preview is not a production PWA origin. Deploy the bundle over HTTPS (or localhost for testing).

HEADER / OPERATIONAL ACCESS · v40.3
The Operational Footbar is hidden on entry and controlled by the ARK-OS chip on desktop. Mobile keeps direction-aware access. When Runtime Injection is stowed on desktop, the ARK-OS chip moves to the central operator datum above AUTHORIZE without changing header or navigation geometry. The footbar follows the primary content width.
