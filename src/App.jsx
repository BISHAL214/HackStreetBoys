import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './Pages/Home/Home'
import Booking from './Pages/Booking/Booking'
import SignUpPage from './Pages/Sign-up/SignUpPage'
import { useDispatch } from 'react-redux'
import {authStateChanger} from "./utils/authStateHandler"
import SignUp from './components/SignUp/SignUp'
import DriverSignUp from './components/SignUp/DriverSignUp'
import HospitalSignUp from './components/SignUp/HospitalSignUp'
import SignInPage from './Pages/Sign-in/SignInPage'
import SignIn from './components/SignIn/SignIn'
import DriverSignIn from './components/SignIn/DriverSignIn'
import HospitalSignIn from './components/SignIn/HospitalSignIn'

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    authStateChanger(dispatch)
  }, [dispatch])

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/book' element={<Booking />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/signup/patient' element={<SignUp />} />
        <Route path='/signup/driver' element={<DriverSignUp />} />
        <Route path='/signup/hospital' element={<HospitalSignUp />} />
        <Route path='/signin' element={<SignInPage />} />
        <Route path='/signin/patient' element={<SignIn />} />
        <Route path='/signin/driver' element={<DriverSignIn />} />
        <Route path='/signin/hospital' element={<HospitalSignIn />} />
      </Routes>
    </>
  )
}

export default App
