import React from 'react'
import WeatherApp from './components/weather'
import HomePage from './components/home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <>
    <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/weather" element={<WeatherApp />} />
    </Routes>
    </Router>
    </>
  )
}

export default App
