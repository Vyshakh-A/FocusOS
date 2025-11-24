import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'

const App = () => {
  return (
    <Routes>
      <Route path = '/' element = {<Login />} />
      <Route path = '/register' element = {<Register />} />
      <Route path = '/dashboard' element = {<Dashboard />} />
    </Routes>
  )
}

export default App