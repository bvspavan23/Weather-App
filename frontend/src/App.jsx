import React from 'react'
import WeatherApp from './components/weather'
import HomePage from './components/home'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/weather" element={<WeatherApp />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
