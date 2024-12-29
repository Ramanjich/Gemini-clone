import React from 'react'
import Sidebar from './Component/Sidebar/Sidebar'
import Main from './Component/Main/Main'
import './App.css'

const App = () => {
  return (
    <div className='app'>
    <Sidebar/>
    <Main/>
    </div>
  )
}

export default App