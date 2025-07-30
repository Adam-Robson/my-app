'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ApproximateEqualsIcon,
  HouseIcon,
  LinkBreakIcon,
  VinylRecordIcon,
} from '@phosphor-icons/react';

export default function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home', icon: <HouseIcon /> },
    { href: '/about', label: 'About', icon: <ApproximateEqualsIcon /> },
    { href: '/contact', label: 'Contact', icon: <LinkBreakIcon /> },
    { href: '/albums', label: 'Albums', icon: <VinylRecordIcon /> },
  ];

  const navlinks = links.filter((link) => link.href !== pathname);

  return (
    <div className="relative group inline-block">
      
      <div className="text-xl font-bold transition-opacity duration-300 group-hover:opacity-50 cursor-pointer">
        le fog
      </div>
      
      <div className="
        absolute left-0 mt-2 flex flex-col gap-2
        opacity-0 pointer-events-none
        group-hover:opacity-100 group-hover:pointer-events-auto
        hover:opacity-100 hover:pointer-events-auto
        transition-opacity duration-300
      ">
        {navlinks.map((link) => (
          <div key={link.href} className="group/nav flex items-center gap-2 transition">
            <Link href={link.href} className="text-base hover:underline flex items-center gap-2">
              {link.label}
              <span className="opacity-0 group-hover/nav:opacity-100 transition-opacity duration-200">
                {link.icon}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
