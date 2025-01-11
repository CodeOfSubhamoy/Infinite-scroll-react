export const fetchMovies = async (pageNo) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${pageNo}`,
    {
      // Adding method type
      method: "GET",

      // Adding headers to the request
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzJjMGRlZGE3MzdmNjg0ZjVkZGEyZGQwY2NjMWQ3NyIsIm5iZiI6MTcyNTg3NjUxMC42NjQsInN1YiI6IjY2ZGVjOTFlYjE1MjI3YzE3YzRjMmRjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Mjr90TdKbO_U_lcaxHayZPni5qlNhasTF4Ia6jWQ6t4",
      },
    }
  );
  return response.json();
};
