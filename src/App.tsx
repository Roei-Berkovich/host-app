import './App.css'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'

const Hello = React.lazy(() => import('mf_remote/Hello'));

function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: '2rem' }}>
        <h1>🏠 Host App</h1>
        <Navigation />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/remote" element={
            <React.Suspense fallback="Loading remote...">
              <Hello />
            </React.Suspense>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
