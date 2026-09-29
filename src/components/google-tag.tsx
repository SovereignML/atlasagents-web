import Script from "next/script"

// Google tag (gtag.js) for the Google Ads account. Rendered once, from the root
// layout, so every page carries exactly one tag — Google's rule.
//
// Consent Mode v2 defaults are set BEFORE the tag config, which is why the
// snippet is not pasted verbatim: this site has no working consent banner (see
// consent-banner.tsx — it is login-gated and this site has no login), so in the
// EEA, UK and Switzerland ad/analytics storage stays denied and Google gets only
// cookieless pings (conversions are modeled). Everywhere else behaves exactly
// like the stock snippet. If a real banner ships, call
// gtag('consent', 'update', { ... }) from it on Accept.
//
// Production only, so local dev and preview builds don't pollute conversions.
export const GOOGLE_TAG_ID = "AW-18482306958"

const CONSENT_REGIONS = [
  // EU/EEA
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU",
  "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES",
  "SE", "IS", "LI", "NO",
  // UK, Switzerland
  "GB", "CH",
]

export function GoogleTag() {
  if (process.env.NODE_ENV !== "production") return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-tag" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  region: ${JSON.stringify(CONSENT_REGIONS)}
});
gtag('js', new Date());
gtag('config', '${GOOGLE_TAG_ID}');`}
      </Script>
    </>
  )
}
