import Search from "./components/Search";
import useMovies from "./hooks/useMovies";
import MovieCard from "./components/MovieCard";
import { useEffect, useState } from "react";
import Spinner from "./components/Spinner";
import Trending from "./components/Trending";

function HomePage() {

    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);


    const [movies, errorMessage, isLoading, trendingMovies]  = useMovies(debouncedSearch);

    useEffect(() => {
        const timer = setTimeout(() =>{
            setDebouncedSearch(searchTerm);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm])
    

    //console.log(movies);
    //console.log(encodeURIComponent(searchTerm));

    return(
        <main className="min-h-screen relative bg-primary">
            <div className="pattern" />
            <div className="wrapper">
                <header className="mt-5 sm:mt-10">
                    <img className="w-full h-auto max-w-lg object-contain mx-auto" src="./hero.png" alt="Hero Banner" />
                    <h1 className="text-white text-4xl max-w-4xl font-bold mx-auto text-center sm:text-[64px] mt-10">Find Movies You&apos;ll Enjoy Without the Hassie</h1>
                    <Search searchTerm = {searchTerm} setSearchTerm = {setSearchTerm} />
                </header>

                {trendingMovies.length > 0 && (
                    <section> 
                        <h2 className="text-white font-semibold mt-10">Trending Movies</h2>
                        <Trending trendingMovies = {trendingMovies} />
                    </section>
                )}

                <section className="-mt-9 space-y-9">
                    <h2 className="text-white font-semibold">All Movies</h2>
                    {isLoading ? <Spinner />
                    : errorMessage ? (
                        <p className="text-white">{errorMessage}</p>
                    ): movies.length === 0 ? (
                        <p className="text-5xl w-full py-10 text-gray-400 text-center font-bold">No Movie Found!</p>
                    ):(
                        <div className="grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"> 
                            {movies.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))} 
                        </div>
                    )}
                </section>
            </div>
        </main>
    )
}

export default HomePage;