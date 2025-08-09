import Link from "next/link";
import { NavlinkType } from "@/app/types/navlink";

export default function Navlink({ href, label, icon, i }: NavlinkType) {
  return (
    <Link
      key={href}
      href={href}
      className={`
        group/navlink block w-full
        opacity-0 scale-95 translate-y-2
        group-hover:opacity-100 
        group-hover:scale-100 
        group-hover:translate-y-0
        transition-all duration-500
      `}
      style={{ transitionDelay: `${(i ?? 0) * 80}ms` }}
    >
      <div
        className={`
          nav-item
          flex items-center justify-between gap-2
          px-3 py-2 rounded-md
          whitespace-nowrap
          transition-colors duration-300
          focus-visible:outline-2 
          focus-visible:outline-offset-2 
          focus-visible:outline-[var(--accent)]
        `}
      >
        <span className="flex-1 text-left text-sm font-medium truncate">
          {label}
        </span>
        <span
          className={`
            nav-item-icon
            shrink-0 inline-flex
            leading-none opacity-0 scale-95
            group-hover/navlink:opacity-100 
            group-hover/navlink:scale-100
            transition-all duration-500
          `}
          style={{ transitionDelay: `200ms` }}
        >
          {icon}
        </span>
      </div>
    </Link>
  );
}
