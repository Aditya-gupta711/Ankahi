import type { Member } from "@/types/content";
import Image from "next/image";

type MemberIslandProps = {
  member: Member;
};

export function MemberIsland({ member }: MemberIslandProps) {
  return <article tabIndex={0} aria-label={`View information for ${member.name}`} className="group mx-auto min-h-[22rem] w-full max-w-[15rem] [perspective:1000px] outline-none focus-visible:ring-2 focus-visible:ring-theatre-red focus-visible:ring-offset-4"><div className="relative h-full min-h-[22rem] w-full rounded-[1.35rem] transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-visible:[transform:rotateY(180deg)]"><div className="absolute inset-0 overflow-hidden rounded-[1.35rem] border border-theatre-red/55 bg-white shadow-[0_8px_24px_rgba(14,13,12,.08)] transition-colors group-hover:border-theatre-red group-focus-visible:border-theatre-red [backface-visibility:hidden]">{member.photo ? <Image src={member.photo} alt={member.name} fill sizes="240px" className="object-cover" /> : <div className="h-full w-full bg-[radial-gradient(circle_at_50%_32%,#d1d1d1_0_18%,transparent_18.5%),linear-gradient(145deg,#f4f4f4,#dcdcdc)]" />}</div><div className="absolute inset-0 flex flex-col justify-end overflow-hidden rounded-[1.35rem] border border-theatre-red bg-ink p-6 text-left text-paper shadow-[0_8px_24px_rgba(14,13,12,.12)] [backface-visibility:hidden] [transform:rotateY(180deg)]"><p className="font-display text-3xl leading-none">{member.name}</p><p className="mt-2 text-xs uppercase tracking-[0.14em] text-paper-muted">{member.role}</p>{member.bio ? <p className="mt-5 text-sm leading-6 text-paper/70">{member.bio}</p> : null}</div></div></article>;
}


