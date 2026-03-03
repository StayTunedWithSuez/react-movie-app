import { useState, useEffect } from "react";
import { updateSearchCount, getTrendingMovies} from "../appwrite";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_BASE_URL = "https://api.themoviedb.org/3";

const API_OPTIONS = {
    method: "GET",
    headers: {
        accept: "application/json",
        authorization: `Bearer ${API_KEY}`,
    }
}

function useMovies(searchTerm) {

    const [movieList, setMovieList] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [trendingMovies, setTrendingMovies] = useState([]);

    const fetchMovies = async (query = '') => {
        
        setIsLoading(true);
        setErrorMessage('');

        try {
            const endPoint = query? 
                `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
                :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

            const response = await fetch(endPoint, API_OPTIONS);
            if(!response.ok) throw new Error("fetching movie failed.")
            
            const data = await response.json();
            
            setMovieList(data.results || []);

            if(query && data.results.length > 0){
                await updateSearchCount(query, data.results[0]);
            }
            
        } catch (error) {
            console.log(error);
            setErrorMessage("Error Occurs");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchTrendingMovies = async () => {
        try {
            const response = await getTrendingMovies();
            //console.log(response)

            setTrendingMovies(response || []);
            
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchMovies(searchTerm);
    }, [searchTerm]);

    useEffect(() => {
        fetchTrendingMovies();
    }, []);
    

    return [movieList, errorMessage, isLoading, trendingMovies]

}

export default useMovies;