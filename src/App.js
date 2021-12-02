import './App.css';
import Graph from './components/graph/graph'
import gameInfo from './gameInfo.csv'

function App() {
  const filters = [
    {category:'publisher', reducer:'sales'},
    {category:'title', reducer:'sales'},
    {category:'platform', reducer:'sales'}
  ]
  return (
    <div className="App">
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
