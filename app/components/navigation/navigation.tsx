'use client';

import { usePathname } from 'next/navigation';
import {
  ApproximateEqualsIcon,
  HouseIcon,
  LinkBreakIcon,
  VinylRecordIcon,
} from '@phosphor-icons/react';
import { type NavlinkType } from '@/app/types/navlink'
import Navlink from '@/app/components/navigation/navlink';

export const navlinks: NavlinkType[] = [
  {
    href: '/',
    label: 'Home',
    icon: <HouseIcon size={18} />,
  },
  {
    href: '/about',
    label: 'About',
    icon: <ApproximateEqualsIcon size={18} />,
  },
  {
    href: '/contact',
    label: 'Contact',
    icon: <LinkBreakIcon size={18} />,
  },
  {
    href: '/music',
    label: 'Music',
    icon: <VinylRecordIcon size={18} />,
  }
]

export default function Navigation() {
  const pathname = usePathname();
  // filter out the current page link from the navigation links
  // to avoid showing the current page as an option on every page
  const links: NavlinkType[] = navlinks.filter(
    (link: NavlinkType) => link.href !== pathname
  );
  const round4 = (num: number) => Math.round(num * 10000) / 10000;
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
          const x = round4(Math.cos(rad) * radius);
          const y = round4(Math.sin(rad) * radius);
          return (
            <Navlink
              key={link.href}
              href={link.href}
              label={link.label}
              icon={link.icon}
              x={x}
              y={y}
              i={i}
            />          
          )
        })}
    </nav>
  );
}
