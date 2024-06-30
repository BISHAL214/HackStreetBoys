import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Home = () => {

  const navigate = useNavigate();
  const userState = useSelector(state => state.user)

  const handleClick = () => {
    if(userState?.data) {
      navigate("/book")
    } else {
      navigate("/signin")
    }
  }

  return (
    <div className=' flex justify-center items-center uppercase text-2xl font-mono flex-col gap-20 pt-11 pb-11'>
      <div className=' flex flex-row gap-10'>
        <div className=' flex flex-col gap-14 pt-28'>
          <h1 className=' text-6xl font-bold font-sans'>Instant Ambulance booking <br/> app for emergencies,<br/> ensuring rapid medical <br/> assistance</h1>
          <Button onClick={handleClick} style={{ background: "#000", width: "25%", height: "8%", color: "#fff", fontSize: "1.4rem" }}>Get Started</Button>
        </div>
        <div>
          <img src="/ambulance.jpg" alt="ambulance" width={700} height={700} className=' rounded-lg' />
        </div>
      </div>
    </div>
  )
}

export default Home
