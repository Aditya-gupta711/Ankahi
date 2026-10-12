import Link from "next/link";
import { Container } from "@/components/layout/Container";

const navigation = [
  ["Stage", "/"],
  ["Productions", "/productions"],
  ["Team", "/cast"],
  ["Film", "/film"],
] as const;

const socialLinks = [
  ["Instagram", "https://www.instagram.com/ankahi_iitd/"],
  ["YouTube", "https://www.youtube.com/channel/UC-MCkZuRMgA9-jHWtvyEKng"],
  ["Linktree", "https://linktr.ee/ankahi_rdv24"],
] as const;

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink py-16 text-paper sm:py-20">
      <Container>
        <div className="grid gap-12 border-b border-white/10 pb-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div><p className="font-display text-6xl leading-none tracking-[-0.06em] text-paper">Ankahi</p><p className="mt-5 max-w-xs text-xs uppercase leading-6 tracking-[0.16em] text-paper-muted">Dramatics Society · IIT Delhi</p></div>
          <nav aria-label="Footer navigation"><p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-theatre-red-bright">Navigate</p><div className="mt-5 flex flex-col items-start gap-3 text-xs uppercase tracking-[0.16em] text-paper-muted">{navigation.map(([label, href]) => <Link key={href} href={href} className="transition-colors hover:text-paper">{label}</Link>)}</div></nav>
          <div><p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-theatre-red-bright">Follow the work</p><div className="mt-5 flex flex-col items-start gap-3 text-xs uppercase tracking-[0.16em] text-paper-muted">{socialLinks.map(([label, href]) => <a key={href} href={href} target="_blank" rel="noreferrer" className="transition-colors hover:text-paper">{label} <span aria-hidden="true">↗</span></a>)}</div></div>
        </div>
        <div className="flex flex-col gap-3 pt-6 text-[10px] uppercase tracking-[0.16em] text-paper-muted sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} Ankahi · IIT Delhi</p><p>Made for stories that refuse to stay unspoken.</p></div>
      </Container>
    </footer>
  );
}
