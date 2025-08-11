'use client';
import Image from 'next/image';
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
  // do not show the current page
  const links: NavlinkType[] = navlinks.filter(
    (link: NavlinkType) => link.href !== pathname
  );

  return (
    <nav className={`
      nav-container group cursor-pointer
      h-full w-60
    `}>
      <div className="nav-icon">
        <Image 
          src="/images/3.svg" 
          alt="le fog logo" 
          height={200} 
          width={200} 
          className={`
            object-center 
            object-contain block 
            pointer-events-none 
            select-none cursor-pointer
          `}
        />
        
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
