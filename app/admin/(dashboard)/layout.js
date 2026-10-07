import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

export default async function AdminLayout({ children }) {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/admin/login");
  }

  return (
    <div className="admin-shell">

      <aside className="admin-sidebar">

        <div>
          <div className="admin-brand">
            <span>🎂</span>
            <div>
              <h2>Cake App</h2>
              <p>Admin Panel</p>
            </div>
          </div>

          <nav className="admin-nav">

            <Link
              href="/admin/orders"
              className="admin-nav-link"
            >
              📦
              <span>Orders</span>
            </Link>

          </nav>
        </div>

        <div className="admin-sidebar-bottom">

          <div className="admin-user">
            <div className="admin-avatar">
              {session.user.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <strong>{session.user.name}</strong>
              <small>Administrator</small>
            </div>
          </div>

          <LogoutButton />

        </div>

      </aside>

      <main className="admin-main">
        {children}
      </main>

    </div>
  );
}