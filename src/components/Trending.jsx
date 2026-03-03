import PropTypes from "prop-types"

function Trending({trendingMovies}) {
    return (
        <ul className="flex flex-row overflow-y-auto hide-scrollbar gap-5 w-full">
            {trendingMovies.map((movie, index) =>(
                <li key={movie.$id} className="flex flex-row min-w-[230px] items-center">
                    <p className="fancy-text text-nowrap">{index + 1}</p>
                    <img src={movie?.poster_url === `https://image.tmdb.org/t/p/w500null`? './no-movie.png': movie.poster_url} alt="poster" className="w-[127px] h-[163px] rounded-lg object-cover -ml-3.5" />
                </li>
            ))}
        </ul>
    )
}

Trending.propTypes = {
    trendingMovies: PropTypes.array.isRequired,
}

export default Trending