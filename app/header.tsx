'use client';
import Navigation from "@/app/components/navigation/navigation";

export default function Header() {
  return (
    <header className="fixed top-0 h-32 w-full max-w-screen-xl mx-auto">
      <Navigation />
    </header>
  );
}

