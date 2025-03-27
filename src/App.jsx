import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import PrivateRoute from './components/PrivateRoute'
import Dashboard from './components/Dashboard'
import Chat from './components/Chat'
import AutoGradingPage from './components/AutoGradingPage'
import Tasks from './components/Tasks'

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route 
          path="/" 
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } 
        >
          {/* Nested Routes within Home */}
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="ai-chat" element={<Chat />} />
          <Route path="grading" element={<AutoGradingPage />} />
          <Route path="tasks" element={<Tasks />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App