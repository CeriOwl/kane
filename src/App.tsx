"use client"
import { useEffect, useState } from "react"
import Dashboard from "./pages/Dashboard"
import Register from "./pages/Register"
import { BrowserRouter, Routes, Route, useNavigate } from "react-router"
import { ProtectedRoute } from "./lib/routes/ProtectedRoute"
import type { User } from "./lib/types.ts"
import { getUser } from "./lib/dbUser"
import LayoutPages from "./components/layout/Layout"

const App = () => {
  const navigate = useNavigate()
  const checkUser = async () => {
    const user: User[] = await getUser()
    if (user.length > 0 && user) {
      return true
    }
  }
  const [isAuthenticated, setIsAuthenticated] = useState()

  return (
    <Routes>
      <Route path='/register' element={<Register setIsAuthenticated={setIsAuthenticated ?? false} />} />
      <Route path='/' element={<LayoutPages />}>
        <Route index element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Dashboard />
          </ProtectedRoute>}
        />
        <Route path="/accounts" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Dashboard />
          </ProtectedRoute>}
        />
      </Route>
    </Routes>
  )
}
export default App
