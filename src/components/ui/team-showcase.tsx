"use client";

import { useState } from 'react';
import { Linkedin, Instagram } from 'lucide-react';
import { cn } from '@/lib/utils';

// X's brand mark. lucide-react has no equivalent — its `Twitter` is the
// pre-rebrand bird and its `X` is a close/cross glyph — so inline it.
function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  social?: {
    x?: string;
    linkedin?: string;
    instagram?: string;
  };
}

// {{TODO}}: replace every '#' below with the real profile URL BEFORE DEPLOY.
// These are inert placeholders so the layout can be reviewed — they render the
// icons but go nowhere. Supported keys: x, instagram, linkedin. Drop a
// key entirely to hide that icon for that person; a member with no keys shows
// no icons at all.
const DEFAULT_MEMBERS: TeamMember[] = [
  // Slot 1: intentionally blank to balance the 6-tile grid with 5 people.
  {
    id: 'blank',
    name: '',
    role: '',
    image: '',
  },
  {
    id: 'pavan-meka',
    name: 'Pavan Meka',
    role: 'Founder & CEO',
    image: '/assets/team/Pavan_Meka.png',
    social: { x: '#', instagram: '#', linkedin: '#' },
  },
  {
    id: 'subba-reddy-meka',
    name: 'Subba Reddy Meka',
    role: 'Head of Operations',
    image: '/assets/team/Subba_Reddy_Meka.png',
    social: { x: '#', instagram: '#', linkedin: '#' },
  },
  {
    id: 'mahmudur-labib',
    name: 'Mahmudur Labib',
    role: 'Co-Founder & Head of Product',
    image: '/assets/team/Labib.jpg',
    social: { x: '#', instagram: '#', linkedin: '#' },
  },
  {
    id: 'mahfuz-imon',
    name: 'Mahfuz Imon',
    role: 'Platform Lead',
    image: '/assets/team/Mahfuz_Imon.jpg',
    social: { x: '#', instagram: '#', linkedin: '#' },
  },
  {
    id: 'yeasir-joy',
    name: 'Yeasir Joy',
    role: 'Head of Growth',
    image: '/assets/team/Yeasir_Joy.png',
    social: { x: '#', instagram: '#', linkedin: '#' },
  },
];

interface TeamShowcaseProps {
  members?: TeamMember[];
}

export default function TeamShowcase({ members = DEFAULT_MEMBERS }: TeamShowcaseProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // The first member with a name is the lead: their photo stays in colour and
  // their role and socials stay visible, so the page has a fixed anchor. Keyed
  // by id because the photo grid also contains the blank spacer tile, so
  // positional indices differ between the grid and the name list.
  const leadId = members.find((m) => m.name)?.id ?? null;

  const col1 = members.filter((_, i) => i % 3 === 0);
  const col2 = members.filter((_, i) => i % 3 === 1);
  const col3 = members.filter((_, i) => i % 3 === 2);

  return (
    <div className="flex flex-col md:flex-row items-start gap-8 md:gap-10 lg:gap-14 select-none w-full max-w-5xl mx-auto py-8 px-4 md:px-6 font-sans">
      {/* ── Left: photo grid ── */}
      {/* `flex-shrink-0` is only wanted in the md row layout, where the rail sits
          beside the portrait and must not collapse. On mobile the parent is a
          column, so refusing to shrink made the rail push the whole page wider
          instead of letting its own overflow-x-auto scroll. */}
      <div className="flex w-full max-w-full gap-2 overflow-x-auto pb-1 md:w-auto md:flex-shrink-0 md:gap-3 md:pb-0">
        {/* Column 1 */}
        <div className="flex flex-col gap-2 md:gap-3">
          {col1.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              isLead={member.id === leadId}
              className="w-[110px] h-[120px] sm:w-[130px] sm:h-[140px] md:w-[155px] md:h-[165px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-2 md:gap-3 mt-[48px] sm:mt-[56px] md:mt-[68px]">
          {col2.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              isLead={member.id === leadId}
              className="w-[122px] h-[132px] sm:w-[145px] sm:h-[155px] md:w-[172px] md:h-[182px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-2 md:gap-3 mt-[22px] sm:mt-[26px] md:mt-[32px]">
          {col3.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              isLead={member.id === leadId}
              className="w-[115px] h-[125px] sm:w-[136px] sm:h-[146px] md:w-[162px] md:h-[172px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>
      </div>

      {/* ── Right: member name list*/}
      <div className="flex flex-col sm:grid sm:grid-cols-2 md:flex md:flex-col gap-4 md:gap-5 pt-0 md:pt-2 flex-1 w-full">
        {members.filter((member) => member.name).map((member) => (
          <MemberRow
            key={member.id}
            member={member}
            // The lead's title and socials stay visible so the list has an
            // anchor; everyone else's are revealed on hover.
            alwaysShowRole={member.id === leadId}
            hoveredId={hoveredId}
            onHover={setHoveredId}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Photo card
───────────────────────────────────────── */

function PhotoCard({
  member,
  isLead = false,
  className,
  hoveredId,
  onHover,
}: {
  member: TeamMember;
  isLead?: boolean;
  className: string;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  // The lead is highlighted only while nothing is hovered — it is the resting
  // state of the page, not a permanent pin. Hovering anyone else hands the
  // highlight over, so the lead dims and compacts like everybody else.
  const isActive = hoveredId === null ? isLead : hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  // Empty placeholder tile — keeps the grid balanced without a photo/name.
  if (!member.image) {
    return <div className={cn('flex-shrink-0', className)} aria-hidden="true" />;
  }

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl cursor-pointer flex-shrink-0 transition-opacity duration-400',
        className,
        isDimmed ? 'opacity-60' : 'opacity-100',
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-full object-cover transition-[filter] duration-500"
        style={{
          filter: isActive ? 'grayscale(0) brightness(1)' : 'grayscale(1) brightness(0.77)',
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────
   Member name section
───────────────────────────────────────── */

function MemberRow({
  member,
  alwaysShowRole = false,
  hoveredId,
  onHover,
}: {
  member: TeamMember;
  alwaysShowRole?: boolean;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  // Role + social icons reveal together, and the name/bullet follow the same
  // state so a row matches its photo. The lead is revealed only at rest: once
  // any member is hovered, the lead collapses like the others.
  const revealed =
    hoveredId === null ? alwaysShowRole : hoveredId === member.id;
  const isActive = revealed;
  const isDimmed = hoveredId !== null && !isActive;
  const hasSocial = member.social?.x ?? member.social?.linkedin ?? member.social?.instagram;

  return (
    <div
      className={cn(
        'cursor-pointer transition-opacity duration-300',
        isDimmed ? 'opacity-50' : 'opacity-100',
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Name */}
      <div className="flex items-center gap-2.5">
        <span
          className={cn(
            'w-4 h-3 rounded-[5px] flex-shrink-0 transition-all duration-300',
            isActive ? 'bg-foreground w-5' : 'bg-foreground/25',
          )}
        />
        <span
          className={cn(
            'text-base md:text-[18px] font-semibold leading-none tracking-tight transition-colors duration-300',
            isActive ? 'text-foreground' : 'text-foreground/80',
          )}
        >
          {member.name}
        </span>
      </div>

      {/* Role + socials — one reveal block, so they animate together and the
          row height changes once. Hidden until hover except for the lead
          (alwaysShowRole), whose title anchors the list. Animates
          max-height/opacity rather than mounting and unmounting, so revealing a
          row never reflows the list, and the content stays in the DOM for
          screen readers and find-in-page. The hover gate is scoped to
          hover-capable pointers so touch users still see everything. */}
      <div
        className={cn(
          'overflow-hidden transition-all duration-300 ease-out',
          'max-h-24 opacity-100 mt-1.5',
          !revealed &&
            '[@media(hover:hover)]:max-h-0 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:mt-0',
        )}
      >
        <p className="pl-[27px] text-[7px] md:text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {member.role}
        </p>

        {/* Icons sit under the title. pl-[23px] rather than 27 so the glyph
            edge — not the tap padding — lines up with the role text above. */}
        {hasSocial && (
          <div className="flex items-center gap-1 pl-[23px] mt-2">
            {member.social?.x && (
              <a
                href={member.social.x}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 -m-0.5 rounded text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-all duration-150 hover:scale-110"
                title="X"
                aria-label={`${member.name} on X`}
              >
                <XIcon size={16} />
              </a>
            )}
            {member.social?.instagram && (
              <a
                href={member.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 -m-0.5 rounded text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-all duration-150 hover:scale-110"
                title="Instagram"
                aria-label={`${member.name} on Instagram`}
              >
                <Instagram size={16} />
              </a>
            )}
            {member.social?.linkedin && (
              <a
                href={member.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 -m-0.5 rounded text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-all duration-150 hover:scale-110"
                title="LinkedIn"
                aria-label={`${member.name} on LinkedIn`}
              >
                <Linkedin size={16} />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
