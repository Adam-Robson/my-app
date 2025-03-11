'use client';

import { useRouter } from 'next/navigation';

export default function NotFound() {
    const router = useRouter();

    return (
        <div className='can txt'>
            <h1 className="h1">Error 404: Page Not Found</h1>
            <p className="txt">The page you are looking for does not exist or has been moved.</p>
            <button 
                onClick={() => router.push('/')}
                style={{
                    backgroundColor: "var(--background)",
                    color: "var(--text)",
                }}
                className="mt-4 px-2 py-4 border-none rounded-sm cursor-pointer"
            >
                Go To Homepage
            </button>
        </div>
    )
}
