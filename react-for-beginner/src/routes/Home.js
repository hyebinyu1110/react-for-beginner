import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import styles from "./Home.module.css";

function Home(){
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const json = await (
      await fetch(
        "https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year"
      )
    ).json()
    setMovies(json.data.movies);
    setLoading(false);
  }
  useEffect(() => {
    getMovies();
  }, [])// dependency

  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loader}>
          <span>Loading...</span>
        </div>
      ) : (
        <div className={styles.movies}>
          {movies.map((movie) => (
     <Movie key={movie.id} // key는 컴포넌트를 map()함수내에서 사용할 때 사용함 꼭!
                id={movie.id}
                coverImg={movie.medium_cover_image}
                 title={movie.title}
                 year={movie.year} 
                 summary={movie.summary}
                 genres={movie.genres} 
                 rating={movie.rating} />
       ))}
       </div>)}
    </div>
  )
}

export default Home;