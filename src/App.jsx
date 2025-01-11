import { useEffect, useState, useRef, useCallback, useTransition } from "react";
import "./App.css";
import Cards from "./components/Cards";
function App() {
  const [movies, setMovies] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [fetchedPages, setFetchedPages] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef(null); // Ref for Intersection Observer
  const [isPending, startTransition] = useTransition();
  const fetchMovies = async (pageNo) => {
    setIsLoading(true);
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
    )
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => console.log(err));
    setTotalPage(response.total_pages);
    setMovies((prevState) =>
      page == 1 ? response.results : [...prevState, ...response.results]
    );
    setIsLoading(false);
  };

  useEffect(() => {
    if (!fetchedPages.has(page)) {
      fetchMovies(page);
      setFetchedPages((prev) => new Set(prev).add(page));
    }
  }, [page, fetchedPages]);
  const observerCallback = useCallback(
    (entries) => {
      const [entry] = entries;

      if (entry.isIntersecting && !isLoading) {
        startTransition(() =>
          setPage((prev) => {
            console.log(`**** page ${prev} ****`);
            return prev + 1;
          })
        );
      }
    },
    [isLoading]
  );
  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      threshold: 1.0,
    });
    if (observerRef.current) observer.observe(observerRef.current);
    if (page == totalPage) observer.unobserve(observerRef.current);
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [observerCallback]);
  return (
    <>
      <div className="header">
        <h1>Trending Movies</h1>
      </div>
      <div className="card-container">
        {movies &&
          movies.map((movie) => {
            return <Cards movie={movie} key={movie.id} />;
          })}
      </div>
      <div
        ref={observerRef}
        style={{ height: "50px", background: "lightgray", margin: "10px 0" }}
      >
        {isLoading ? "Loading..." : "Load More"}
      </div>
    </>
  );
}

export default App;
