'use client';
import CenterPiece from "../center-piece/center-piece";

export default function Main() {
  return (
    <main className="flex-1 w-full">
      <CenterPiece words={['happiness', 'sundown', 'echoes', 'silence', 'morning', 'dreaming', 'celebrating', 'lovers', 'night time']} hold={4} fade={1.5} />
    </main>
  )
}
