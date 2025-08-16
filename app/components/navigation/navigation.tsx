'use client';
import { usePathname } from 'next/navigation';
import {
  ApproximateEqualsIcon,
  HouseIcon,
  LinkIcon,
  VinylRecordIcon,
} from '@phosphor-icons/react';
import { type NavlinkType } from '@/app/types/navlink'
import Navlink from '@/app/components/navigation/navlink';
import '@/app/components/navigation/navigation.css';
import SVGComponent from '@/app/components/navigation/svg-component';

export const navlinks: NavlinkType[] = [
  {
    href: '/',
    label: 'Home',
    icon: <HouseIcon size={32} />,
  },
  {
    href: '/about',
    label: 'About',
    icon: <ApproximateEqualsIcon size={32} />,
  },
  {
    href: '/contact',
    label: 'Contact',
    icon: <LinkIcon size={32} />,
  },
  {
    href: '/music',
    label: 'Music',
    icon: <VinylRecordIcon size={32} />,
  }
]

export default function Navigation() {

  const pathname = usePathname();
  // do not show the current page in nav links
  const links: NavlinkType[] = navlinks.filter(
    (link: NavlinkType) => link.href !== pathname
  );

  return (
    <nav className={`
      nav-container group cursor-pointer
      h-full w-60
    `}>
      <div className="nav-icon">
        <SVGComponent />
        <div className={`
          nav-menu
        `}>
          {links.map((link, i) => {
            return (
              <Navlink
                key={link.href}
                href={link.href}
                label={link.label}
                icon={link.icon}
                i={i}
              />
            )
          })}
        </div>
      </div>
    </nav>
  );
}
