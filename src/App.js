import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Register from './pages/Register';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Protect from './Components/Protect';
import Player from './pages/Player';



function App() {
    
 return (
    <div className="App">

   
      <BrowserRouter>
        
        <Routes>
        
          <Route path="/" element={<Login/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/homepage" element={
            
            <Protect>
                <Homepage/>
            </Protect>
                
          }/>

          <Route path="/player/:id" element={
            
            <Protect>
                <Player/>
            </Protect>
                
          }/>

       
        </Routes>
        
      
      </BrowserRouter>

    </div>
  );
}

export default App;