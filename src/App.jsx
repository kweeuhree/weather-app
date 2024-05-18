import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage/HomePage';


function App() {

  return (
    <div className="App">

       <Routes>
          <Route path="/home" element={<HomePage />} />
       </Routes>

    </div>
  )
}

export default App;
