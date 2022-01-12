import './App.css';
import { useState, useRef, useLayoutEffect } from 'react';
import gameInfo from './gameInfo.csv'
import * as htmlToImage from 'html-to-image'
import { saveAs } from 'file-saver'
// importGraphs
import PieGraph from './components/pieGraph/pieGraph'
import BarGraph from './components/barGraph/barGraph'

function App() {
  // CSV
  const [CSV, setCSV] = useState(gameInfo)
  // filterData
  const [filters, setFilters] = useState([]);
  const addNewFilter = data => setFilters([...filters, data])
  const [category, setCategory] = useState(null)
  const [reducer, setReducer] = useState(null)
  // filter-graph updater: detects wether filters updates => updates the graph
  const firstUpdate = useRef(true);
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return
    }
    setNewGraph()
  }, [filters])
  // initializationData
  const [width, setWidth] = useState('600')
  const [height, setHeight] = useState('600')
  const [graphSpacing, setGraphSpacing] = useState('10')
  const [graphSize, setGraphSize] = useState('100')
  const [margin, setMargin] = useState(100)
  // graphData
  const [graphType, setGraphType] = useState('PieGraph')
  const [graph, setGraph] = useState(null)
  const setNewGraph = () => {
    const graphStorage = () => {
      if(graphType == 'PieGraph'){
        return (
          <PieGraph
            data={CSV}
            width={width}
            height={height}
            graphSpacing={graphSpacing}
            graphSize={graphSize}
            filters={filters}
          />
        )
      }
      if(graphType == 'BarGraph'){
        return (
          <BarGraph
            data={CSV}
            width={width}
            height={height}
            filters={filters}
            margin={margin}
          />
        )
      }
    }
    setGraph(graphStorage())
  }
  // saveElement
  const [saveAsName, setSaveAsName] = useState('myFile')
  const saveElement = (id, fileName) => {
    htmlToImage.toPng(document.getElementById(id))
      .then(dataUrl => saveAs(dataUrl,`${fileName}.png`))
  }

  // return
  return (
    <div className="App">
      <div className='interface'>
        <h1>Data Renderer</h1>
        {/* initialization */}
          <div className='interfaceGroup'>
            <select value={graphType} onChange={e => setGraphType(e.target.value)}>
              <option>BarGraph</option>
              <option>PieGraph</option>
            </select>
            {/* canvas dimentions */}
            <div className='inputGroup'>
              <label for='widthInput'>Width: 
                <input id='widthInput' type='number' onChange={e => setWidth(e.target.value)} placeholder='width' value={width}></input>
              </label>
              <label for='heightInput'>Height: 
                <input id='heightInput' type='number' onChange={e => setHeight(e.target.value)} placeholder='height' value={height}></input>
              </label>
            </div>
            {/* conditional rendering of graph-specific settings */}
            <div className='additionalSettings'>
              {graphType=='PieGraph' &&
              <div className='inputGroup'>
                <label for='graphSpacingInput'>Graph Spacing:
                  <input id='graphSpacingInput' type='number' onChange={e => setGraphSpacing(e.target.value)} placeholder='graphSpacing' value={graphSpacing}></input>
                </label>
                <label for='graphSizeInput'>Graph Size:
                  <input id='graphSizeInput' type='number' onChange={e => setGraphSize(e.target.value)} placeholder='graphSize' value={graphSize}></input>
                </label>
                
              </div>
              }
              {graphType=='BarGraph' &&
              <div className='inputGroup'>
                <label for='marginInput'>Margin: 
                  <input id='marginInput' type='number' onChange={e => setMargin(e.target.value)} placeholder='margin' value={margin}></input>
                </label>
              </div>
              }
            </div>
            {/* graph initialization */}
            <div className='inputGroup'>
              <label for='csvInput'>Custom CSV: 
                <input id='csvInput' type='file' id='customCSV' onChange={e => setCSV(URL.createObjectURL(e.target.files[0]))}></input>
              </label>
            </div>
            <div className='inputGroup'>
              <button onClick={() => setFilters([])}>Initialize Graph</button>
              {graph &&
              <button onClick={() => setGraph(null)}>clearGraph</button>
              }
            </div>
          </div>
        {/* generalInterface */}
        {graph &&
          <div className='interfaceGroup'>
            <div className='inputGroup'>
              <label for='categoryInput'>Category: 
                <input id='categoryInput' type='text' onChange={e => setCategory(e.target.value)} placeholder='category'></input>
              </label>
              <label for='reducerInput'>Reducer: 
                <input id='reducerInput' type='text' onChange={e => setReducer(e.target.value)} placeholder='reducer'></input>
              </label>
              
              <button onClick={e => addNewFilter({category:`${category}`, reducer:`${reducer}`})}>Add Filter</button>
            </div>
            <div className='inputGroup'>
              <label for='fileNameInput'>File Name: 
                <input id='fileNameInput' type='text' placeholder='myFile.png' value={saveAsName} onChange={e => setSaveAsName(e.target.value)}></input>
              </label>
              <button onClick={() => saveElement('graph', saveAsName)}>Save Image</button>
            </div>
          </div>
        }
      </div>
      <div id='graph'>{graph}</div>
    </div>
  );
}

export default App;
