import { teamLevels, type TeamLevel } from "@/data/content/cast";
import { MemberIsland } from "@/components/ui/MemberIsland";

type TeamMember = { id: string; name: string; role: string; bio?: string | null; photo?: { public_url?: string | null } | null };

function getCardRole(role: string) {
  if (role === "Directors") return "Director";
  if (role === "Panel Members") return "Panel Member";
  return role;
}

function TeamLevelSection({ level, members }: { level: TeamLevel; members: TeamMember[] }) {
  const cards = members;
  const layout = cards.length === 1 ? "grid-cols-1" : cards.length === 5 ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" : cards.length === 6 ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";
  const gridWidth = cards.length === 6 ? "max-w-[48rem]" : "max-w-6xl";
  return <section aria-labelledby={`${level.id}-title`}><div className="flex flex-col items-center"><h2 id={`${level.id}-title`} className="text-center font-display text-4xl leading-none sm:text-5xl">{level.title}</h2><span aria-hidden="true" className="mt-4 h-px w-16 bg-theatre-red" /></div>{cards.length ? <div className={`mx-auto mt-8 grid ${gridWidth} justify-items-center gap-12 ${layout}`}>{cards.map((member) => <MemberIsland key={member.id} member={{ id: member.id, name: member.name, role: getCardRole(member.role), bio: member.bio ?? undefined, photo: member.photo?.public_url ?? undefined }} />)}</div> : <p className="mx-auto mt-8 max-w-md text-center text-sm leading-6 text-ink/55">This roster will be announced soon.</p>}</section>;
}

export function TeamSection({ members = [] }: { members?: Array<{ id: string; name: string; role: string; bio?: string | null; photo?: { public_url?: string | null } | null }> }) {
  const leadership = teamLevels.slice(0, 2);
  const remainingLevels = teamLevels.slice(2);

  const levelMembers = new Map(teamLevels.map((level) => [level.title, members.filter((member) => member.role === level.title)]));
  return <section className="bg-paper px-6 pb-24 pt-12 text-ink sm:px-8 sm:pb-32 lg:px-12"><div className="mx-auto max-w-7xl"><div className="border-b border-ink/15 pb-8 text-center"><p className="text-xs font-semibold uppercase tracking-[0.26em] text-theatre-red">Ankahi · The people behind the curtain</p><h1 className="mt-5 font-display text-7xl leading-[.82] tracking-[-0.06em] sm:text-9xl">The Team</h1></div><div className="mt-12 space-y-20"><div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-12 lg:gap-24">{leadership.map((level) => <div key={level.id} className="w-full max-w-[15rem]"><TeamLevelSection level={level} members={levelMembers.get(level.title) ?? []} /></div>)}</div>{remainingLevels.map((level) => <TeamLevelSection key={level.id} level={level} members={levelMembers.get(level.title) ?? []} />)}</div></div></section>;
}
