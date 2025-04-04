import './App.css'
import React from 'react'

const Hello = React.lazy(() => import('mf_remote/Hello'));

function App() {

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🏠 Host App</h1>
      <React.Suspense fallback="Loading remote...">
        <Hello />
      </React.Suspense>
    </div>
  );
}

export default App
