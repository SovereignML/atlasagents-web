import type { Metadata } from "next"
import Link from "next/link"
import {
  PageHero,
  Section,
  SpecTable,
  CodeBlock,
  type SpecColumn,
} from "@/components/marketing/primitives"
import { Reveal, RevealGroup, RevealItem } from "@/components/marketing/motion/reveal"
import { findRuntime } from "@/configs/runtimes"

export const metadata: Metadata = {
  title: "API",
  description:
    "Every Hermes agent ships an OpenAI-compatible API at /v1/* behind a bearer token, on the same URL as its chat UI. Point any OpenAI SDK at it and swap two values.",
  alternates: { canonical: "/api" },
}

const hermes = findRuntime("hermes")

const SPEC_COLUMNS: SpecColumn[] = [
  { key: "field", header: "Field", sticky: true },
  { key: "value", header: "Value" },
]

const SPECS = [
  { key: "base", field: "Base URL", value: "https://<your-agent-host>/v1" },
  { key: "auth", field: "Auth", value: "Authorization: Bearer <gateway token>" },
  { key: "shape", field: "Shape", value: "OpenAI Chat Completions — same request and response bodies" },
  { key: "cors", field: "CORS", value: "Enabled, so a browser client can call it directly" },
  { key: "runtime", field: "Runtime required", value: "Hermes. OpenClaw does not expose an API." },
  { key: "plan", field: "Minimum machine", value: `${hermes.minRamGb} GB RAM — Hermes will not run on the 1 GB tier` },
  { key: "token", field: "Where the token is", value: "The Gateway Token card on the agent's dashboard page" },
  { key: "coexist", field: "Alongside the UI", value: "Same host. / serves the chat UI, /v1/* serves the API." },
]

const CURL = `curl -X POST https://<your-agent-host>/v1/chat/completions \\
  -H "Authorization: Bearer $GATEWAY_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "auto",
    "messages": [{"role": "user", "content": "ping"}]
  }'`

const PYTHON = `from openai import OpenAI

client = OpenAI(
    base_url="https://<your-agent-host>/v1",
    api_key="<gateway token>",
)

resp = client.chat.completions.create(
    model="auto",
    messages=[{"role": "user", "content": "ping"}],
)
print(resp.choices[0].message.content)`

const USES = [
  {
    title: "Wake it from CI",
    body: "A build step, a monitor webhook, or a cron job hands the agent work. It does not need a person in a browser to start.",
  },
  {
    title: "Put it behind your own UI",
    body: "Your product calls the agent and renders the answer wherever you want it. CORS is on, so a browser client works.",
  },
  {
    title: "Connect a chat surface",
    body: "Anything that can already speak to an OpenAI-compatible endpoint — a Telegram bot, a Discord bot, an internal tool — points at your agent instead.",
  },
  {
    title: "Swap an existing integration",
    body: "If you already call OpenAI, change the base URL and the key. The request and response bodies do not change.",
  },
]

export default function ApiPage() {
  return (
    <>
      <PageHero
        eyebrow="API"
        title="One agent. A chat UI and an endpoint."
        lead="Deploy on Hermes and your agent answers people in a browser and code over HTTP, on the same host. Point any OpenAI SDK at it and change two values — the base URL and the key."
        facts={[
          "OpenAI-compatible",
          "Bearer token auth",
          "CORS enabled",
          `Hermes runtime · ${hermes.minRamGb} GB minimum`,
        ]}
        primary={{ label: "Deploy a Hermes agent", href: "/register?deploy=true" }}
        secondary={{ label: "Compare runtimes", href: "/runtimes" }}
      />

      <Section
        index={1}
        id="shape"
        eyebrow="The contract"
        title="It is the Chat Completions API"
        lead="Not an API inspired by it — the same request and response shapes, so the SDK you already use works unmodified."
      >
        <SpecTable
          columns={SPEC_COLUMNS}
          rows={SPECS.map((s) => ({ key: s.key, cells: { field: s.field, value: s.value } }))}
        />
      </Section>

      <Section index={2} id="call" eyebrow="Calling it" title="Two values change. Nothing else.">
        <div className="grid gap-3 lg:grid-cols-2">
          <CodeBlock label="curl" code={CURL} />
          <CodeBlock label="OpenAI Python SDK" code={PYTHON} />
        </div>
        <p className="mt-6 text-[14px] leading-[1.6] text-hero/55">
          The Node SDK works the same way — construct the client with your agent&apos;s{" "}
          <span className="font-mono text-hero/75">base_url</span> and the gateway token as
          the API key.
        </p>
      </Section>

      <Section
        index={3}
        id="uses"
        eyebrow="What it unlocks"
        title="The agent stops needing a person to start it"
      >
        <RevealGroup className="grid gap-3 sm:grid-cols-2">
          {USES.map((use) => (
            <RevealItem
              key={use.title}
              className="rounded-2xl border border-hero/[0.10] bg-hero/[0.02] p-5"
            >
              <h3 className="text-[15px] font-medium text-hero-white">{use.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.55] text-hero/65">{use.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section
        index={4}
        id="auth-model"
        eyebrow="Credentials"
        title="The API token and the login are separate"
        lead="A Hermes agent has two doors and two keys. Rotating one does not rotate the other — which is the behaviour you want, and worth knowing before you assume otherwise."
        width="narrow"
      >
        <Reveal className="space-y-4 text-[15px] leading-[1.65] text-hero/75">
          <p>
            The browser chat interface is behind a session login. The API at{" "}
            <span className="font-mono text-hero-white">/v1/*</span> is behind a gateway
            bearer token. Revoking a person&apos;s browser access does not revoke a bot&apos;s,
            and vice versa.
          </p>
          <p className="text-hero/55">
            Treat the gateway token like any other server credential: keep it out of client
            bundles you do not control, and rotate it from the dashboard if it leaks.
          </p>
        </Reveal>
      </Section>

      <Section
        index={5}
        id="not-yet"
        eyebrow="Not yet"
        title="There is no control-plane API"
        lead="Worth being explicit, because this is the thing people assume exists."
        width="narrow"
      >
        <Reveal className="space-y-4 text-[15px] leading-[1.65] text-hero/75">
          <p>
            What is documented above talks to <em>one agent that already exists</em>. There is
            no programmatic API key system for the platform itself — you cannot yet create,
            resize, or tear down agents from code. That is on the roadmap and is not shipped;
            deployment happens in the dashboard today.
          </p>
          <p>
            If provisioning agents programmatically is the reason you are here, tell us before
            you build around it. We would rather say &quot;not yet&quot; now than have you find
            out during integration.
          </p>
        </Reveal>

        <Reveal className="mt-8 flex flex-wrap items-center gap-4">
          <Link href="/register?deploy=true" className="btn-green !py-3 !px-7 !text-[15px]">
            Deploy a Hermes agent
          </Link>
          <Link
            href="/runtimes"
            className="text-[14px] font-medium text-hero/60 hover:text-hero-white"
          >
            Why Hermes and not OpenClaw →
          </Link>
        </Reveal>
      </Section>
    </>
  )
}
