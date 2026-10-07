import AdminLoginForm from "@/components/AdminLoginForm";
import Link from "next/link";

export default function AdminLoginPage() {
  return (
    <main className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-logo">
          🎂
        </div>

        <h1>Welcome Back</h1>

        <p className="admin-login-subtitle">
          Sign in to manage your cake orders.
        </p>

        <AdminLoginForm />

        <Link href="/" className="back-home">
          ← Back to Cake App
        </Link>
      </div>
    </main>
  );
}