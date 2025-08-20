export default function Contact() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-light mb-6">Contact</h1>

      <div className="space-y-4">
        <p className="opacity-90">
          For booking, collaborations, or licensing, reach out any time.
        </p>

        <ul className="space-y-2">
          <li>
            <a
              href="mailto:hello@lefog.example"
              className="underline decoration-[var(--accent)]/60 hover:decoration-[var(--accent)]"
            >
              hello@lefog.example
            </a>
          </li>
          <li>
            <a
              href="https://instagram.com/lefog"
              className="underline decoration-[var(--accent)]/60 hover:decoration-[var(--accent)]"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
          </li>
        </ul>

        {/* <form className="mt-6 grid gap-3">
          <input className="rounded-md bg-black/5 px-3 py-2" placeholder="Your email" />
          <textarea className="rounded-md bg-black/5 px-3 py-2" placeholder="Message" rows={5} />
          <button className="self-start rounded-md px-4 py-2 bg-[var(--accent)]/90 text-white hover:bg-[var(--accent)]">Send</button>
        </form> */}
      </div>
    </main>
  );
}
