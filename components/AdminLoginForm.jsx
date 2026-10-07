"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLoginForm() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid username or password.");
      setLoading(false);
      return;
    }

    router.push("/admin/orders");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="admin-login-form">

      <div className="form-group">
        <label htmlFor="username">
          Username
        </label>

        <input
          id="username"
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(event) =>
            setUsername(event.target.value)
          }
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">
          Password
        </label>

        <input
          id="password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
          required
        />
      </div>

      {error && (
        <p className="login-error">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="login-button"
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>

    </form>
  );
}