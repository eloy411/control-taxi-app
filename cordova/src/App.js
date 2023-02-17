import { HashRouter,Route,Routes } from 'react-router-dom';
import Login from './components/Login' 
import Register from './components/Register';
import Denuncia from './components/Denuncia'
import Succes from './components/Succes'
import NewPassword from './components/New-password'
import './App.css';

function App() {


  return (
    
    
  <HashRouter>
  <Routes>
  <Route exact path='/' element={Login()}/>
  
  <Route exact path='/register' element={Register()}/>
 
  <Route path='/denuncia' element={<Denuncia/>}/>
  
  <Route path='/succes' element={Succes()}/>

  <Route path='/new-password' element={NewPassword()}/>

  <Route path='/info' element={<h1>info</h1>}/>
  </Routes>
  </HashRouter>
   
  );
}

export default App;