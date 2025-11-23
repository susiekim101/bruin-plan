interface SearchBarProps {
    searchTerm: string,
    handleSearch: () => void;
}

function SearchBar ({searchTerm, handleSearch}: SearchBarProps) {
    return (
        <input
            className='h-8 w-full bg-white px-2 py-1.5 rounded-2xl text-zinc-500'
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
        />
    )
}

export default SearchBar