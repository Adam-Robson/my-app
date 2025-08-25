'use client';

import Word from "@/components/word";

export default function Main() {
  return (
    <main className={`
      flex-1 max-w-screen-sm w-full
      mx-auto flex justify-center
      items-center mt-60 opacity-80
    `}>
      <div className={`
        text-center text-2xl 
        md:text-3xl lg:text-4xl
        tracking-widest leading-20
      `}>
        <p>
          le fog
        </p>
        <p>is</p>
        <p>
          <Word words={["music", "noise", "tunes", "sounds", "murmurs", "nudges"]} intervalMs={8200} />
        </p>
        <p>for</p>
        <p>
          <Word words={["quiet", "feelings", "joy", "relaxing", "partying", "goldfish", "dreaming", "misfits", "love"]} intervalMs={4300} />
        </p>
      </div>
    </main>
  )
}
