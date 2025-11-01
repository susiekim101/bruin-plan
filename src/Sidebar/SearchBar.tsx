import { useState } from 'react'

function SearchBar () {
    const [ searchTerm, setSearchTerm ] = useState('')

    return (
        <div>
            <input
                className='h-8 w-4/5 bg-white px-2 py-1.5 rounded-2xl text-zinc-500'
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    )
}

export default SearchBar