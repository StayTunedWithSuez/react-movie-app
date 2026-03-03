import PropTypes from "prop-types"

function Search({searchTerm, setSearchTerm}) {


    return(
        <div className="flex flex-row space-x-4 mt-10 bg-light-100/5 px-6 rounded-lg w-full max-w-3xl mx-auto">
            <img src="./search.svg" alt="search" />
                <input 
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for movies, TV shows, and more..."
                    className="text-white w-full py-4 bg-transparent focus:outline-none"
                />
        </div>
    )
}

Search.propTypes = {
    setSearchTerm: PropTypes.func.isRequired,
    searchTerm: PropTypes.string.isRequired,
}

export default Search;