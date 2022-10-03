import './App.css';
import Nav from './components/Nav';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Nav />
          <p>
            Bench
          </p>
        </header>
      </div>
    </Router>
  );
}

export default App;
