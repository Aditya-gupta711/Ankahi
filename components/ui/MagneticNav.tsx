"use client";

import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "framer-motion";
import { usePathname } from "next/navigation";
import { useRef } from "react";

type NavItem = { label: string; href: string };

const spring = { damping: 24, stiffness: 320, mass: 0.45 };

function MagneticNavItem({ item, mouseX, reducedMotion }: { item: NavItem; mouseX: MotionValue<number>; reducedMotion: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const pathname = usePathname();
  const active = pathname === item.href;

  const distance = useTransform(mouseX, (value) => {
    if (!ref.current || !Number.isFinite(value)) return 999;
    const bounds = ref.current.getBoundingClientRect();
    return value - (bounds.left + bounds.width / 2);
  });
  const scale = useSpring(useTransform(distance, [-130, 0, 130], [1, 1.15, 1]), spring);
  const lift = useSpring(useTransform(scale, [1, 1.15], [0, -3]), spring);

  return (
    <motion.div style={reducedMotion ? undefined : { scale, y: lift }} className="relative shrink-0">
      <Link
        ref={ref}
        href={item.href}
        aria-current={active ? "page" : undefined}
        className={`relative block px-0 py-3 text-[clamp(9px,1.15vw,12px)] font-semibold uppercase tracking-[clamp(0.08em,0.3vw,0.18em)] transition-colors duration-300 ${active ? "text-paper" : "text-paper-muted hover:text-paper"}`}
      >
        {item.label}
        <motion.span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-1 h-px bg-theatre-red-bright"
          initial={false}
          animate={{ scaleX: active ? 1 : 0, opacity: active ? 1 : 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.25 }}
        />
      </Link>
    </motion.div>
  );
}

export function MagneticNav({ items }: { items: NavItem[] }) {
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY);
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <nav
      aria-label="Primary navigation"
      onMouseMove={reducedMotion ? undefined : (event) => mouseX.set(event.clientX)}
      onMouseLeave={() => mouseX.set(Number.POSITIVE_INFINITY)}
      className="flex min-w-0 flex-1 items-center justify-end gap-[clamp(0.55rem,2.3vw,2.5rem)] whitespace-nowrap"
    >
      {items.map((item) => <MagneticNavItem key={item.href} item={item} mouseX={mouseX} reducedMotion={reducedMotion} />)}
    </nav>
  );
}
