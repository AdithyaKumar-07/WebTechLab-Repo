import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import StudentProfile from './StudentProfile.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StudentProfile />
  </StrictMode>,
)
