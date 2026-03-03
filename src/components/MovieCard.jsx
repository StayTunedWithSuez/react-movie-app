import React from 'react'
import PropTypes from "prop-types"

function MovieCard({movie: { title, vote_average, poster_path, release_date, original_language}}) {
    return (
        <div className='bg-dark-100 text-white p-5 rounded-2xl shadow-inner shadow-light-100/10'>
            <img className='w-full h-auto rounded-lg' src={poster_path? `https://image.tmdb.org/t/p/w500/${poster_path}`: "./no-movie.png"} alt={title} />

            <div className='mt-4'>
                <h3 className='font-semibold'>{title}</h3>
                <div className='flex flex-row gap-2 text-sm items-center mt-1'>
                    <div className='flex flex-row gap-1 items-center'>
                        <img className='size-4 object-contain' src="./star.svg" alt="Star Icon" />
                        <span>{vote_average? vote_average: 'N/A'}</span>
                    </div>

                    <span>•</span>
                    <span className='capitalize'>{original_language || "N/A"}</span>
                    <span>•</span>
                    <span>{release_date? release_date.split('-')[0]: 'N/A'}</span>
                </div>
            </div>

        </div>
    )
}

MovieCard.propTypes = {
    movie: PropTypes.object.isRequired,
}

export default MovieCard;
