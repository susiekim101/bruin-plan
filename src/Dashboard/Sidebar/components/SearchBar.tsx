interface SearchBarProps {
    searchTerm: string,
    handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function SearchBar ({searchTerm, handleSearch}: SearchBarProps) {

    return (
        <input
            id='search-bar'
            className='h-8 w-full text-sm bg-white px-2 py-1.5 rounded-2xl text-zinc-500'
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
        />
    )
}

export default SearchBar;