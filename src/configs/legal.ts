// Shared values for the legal pages (Terms, Privacy, Refund, SLA).
//
// These four documents must agree with each other — a rename notice that
// appears on Terms but not Privacy reads as an oversight, and divergent
// "Last updated" dates invite the question of which one is current. Keep them
// here rather than as four copies.

import { BRANDING } from "@/configs/branding"

/** Date stamped on all four legal documents. Bump when their substance changes. */
export const LEGAL_LAST_UPDATED = "August 30, 2026"

/**
 * Continuity statement for the SovereignML → Atlas Agents rename.
 *
 * Users accepted documents that named "SovereignML" as the Platform, so the
 * relationship between the old name, the new name, and the unchanged operating
 * company is stated explicitly rather than left to inference.
 */
export const RENAME_NOTICE = `${BRANDING.name} is a ${BRANDING.legalEntity} product. The Platform was previously named ${BRANDING.legacyName} and served at ${BRANDING.legacyHosts.site[0]}; it is now ${BRANDING.name}, at ${BRANDING.domain}.

This is a change of product name only. The operating company remains ${BRANDING.legalEntity}, ${BRANDING.jurisdiction}, and your account, subscription, credits, and data are unaffected. Any reference to "${BRANDING.legacyName}" as the Platform — in an earlier version of this document, on an invoice, or in other correspondence — should be read as a reference to ${BRANDING.name}.`

/** Short label used as the callout heading above each document. */
export const RENAME_NOTICE_TITLE = "Notice — we have changed our name"
