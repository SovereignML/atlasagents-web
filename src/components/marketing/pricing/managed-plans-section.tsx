"use client"

import { useState } from "react"
import { BillingIntervalToggle, type BillingInterval } from "./billing-interval-toggle"
import { ManagedPlansGrid } from "./managed-plans-grid"

/**
 * The managed plan grid plus its billing toggle. Client-only because the
 * interval is local state; everything around it on the pricing page stays a
 * server component.
 */
export function ManagedPlansSection() {
  const [interval, setInterval] = useState<BillingInterval>("month")

  return (
    <>
      <div className="mb-8 flex justify-start">
        <BillingIntervalToggle value={interval} onChange={setInterval} />
      </div>
      <ManagedPlansGrid interval={interval} />
    </>
  )
}
