import Link from "next/link";
import { notFound } from "next/navigation";

async function getCake(id) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  if (!response.ok) {
    return null;
  }

  const data = await response.json();

  return data.meals?.[0] ?? null;
}

export default async function CakeDetailPage({ params }) {
  const { id } = await params;

  const cake = await getCake(id);

  if (!cake) {
    notFound();
  }

  return (
    <article className="recipe-detail">
      <Link href="/cakes">← Back to Cake Ideas</Link>

      <h1>{cake.strMeal}</h1>

      <img
        src={cake.strMealThumb}
        alt={cake.strMeal}
        className="recipe-image"
      />

      <p>
        <strong>Category:</strong> {cake.strCategory}
      </p>

      <p>
        <strong>Area:</strong> {cake.strArea}
      </p>

      <h2>Instructions</h2>

      <p>{cake.strInstructions}</p>
    </article>
  );
}