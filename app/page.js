import Link from "next/link";

export default function Home() {
  return (
    <main className="home">
      <h1>🎂 Welcome to Cake App</h1>

      <p>
        Create your own cake or explore some cake ideas.
      </p>

      <div className="home-buttons">
        <Link href="/customize" className="main-button">
          Customize My Cake
        </Link>

        <Link href="/cakes" className="secondary-button">
          Browse Cake Ideas
        </Link>
      </div>
    </main>
  );
}