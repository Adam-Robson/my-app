'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ApproximateEqualsIcon,
  HouseIcon,
  LinkBreakIcon,
  VinylRecordIcon,
} from '@phosphor-icons/react';
import { ReactNode } from 'react';

export type NavlinkType = {
  id?: string;
  key?: string;
  href: string;
  label: string;
  icon: ReactNode;
  hovered?: boolean;
  setHovered?: (hovered: boolean) => void;
  className?: string;
};

export const navlinks: NavlinkType[] = [
  {
    href: '/',
    label: 'Home',
    icon: <HouseIcon size={24} />,
  },
  {
    href: '/about',
    label: 'About',
    icon: <ApproximateEqualsIcon size={24} />,
  },
  {
    href: '/contact',
    label: 'Contact',
    icon: <LinkBreakIcon size={24} />,
  },
  {
    href: '/music',
    label: 'Music',
    icon: <VinylRecordIcon size={24} />,
  }
]

export default function Navigation() {
  const pathname = usePathname();
  // filter out the current page link from the navigation links
  // to avoid showing the current page as an option on every page
  const links: NavlinkType[] = navlinks.filter(
    (link: NavlinkType) => link.href !== pathname
  );
  
  const radius = 140; // distance from center (px)
  const c = 90; // center angle (deg)
  const spread = 120; // spread angle (deg)
  
  return (
    <nav className="relative w-[240px] h-[240px] group mx-auto">
      
      <div className={`
        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        mx-auto pointer-events-none text-xl font-regular 
        cursor-pointer
      `}>
        le fog
      </div>
      
        {links.map((link, i) => {
          const step = links.length > 1 ? spread / (links.length - 1) : 0;
          const deg = c - spread / 2 + step * i;
          const rad = (deg * Math.PI) / 180;
          
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`
                absolute transition-all duration-500
                opacity-0 scale-95 translate-y-2
                group-hover:opacity-100 group-hover:scale-100
                group-hover:translate-y-0 transform
                -translate-x-1/2 pointer-events-auto
              `}
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <span className={`
                inline-flex items-center gap-1 text-sm
              `}>
                {link.icon}
                {link.label}
              </span>
            </Link>
          )
        })}
    </nav>
  );
}
