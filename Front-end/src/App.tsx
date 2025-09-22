import "./App.css";
import { useQuery } from "@tanstack/react-query";
import fetchData from "./request";

interface Recipe {
  id: number;
  name: string;
  category: string;
  area: string;
  instructions: string;
}

function App() {
  const { data, isPending, error } = useQuery({
    queryKey: ["recipe"],
    queryFn: fetchData,
  });
  function handleClick() {
    window.location.reload();
  }

  return (
    <main>
      <h1 className="font-extrabold text-4xl">Random Recipe Generator</h1>
      {isPending ? <div>Loading...</div> : null}
      {error ? <div>Error: {error.message}</div> : null}

      <div>
        {data
          ? data.map((recipe: Recipe) => (
              <div key={recipe.id}>
                <h2>
                  {" "}
                  <span className="text-red-400 text-2xl font-bold">
                    Name of the Recipe:
                  </span>
                  {recipe.name}
                </h2>
                <p>
                  <span className="text-red-400 text-2xl font-bold">
                    Instruction for the Recipe:
                  </span>{" "}
                  {recipe.instructions}
                </p>
                <p>
                  <span className="text-red-400 text-2xl font-bold">
                    Recipe Category:
                  </span>
                  {recipe.category}
                </p>

                <p>
                  <span className="text-red-400 text-2xl font-bold">
                    Recipe Area :
                  </span>
                  {recipe.area}
                </p>
              </div>
            ))
          : null}
      </div>
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10 cursor-pointer"
        onClick={handleClick}
      >
        Generate New Recipe
      </button>
    </main>
  );
}

export default App;
