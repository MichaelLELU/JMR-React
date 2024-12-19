import { Outlet } from 'react-router-dom'
import './App.css'
import NavBar from './component/navbar/NavBar'

function App() {


  return (
    <>
      <NavBar/>
      <Outlet/>
    </>
  )
}

export default App
