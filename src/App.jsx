import React from 'react'
import HomePage from './pages/HomePage'
import { Route, Routes } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import SelesctRPage from './pages/SelesctRPage'
import BusinesssOwnerRegisterPage from './pages/BusinessOwnerRegisterPage'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element = {<HomePage />} />
        <Route path='/register-select' element = {<SelesctRPage />} />
        <Route path='/register' element = {<SignUpPage />} />
        <Route path='/login' element = {<LoginPage />} />
        <Route path='business-owner-register' element = {<BusinesssOwnerRegisterPage />} />
      </Routes>
    </div>
  )
}

export default App
