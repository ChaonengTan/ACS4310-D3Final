import './App.css';
import { useState } from 'react';
import Graph from './components/graph/graph'
import gameInfo from './gameInfo.csv'

const testData = [
  {category:'publisher', reducer:'sales'},
  {category:'title', reducer:'sales'},
  {category:'platform', reducer:'sales'}
]

function App() {
  const [filters, setFilters] = useState(testData);
  const addNewFilter = data => setFilters([...filters, data])

  const [category, setCategory] = useState(null)
  const [reducer, setReducer] = useState(null)
  return (
    <div className="App">
      <div>
        <input type='text' onChange={e => setCategory(e.target.value)} placeholder='category'></input>
        <input type='text' onChange={e => setReducer(e.target.value)} placeholder='reducer'></input>
        <button onClick={e => {
          addNewFilter({category:`${category}`, reducer:`${reducer}`})
          // console.log(filters)
        }}>Add Filter</button>
      </div>
      <Graph 
        data={gameInfo}
        width='600'
        height='600'
        graphSpacing='10'
        graphSize='100'
        filters={filters}
      />
    </div>
  );
}

export default App;
