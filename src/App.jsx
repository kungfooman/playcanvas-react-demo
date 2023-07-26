import './App.css'
// import PropTypes from 'prop-types';
import { useEffect, useState } from 'react'
import Search from './components/Search'
import Scene from './components/Scene'

const welcome = "Welcome to this React Website"

function App() {
  let [development, setDevelopment] = useState(true)

  const names = ["John", "Mary", "Peter", "Sally"]
  const technologies = [
    {name: "React", id: 1},
    {name: "Vue", id: 2},
    {name: "Angular", id: 3},
  ]

  const [searchTerm, setSearchTerm] = useState("")

  function toggleDevelopment() {
    setDevelopment(!development)
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  useEffect(() => {
    console.log("Search term changed ", searchTerm)
  }, [searchTerm])

  return (
    <div className="App">
      <h1>{welcome}</h1>
    {development ? (
      <div> Hello World! </div>
    ) : (
      <GetFooter sub="Change2 s.r.l." number={3884242702} />
    )}
      <button style={{backgroundColor: development ? "green" : "red"}} onClick={toggleDevelopment}>
        {development ? "Activate" : "Deactivate"} Development
      </button>

      <div className="List">
        <h2>Team</h2>
        {names.map((name, index) => (
          <div key={index}>{name}</div>
        ))
        }
        <h2>Technologies</h2>
        {technologies.map((technology, index) => (
          <div key={index}>{technology.name} - N. {technology.id}</div>
        ))}
      </div>

      <Search search={searchTerm} onSearch={handleSearch}/>
      <SearchDeconstructed  search={searchTerm} onSearch={handleSearch} />

      <Scene />
    </div>
  )
}

const GetFooter = (props) => {
  return (
    <div> 
      Welcome to this React Website
      <p>{props.sub}</p>
      <p>{props.number}</p>
    </div>
  )
}

// GetFooter.propTypes = {
//   sub: PropTypes.string.isRequired,
//   number: PropTypes.number.isRequired
// }

const SearchDeconstructed = ({ search, onSearch }) => {
  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input
        id="search"
        type="text"
        value={search}
        onChange={onSearch}
      />
    </div>
  )
}
export default App



