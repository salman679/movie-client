const topDirectors = [
  {
    name: "Christopher Nolan",
    movies: ["Inception", "Interstellar", "Dunkirk"],
  },
  {
    name: "Steven Spielberg",
    movies: ["Jurassic Park", "E.T.", "Saving Private Ryan"],
  },
  {
    name: "Greta Gerwig",
    movies: ["Lady Bird", "Little Women", "Barbie"],
  },
];

export function TopDirectors() {
  return (
    <section className="my-8">
      <h2 className="text-3xl font-bold text-center dark:text-white mb-6">
        Top Directors
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topDirectors.map((director, index) => (
          <div key={index} className="bg-white shadow-md rounded p-4">
            <h3 className="text-xl font-semibold">{director.name}</h3>
            <ul className="mt-2">
              {director.movies.map((movie, idx) => (
                <li key={idx} className="text-sm text-gray-700">
                  {movie}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
