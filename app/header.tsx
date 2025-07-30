'use client';
import Navigation from "@/app/components/navigation/navigation";

export default function Header() {
  return (
    <header className="h-32 max-w-screen-md mx-auto w-full">
      <div className="group relative inline-block hover:cursor-pointer">
        <Navigation />
      </div>
    </header>
  );
}
