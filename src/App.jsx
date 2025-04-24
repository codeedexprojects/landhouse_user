import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Properties from './Pages/Properties'
import Collections from './Pages/Collections'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/collection" element={<Collections />} />
        
      </Routes>
        
    </>
  )
}

export default App
