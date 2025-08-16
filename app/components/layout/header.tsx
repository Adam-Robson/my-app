'use client';
import Navigation from "@/app/components/navigation/navigation";
import ThemeToggle from "@/app/components/theme/theme-toggle";

export default function Header() {
  return (
    <header className={`
      max-w-screen-xl w-full mx-auto p-2
      fixed top-0 max-h-60 h-full z-50
    `}>
      <div className={`relative h-full w-full flex justify-between items-center`}>
        <Navigation />
        <ThemeToggle />
      </div>
    </header>
  );
}

