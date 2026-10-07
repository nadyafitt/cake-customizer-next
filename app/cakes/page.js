import Link from "next/link";

/*async function getCakes() {
  const response = await fetch(
    "https://dummyjson.com/recipes/search?q=cake"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch cake data");
  }

  return response.json();
}*/

async function getCakes() {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=cake"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch cake data");
  }

  return response.json();
}

export default async function CakesPage() {
  const data = await getCakes();

  return (
    <div>
      <h1>Cake Ideas 🎂</h1>

      <div className="cake-grid">
        {data.meals?.map((cake) => (
          <a
            href={`/cakes/${cake.idMeal}`}
            key={cake.idMeal}
            className="recipe-card"
          >
            <img
              src={cake.strMealThumb}
              alt={cake.strMeal}
            />

            <h2>{cake.strMeal}</h2>

            <p>{cake.strCategory}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

/*export default async function CakesPage() {
  const data = await getCakes();

  return (
    <div>
      <h1>Cake Ideas</h1>

      <p className="api-description">
        These cake ideas are loaded from a third-party API.
      </p>

      <div className="cake-grid">
        {data.recipes.map((recipe) => (
          <Link
            href={`/cakes/${recipe.id}`}
            key={recipe.id}
            className="recipe-card"
          >
            <img src={recipe.image} alt={recipe.name} />

            <h2>{recipe.name}</h2>

            <p>{recipe.cuisine}</p>

            <span>View Recipe →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}*/