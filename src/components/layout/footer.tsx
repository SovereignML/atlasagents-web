import Image from "next/image"
import Link from "next/link"
import { BRANDING } from "@/configs/branding"

function ExternalLinkArrow() {
  return (
    <svg
      className="-translate-x-1 translate-y-1 opacity-0 blur-[1px] transition-all duration-200 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 group-hover:blur-[0px] group-hover:delay-100"
      fill="none"
      height="20"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.5 11.9286V6.5M13.5 6.5H8.07143M13.5 6.5L6.5 13.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.9"
        strokeWidth="1.25"
      />
    </svg>
  )
}

// The four-column footer carried over verbatim from the previous site: same
// headings, same link labels, same order, same hrefs. "Resources" is a link
// under Company (pointing at the docs FAQ), not a heading of its own.
//
// The homepage anchors below all resolve — /#agents, /#features and /#pricing
// are real section ids on this site's homepage, and /docs carries #faq — so
// nothing here is a dead link. Note that this site ALSO has standalone /agents
// and /pricing pages; these entries deliberately point at the homepage
// sections, matching the previous footer rather than the newer routes.
const footerSections = [
  {
    title: "Platform",
    links: [
      { href: "/#agents", label: "Agents" },
      { href: "/#features", label: "Features" },
      { href: "/login?deploy=true", label: "Deploy" },
      { href: "/#pricing", label: "Pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/docs", label: "Docs" },
      { href: "/team", label: "Team" },
      { href: "/careers", label: "Careers" },
      { href: "/docs#faq", label: "Resources" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/terms", label: "Terms" },
      { href: "/privacy", label: "Privacy" },
      { href: "/refund", label: "Refunds" },
      { href: "/sla", label: "SLA" },
    ],
  },
  {
    title: "Connect",
    links: [
      { href: BRANDING.twitter, label: "X (Twitter)", external: true },
      { href: BRANDING.linkedin, label: "LinkedIn", external: true },
      { href: BRANDING.github, label: "GitHub", external: true },
    ],
  },
] as const

export default function Footer() {
  return (
    <footer className="relative -mt-8 overflow-x-clip pb-4 lg:-mt-16 lg:pb-6">
      {/* Footer background gradient layer. It is 2709px tall but the footer
          is ~340px, so overflow-hidden above cropped it at 87.6% of its ramp
          — already ~89% opaque — leaving a hard edge along the footer's top.
          overflow-x-clip frees the y-axis so the fade blends up; -z-10 keeps
          the layer behind the sections it now overlaps. */}
      <div className="footer-background pointer-events-none absolute bottom-0 left-0 -z-10 h-[2709px] w-full">
        <div className="absolute top-[1183px] lg:top-[886px] left-1/2 -translate-x-1/2 w-[3088px] h-[960px] pointer-events-none dark:hidden">
          <div className="absolute top-0 left-0 h-[960px] w-[1440px]">
            <Image
              alt=""
              aria-hidden
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-none bg-drift"
              width={1884}
              height={1124}
              loading="lazy"
              src="/assets/footer/background-transition.avif"
            />
          </div>
          <div className="absolute top-0 right-0 h-[960px] w-[1440px]">
            <Image
              alt=""
              aria-hidden
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-none bg-drift bg-drift--reverse"
              width={1884}
              height={1124}
              loading="lazy"
              src="/assets/footer/background-transition.avif"
            />
          </div>
        </div>
      </div>

      {/* Footer links — the first thing in the footer now that the CTA is gone,
          so it carries the top spacing the CTA block used to provide. */}
      {/* The CLUSTER is centred; the contents of each column are not. So
          `justify-center` on this row with fixed-width columns and a fixed gap
          (rather than flex-1 children in a 1200px row, which pushed the four
          headings ~300px apart), while each column below keeps its heading and
          links flush left against its own edge. */}
      <div className="relative mx-auto mt-12 flex max-w-[390px] justify-center gap-2 text-[15px] leading-5 max-lg:flex-wrap max-lg:gap-y-10 max-lg:px-[31px] lg:mt-20 lg:max-w-[760px] lg:gap-x-16">
        {footerSections.map((section) => (
          <div
            key={section.title}
            className="flex flex-col text-left max-lg:min-w-[40%] lg:w-[140px]"
          >
            <h3 className="mb-6 text-hero/[0.56] lg:mb-4">{section.title}</h3>
            <div className="relative flex flex-col">
              {section.links
                .filter((link) => !("hidden" in link && link.hidden))
                .map((link) => {
                const isExternal = "external" in link && link.external
                const className =
                  "group relative flex w-max rounded-full py-2 text-hero-white outline-offset-2 focus-visible:outline focus-visible:outline-hero-white"

                if (isExternal) {
                  return (
                    <a
                      key={link.label}
                      className={className}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                      <ExternalLinkArrow />
                    </a>
                  )
                }

                return (
                  <Link key={link.label} className={className} href={link.href}>
                    {link.label}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom copyright */}
      <div className="relative mx-auto mt-6 text-center lg:mt-8">
        <p className="text-hero/30 text-sm">
          {/* BRANDING.dbaLine spelled out so the operator can be linked. */}
          &copy; {new Date().getFullYear()} {BRANDING.name}, a DBA of{" "}
          <a
            href={BRANDING.parentCompanyUrl}
            target="_blank"
            rel="noopener"
            className="underline-offset-2 hover:text-hero/60 hover:underline"
          >
            {BRANDING.legalEntity}
          </a>
          <br />
          All rights reserved.
        </p>
      </div>
    </footer>
  )
}
