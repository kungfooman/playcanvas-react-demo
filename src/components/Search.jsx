
const Search = (props) => {
    const { search, onSearch } = props
    return (
      <div>
        <label htmlFor="search">Search: </label>
        <input 
          id="search" 
          type="text"
          value={search} 
          onChange={onSearch} />
      </div>
    )
}

export default Search