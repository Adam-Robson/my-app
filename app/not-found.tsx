'use client';

import { useRouter } from 'next/navigation';

export default function NotFound() {
    const router = useRouter();

    return (
        <div>
            <h1>Error 404: Page Not Found</h1>
            <p>The page you are looking for does not exist or has been moved.</p>
            <button 
                onClick={() => router.push('/')}
                style={{
                    marginTop: "1rem",
                    padding: "0.5rem 1rem",
                    backgroundColor: "var(--background)",
                    color: "var(--text)",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                }}
            >
                Go To Homepage
            </button>
        </div>
    )
}
