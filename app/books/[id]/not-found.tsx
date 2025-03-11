import Link from "next/link";

export default function NotFound() {
    return (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <h1>Error 404: Page Not Found</h1>
            <p>The page you are looking for does not exist or has been moved.</p>
            <Link href="/books" className="text-cyan-200 text-base md:text-lg">Go back to the homepage.</Link>
        </div>
    )
}
