import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/">🎂 Cake App</Link>

      <div className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/customize">Customize</Link>
        <Link href="/cakes">Cake Ideas</Link>
        <Link href="/admin">Admin</Link>
      </div>
    </nav>
  );
}