import { useState } from 'react';

function SearchBar () {
    const [ searchTerm, setSearchTerm ] = useState("");

    return (
        <input
            className='h-8 w-full bg-white px-2 py-1.5 rounded-2xl text-zinc-500'
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
    )
}

export default SearchBar;