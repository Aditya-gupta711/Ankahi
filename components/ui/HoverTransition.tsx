"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type HoverTransitionProps = { defaultComponent: React.ReactNode; hoverComponent: React.ReactNode; className?: string; label?: string };

export function HoverTransition({ defaultComponent, hoverComponent, className, label = "Interactive event card" }: HoverTransitionProps) {
  const [active, setActive] = useState(false);
  const revertTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activate = () => { if (revertTimer.current) clearTimeout(revertTimer.current); setActive(true); };
  const scheduleRevert = () => { if (revertTimer.current) clearTimeout(revertTimer.current); revertTimer.current = setTimeout(() => setActive(false), 2000); };
  useEffect(() => () => { if (revertTimer.current) clearTimeout(revertTimer.current); }, []);
  return <div role="group" aria-label={label} tabIndex={0} data-active={active} onMouseEnter={activate} onMouseLeave={scheduleRevert} onFocus={activate} onBlur={scheduleRevert} className={cn("group relative isolate overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-theatre-red focus-visible:ring-offset-4", className)}>
    <div className="relative h-full w-full [transform:perspective(1000px)_rotateX(var(--hover-tilt-x,0deg))_rotateY(var(--hover-tilt-y,0deg))] transition-transform duration-500 group-hover:scale-[1.01]" onPointerMove={(event) => { if (event.pointerType !== "mouse") return; const rect = event.currentTarget.getBoundingClientRect(); const x = (event.clientX - rect.left) / rect.width; const y = (event.clientY - rect.top) / rect.height; event.currentTarget.style.setProperty("--hover-tilt-x", `${((0.5 - y) * 2.2).toFixed(2)}deg`); event.currentTarget.style.setProperty("--hover-tilt-y", `${((x - 0.5) * 2.2).toFixed(2)}deg`); }} onPointerLeave={(event) => { event.currentTarget.style.setProperty("--hover-tilt-x", "0deg"); event.currentTarget.style.setProperty("--hover-tilt-y", "0deg"); }}>
      <div className={cn("h-full w-full transition duration-700", active ? "scale-[1.025] brightness-[.82]" : "scale-100")}>{defaultComponent}</div>
      <div aria-hidden={!active} className={cn("absolute inset-0 transition-[clip-path,opacity,filter] duration-700 ease-[cubic-bezier(.22,1,.36,1)]", active ? "[clip-path:inset(0)] opacity-100" : "[clip-path:inset(0_100%_0_0)] opacity-0 blur-sm")}>{hoverComponent}</div>
    </div>
  </div>;
}
