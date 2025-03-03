import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom' // Importera RouterProvider
import "bootstrap/dist/css/bootstrap.min.css"; // Importera Bootstrap
import './index.css'
import router from './routing.tsx' // Importera routern
import { AuthProvider } from './context/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider> {/* Använd AuthProvider */}
      <RouterProvider router={router} /> {/* Använd RouterProvider */}
    </AuthProvider>
  </StrictMode>,
)