import type { Metadata } from "next"
import Link from "next/link"
import {
  PageHero,
  Section,
  SpecTable,
  IncludedList,
  type SpecColumn,
} from "@/components/marketing/primitives"
import { Reveal, RevealGroup, RevealItem } from "@/components/marketing/motion/reveal"
import { ACCOUNT_INTEGRATIONS } from "@/configs/integrations"
import { BRANDING } from "@/configs/branding"

export const metadata: Metadata = {
  title: "Security",
  description:
    "How Atlas Agents isolates, encrypts and scopes your data: a dedicated instance per agent, root passwords encrypted at rest, account-scoped queries, minimal third-party scopes, and no model training on your data.",
  alternates: { canonical: "/security" },
}

// Every claim here maps to something implemented in the platform. Where a
// control is not in place, it is listed under "What we do not claim" rather
// than omitted — a security page that only lists wins is not a security page.
const CONTROL_COLUMNS: SpecColumn[] = [
  { key: "control", header: "Control", sticky: true },
  { key: "how", header: "How it works" },
]

const CONTROLS = [
  {
    key: "isolation",
    control: "Instance isolation",
    how: "Every agent runs on its own machine, dedicated to your account. No agent shares a box with another customer's.",
  },
  {
    key: "scoping",
    control: "Query scoping",
    how: "Database reads are scoped to your account id. Agents, subscriptions and SSH keys from one account are not reachable from another.",
  },
  {
    key: "rootpw",
    control: "Root password encryption",
    how: "Instance root passwords are encrypted at rest with AES-256-GCM and a per-instance initialization vector. The key lives in the environment, never in the database.",
  },
  {
    key: "passwords",
    control: "Account passwords",
    how: "Hashed with bcrypt. Never stored in plaintext, and never recoverable — only resettable.",
  },
  {
    key: "reset",
    control: "Password reset tokens",
    how: "Stored as SHA-256 hashes. The plaintext token exists only in the email link, never in our database.",
  },
  {
    key: "sessions",
    control: "Sessions",
    how: "Stateless JWTs. There is no server-side session store to leak, and the role is carried in the token.",
  },
  {
    key: "ratelimit",
    control: "Rate limiting",
    how: "Registration is capped per IP per hour, and password reset per address per hour, so neither endpoint is a usable oracle.",
  },
  {
    key: "transit",
    control: "In transit",
    how: "SSL is terminated for every agent on its own public URL. HSTS, nosniff, frame-deny and a strict referrer policy are set at the edge.",
  },
  {
    key: "secrets",
    control: "Third-party secrets",
    how: "Tokens you connect are encrypted at rest with AES-256-GCM, held one-per-account, and revoked on a best-effort basis when you disconnect.",
  },
]

// Flat negations, in the register the reader is actually scanning for.
const NEGATIONS = [
  "We do not train models on your data.",
  "We do not share an agent's machine between customers.",
  "We do not store your account password, in any recoverable form.",
  "We do not write API keys, hosts, IPs, tokens or billing data into a backup.",
  "We do not request broad third-party scopes when a narrow one will do.",
  "We do not keep your Drive or Cloudflare credentials after you disconnect.",
]

const NOT_CLAIMED = [
  {
    title: "We are not SOC 2 or ISO 27001 certified",
    body: "No audit has been completed. If your procurement process requires an attestation report, we cannot satisfy it today — say so early and we will tell you where we actually are rather than waste your time.",
  },
  {
    title: "There is no customer-managed encryption key",
    body: "Encryption keys are held by the platform. You cannot bring your own KMS key or revoke ours independently. Bring your own server if you need the data on hardware you control.",
  },
  {
    title: "There is no formal data-residency guarantee",
    body: "You pick a region at deploy and the agent is provisioned there, but we do not contractually pin data to a jurisdiction. Talk to us before assuming otherwise.",
  },
]

export default function SecurityPage() {
  return (
    <>
      <PageHero
        eyebrow="Security"
        title="Isolated by default, scoped on purpose"
        lead="An agent that reads your documents and holds your credentials is a security decision, not just a product one. Here is exactly what protects it — and, at the bottom, what we do not claim."
        facts={["One machine per agent", "AES-256-GCM at rest", "No training on your data"]}
        primary={{ label: "Deploy an agent free", href: "/register?deploy=true" }}
        secondary={{ label: "Read the privacy policy", href: "/privacy" }}
      />

      <Section
        index={1}
        id="isolation"
        eyebrow="Isolation"
        title="Your agent is not a tenant on someone else's box"
      >
        <Reveal className="max-w-[720px] space-y-4 text-[15px] leading-[1.65] text-hero/75">
          <p>
            The unit we provision is a whole machine, not a seat in a shared runtime. Your
            agent gets its own server, its own filesystem, its own process, and its own
            public hostname with SSL terminated for it.
          </p>
          <p>
            That is the reason isolation is on every plan rather than an enterprise tier.
            It is not a feature we added — it is the shape of the thing.
          </p>
        </Reveal>
      </Section>

      <Section
        index={2}
        id="controls"
        eyebrow="Controls"
        title="What actually protects the data"
      >
        <SpecTable
          columns={CONTROL_COLUMNS}
          rows={CONTROLS.map((c) => ({ key: c.key, cells: { control: c.control, how: c.how } }))}
        />
      </Section>

      <Section
        index={3}
        id="no"
        eyebrow="Plainly"
        title="What we do not do"
        lead="The list people actually want, without hedging."
      >
        <IncludedList items={NEGATIONS} columns={2} />
      </Section>

      <Section
        index={4}
        id="third-party"
        eyebrow="Third-party access"
        title="Minimum scope, one connection, revocable"
        lead="Two integrations ask for access to an account you own. Both are deliberately narrow, and neither can reach beyond what it created."
      >
        <RevealGroup className="grid gap-3 lg:grid-cols-2">
          {ACCOUNT_INTEGRATIONS.map((integration) => (
            <RevealItem
              key={integration.name}
              className="flex flex-col rounded-2xl border border-hero/[0.10] bg-hero/[0.02] p-6"
            >
              <h3 className="text-[16px] font-medium text-hero-white">{integration.name}</h3>
              <p className="mt-3 text-[14px] leading-[1.6] text-hero/70">{integration.scope}</p>
              <ul className="mt-5 space-y-2 border-t border-hero/[0.08] pt-5">
                {integration.guarantees.map((g) => (
                  <li key={g} className="flex gap-2.5 text-[14px] leading-[1.5] text-hero/70">
                    <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-signal" />
                    {g}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section
        index={5}
        id="not-claimed"
        eyebrow="Honestly"
        title="What we do not claim"
        lead="A security page that only lists strengths is marketing. These are the gaps — you should know them before you buy, not during procurement."
      >
        <RevealGroup className="grid gap-3 lg:grid-cols-3">
          {NOT_CLAIMED.map((item) => (
            <RevealItem
              key={item.title}
              className="flex flex-col rounded-2xl border border-hero/[0.10] bg-hero/[0.02] p-6"
            >
              <h3 className="text-[15px] font-medium text-hero-white">{item.title}</h3>
              <p className="mt-3 text-[14px] leading-[1.6] text-hero/65">{item.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section index={6} id="report" eyebrow="Reporting" title="Found something?" width="narrow">
        <Reveal className="text-[15px] leading-[1.65] text-hero/75">
          Send it to{" "}
          <a
            href={`mailto:${BRANDING.securityEmail}`}
            className="text-signal hover:underline underline-offset-4"
          >
            {BRANDING.securityEmail}
          </a>
          . Tell us what you found and how to reproduce it; we will confirm receipt and tell
          you what we are doing about it. Please do not test against other customers&apos;
          agents.
        </Reveal>

        <Reveal className="mt-8 flex flex-wrap items-center gap-4">
          <Link href="/register?deploy=true" className="btn-green !py-3 !px-7 !text-[15px]">
            Deploy an agent free
          </Link>
          <Link href="/byos" className="text-[14px] font-medium text-hero/60 hover:text-hero-white">
            Or keep the data on your own hardware →
          </Link>
        </Reveal>
      </Section>
    </>
  )
}
