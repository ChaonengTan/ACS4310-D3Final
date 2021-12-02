import './App.css';
import Graph from './components/graph/graph'
import gameInfo from './gameInfo.csv'

function App() {
  return (
    <div className="App">
      <Graph 
        data={gameInfo}
        width='600'
        height='600'
        graphSpacing='10'
        graphSize='100'
      />
    </div>
  );
}

export default App;
