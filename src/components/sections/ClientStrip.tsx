import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { workingWith } from "@/lib/site";

/**
 * "We are working with" — a continuously scrolling client ticker beneath the
 * hero.
 *
 * NOTE: the names in `workingWith.clients` are DEMO PLACEHOLDERS (see the
 * warning block in src/lib/site.ts). Swap in the real customer list, or
 * remove this section from page.tsx, before launch.
 *
 * The track renders the list twice; translating it by exactly -50% therefore
 * loops without a visible seam. The second copy is hidden from assistive
 * tech so names are not announced twice. Hover or keyboard focus pauses it,
 * and reduced-motion turns it into a plain scrollable row.
 */

function ClientItem({
  client,
  duplicate = false,
}: {
  client: (typeof workingWith.clients)[number];
  duplicate?: boolean;
}) {
  return (
    <li
      aria-hidden={duplicate || undefined}
      className="group flex shrink-0 items-center gap-3 pr-10 sm:pr-14"
    >
      <span
        aria-hidden="true"
        className="grid size-9 shrink-0 place-items-center rounded-[3px] border border-line bg-surface-alt font-display text-[0.6875rem] font-extrabold tracking-[0.02em] text-ink-500 transition-colors duration-200 group-hover:border-navy-800 group-hover:bg-navy-800 group-hover:text-white"
      >
        {client.initials}
      </span>
      <span className="whitespace-nowrap">
        <span className="block font-display text-[0.9375rem] font-extrabold tracking-[-0.02em] text-ink-500 transition-colors duration-200 group-hover:text-navy-800">
          {client.name}
        </span>
        <span className="mt-0.5 block text-[0.6875rem] uppercase tracking-[0.12em] text-ink-500/70">
          {client.sector}
        </span>
      </span>
    </li>
  );
}

export function ClientStrip() {
  return (
    <section
      aria-labelledby="clients-label"
      className="overflow-hidden border-t border-line bg-surface py-10 lg:py-12"
    >
      <Container>
        <Reveal variant="fade">
          <div className="lg:flex lg:items-center lg:gap-10">
            <div className="lg:w-56 lg:shrink-0 lg:border-r lg:border-line lg:pr-10">
              <p id="clients-label" className="text-micro text-navy-600">
                {workingWith.label}
              </p>
              <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-500">
                {workingWith.note}
              </p>
            </div>

            {/* Ticker viewport. The mask softens both edges so names fade in
                and out rather than being chopped by a hard border. */}
            <div
              className="fos-marquee relative mt-6 min-w-0 overflow-hidden lg:mt-0 lg:flex-1"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent, #000 4rem, #000 calc(100% - 4rem), transparent)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent, #000 4rem, #000 calc(100% - 4rem), transparent)",
                ["--marquee-duration" as string]: "44s",
              }}
            >
              <ul className="fos-marquee-track flex w-max items-center">
                {workingWith.clients.map((client) => (
                  <ClientItem key={client.name} client={client} />
                ))}
                {/* duplicate copy — purely visual, keeps the loop seamless */}
                {workingWith.clients.map((client) => (
                  <ClientItem key={`dup-${client.name}`} client={client} duplicate />
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
