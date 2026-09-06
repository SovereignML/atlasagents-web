"use client"

import { useState } from "react"
import { BillingIntervalToggle, type BillingInterval } from "./billing-interval-toggle"
import { ByosPanel } from "./byos-panel"

/**
 * BYOS gets its own anchored section rather than hiding behind a mode toggle —
 * a visitor who already owns a server should be able to link straight to it.
 * It carries its own interval toggle so the section stands alone.
 */
export function ByosSection() {
  const [interval, setInterval] = useState<BillingInterval>("month")

  return (
    <>
      <div className="mb-8 flex justify-start">
        <BillingIntervalToggle value={interval} onChange={setInterval} />
      </div>
      <ByosPanel interval={interval} />
    </>
  )
}
