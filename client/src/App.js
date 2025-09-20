import './App.css';
import Home from "../src/Components/Home"
import Admin from "../src/Components/Admin"
import Error from "../src/Components/Error"
import Invoice from "../src/Components/Invoice"
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Routes>
      
      <Route path = "/" element = {<Home />} />
      <Route path = "/admin" element = {<Admin />} />
      <Route path = "/invoice" element = {<Invoice />} />


      <Route path = "/*" element = {<Error />} />

      </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
