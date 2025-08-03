
import Link from "next/link";
import { NavlinkType } from "@/app/types/navlink";


export default function Navlink({ href, label, icon, x, y, i }: NavlinkType) {
  return (
    <Link
      key={href}
      href={href}
      className={`
        group/navlink flex items-center justify-between
        absolute transition-all duration-500
        opacity-0 scale-95 translate-y-2
        group-hover:opacity-100 group-hover:scale-100
        group-hover:translate-y-0 transform
        -translate-x-1/2 pointer-events-auto
      `}
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transitionDelay: `${(i ?? 2) * 100}ms`,
      }}
    >
      <span className={`
        inline-flex items-center gap-1 text-sm
        font-medium      
      `}>{label}</span>
      <span className={`
        inline-flex items-center gap-1 text-sm
        opacity-0 scale-95 group-hover/navlink:opacity-100
        group-hover/navlink:scale-100 transition-all duration-200
      `}>
        {icon}
      </span>
    </Link>
  )}
