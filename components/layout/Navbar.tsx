import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { MagneticNav } from "@/components/ui/MagneticNav";

const links = [
  { label: "Stage", href: "/" }, { label: "Productions", href: "/productions" }, { label: "Team", href: "/cast" }, { label: "Film", href: "/film" }, { label: "Enter", href: "/enter" },
];

export function Navbar() {
  return (
    <header className="border-b border-white/10">
      <Container className="flex min-h-22 items-center justify-between gap-3 sm:gap-8">
        <Link href="/" aria-label="Ankahi home" className="shrink-0">
          <Image src="/images/brand/logo.svg" alt="Ankahi" width={80} height={50} priority className="h-auto w-[clamp(4rem,7.5vw,5.5rem)]" />
        </Link>
        <MagneticNav items={links} />
      </Container>
    </header>
  );
}
