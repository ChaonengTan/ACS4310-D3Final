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
      />
    </div>
  );
}

export default App;
