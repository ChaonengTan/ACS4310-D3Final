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
  // filterData
  const [filters, setFilters] = useState([]);
  const addNewFilter = data => setFilters([...filters, data])
  const [category, setCategory] = useState(null)
  const [reducer, setReducer] = useState(null)
  // initializationData
  const [width, setWidth] = useState('600')
  const [height, setHeight] = useState('600')
  const [graphSpacing, setGraphSpacing] = useState('10')
  const [graphSize, setGraphSize] = useState('100')
  // graphData
  const [graph, setGraph] = useState(null)
  const setNewGraph = () => {
    const graphStorage = () => {
      return (
        <Graph 
        data={gameInfo}
        width={width}
        height={height}
        graphSpacing={graphSpacing}
        graphSize={graphSize}
        filters={filters}
      />
      )
    }
    setGraph(graphStorage())
  }

  // return
  return (
    <div className="App">
      <div className='interface'>
        {/* initialization */}
        {!graph &&
          <div className='initializer'>
            <div className='graphSize'>
              <input type='text' onChange={e => setWidth(e.target.value)} placeholder='width' value={width}></input>
              <input type='text' onChange={e => setHeight(e.target.value)} placeholder='height' value={height}></input>
            </div>
            <div className='graphSettings'>
              <input type='text' onChange={e => setGraphSpacing(e.target.value)} placeholder='graphSpacing' value={graphSpacing}></input>
              <input type='text' onChange={e => setGraphSize(e.target.value)} placeholder='graphSize' value={graphSize}></input>
            </div>
            <button onClick={() => setNewGraph()}>Initialize Graph</button>
          </div>
        }
        {/* generalInterface */}
        {graph &&
          <div className='addNewFilter'>
            <input type='text' onChange={e => setCategory(e.target.value)} placeholder='category'></input>
            <input type='text' onChange={e => setReducer(e.target.value)} placeholder='reducer'></input>
            <button onClick={e => {
              addNewFilter({category:`${category}`, reducer:`${reducer}`})
              console.log(filters)
              setNewGraph()
            }}>Add Filter</button>
        </div>
        }
      </div>
      {graph}
    </div>
  );
}

export default App;
