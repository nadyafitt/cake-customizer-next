import Link from "next/link";

export default function CakesLayout({ children }) {
  return (
    <div className="cakes-layout">
      <aside className="cakes-sidebar">
        <h2>🍰 Cakes</h2>

        <nav>
          <Link href="/cakes">All Cake Ideas</Link>
        </nav>
      </aside>

      <section className="cakes-content">
        {children}
      </section>
    </div>
  );
}