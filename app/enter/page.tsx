import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

const entryOptions = [
  {
    eyebrow: "For the people who keep it moving",
    title: "Enter as admin",
    description: "Manage productions, events, media, and the club archive.",
    href: "/admin/login",
  },
  {
    eyebrow: "For the Ankahi community",
    title: "Enter as other",
    description: "Access the member space and stay close to the work.",
    href: "/enter/others",
  },
];

export default function EnterPage() {
  return (
    <div className="flex min-h-screen flex-col bg-ink text-paper">
      <Navbar />
      <main className="flex flex-1 items-center py-20 sm:py-28">
        <Container className="w-full">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs uppercase tracking-[0.3em] text-theatre-red-bright">The door is open</p>
            <h1 className="mt-5 max-w-3xl font-display text-7xl leading-[.82] tracking-[-0.06em] sm:text-9xl">Enter Ankahi.</h1>
            <p className="mt-8 max-w-md text-sm leading-7 text-paper-muted">Choose the space that belongs to you. The stage is public; what happens behind it is for the people who make it.</p>
            <div className="mt-14 grid gap-4 md:grid-cols-2">
              {entryOptions.map((option, index) => <Link key={option.href} href={option.href} className="group relative flex min-h-72 flex-col justify-between border border-paper/20 bg-ink-soft p-7 transition-colors duration-500 hover:border-theatre-red hover:bg-theatre-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theatre-red sm:p-9">
                <span className="text-xs uppercase tracking-[0.2em] text-paper-muted transition-colors group-hover:text-paper/70">0{index + 1} · {option.eyebrow}</span>
                <span><span className="block font-display text-5xl leading-none sm:text-6xl">{option.title}</span><span className="mt-5 block max-w-xs text-sm leading-6 text-paper-muted transition-colors group-hover:text-paper/80">{option.description}</span><span className="mt-8 inline-block border-b border-theatre-red pb-2 text-xs font-semibold uppercase tracking-[0.2em] text-paper transition-colors group-hover:border-paper">Continue <span aria-hidden="true">↗</span></span></span>
              </Link>)}
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
