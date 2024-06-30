import React from 'react'

const Wrapper = ({children, className}) => {
  return (
    <div className={`${className} flex p-10`}>
      {children}
    </div>
  )
}

export default Wrapper
