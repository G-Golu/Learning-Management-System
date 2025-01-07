
import { Route , Routes } from 'lucide-react'
import './App.css'
import AuthPage from './pages/auth'

function App() {
  
 return App(
  <Routes>

    <Route path="/auth" element={<AuthPage/>}/>
  </Routes>
 );
 
  
}

export default App;
