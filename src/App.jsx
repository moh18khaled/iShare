import React from 'react'
import HomePage from './pages/HomePage'
import { Route, Routes } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element = {<HomePage />} />
        <Route path='/register' element = {<SignUpPage />} />
        <Route path='/login' element = {<LoginPage />} />
      </Routes>
    </div>
  )
}

export default App
