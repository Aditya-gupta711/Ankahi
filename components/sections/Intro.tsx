export function Intro({ stories }: { stories: Array<{ title: string; description: string }> }) {
  return (
    <section className="bg-paper px-6 py-12 text-ink sm:px-8 sm:py-16 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-7xl pt-6">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-theatre-red">ANKAHI</p>
        <div className={`mt-14 ${stories.length === 1 ? "border-t border-ink/15" : "divide-y divide-ink/15 border-y border-ink/15"}`}>
          {stories.map((story, index) => <article key={story.title} className={`min-w-0 grid gap-7 ${stories.length === 1 ? "mx-auto max-w-5xl py-10 text-center" : "py-12 sm:py-16 md:grid-cols-2 md:items-center md:gap-16 lg:gap-28"}`}><h2 className={`${stories.length === 1 ? "mx-auto max-w-4xl text-balance text-[clamp(1.8rem,4.5vw,5rem)]" : "max-w-3xl text-[clamp(3rem,6vw,6.5rem)]"} min-w-0 font-display leading-[.86] tracking-[-0.06em] ${stories.length > 1 && index % 2 ? "md:order-2" : ""}`}>{story.title}</h2><p className={`mx-auto w-full min-w-0 max-w-3xl break-words text-lg leading-9 text-ink/65 sm:text-xl sm:leading-10 ${stories.length > 1 && index % 2 ? "md:order-1" : ""}`}>{story.description}</p></article>)}
        </div>
      </div>
    </section>
  );
}
