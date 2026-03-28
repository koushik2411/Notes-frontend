import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Notes from './pages/Notes'
import PrivateRoute from './components/PrivateRoute'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import Header from './components/Header'

function App() {
  const [dark, setDark] = useState(() => {
  const saved = localStorage.getItem("theme");
  return saved === "dark";
});

  // apply theme
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme","dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme","light");
    }
  }, [dark]);

  return (
    <>
    <Header dark={dark} setDark={setDark}/>
    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/forgot-password' element={<ForgotPassword/>} />
      <Route path='/' element={
        <PrivateRoute>
          <Notes/>
        </PrivateRoute>
      }/>
      
    </Routes>
    </>
  )
}

export default App
