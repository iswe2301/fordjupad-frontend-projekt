import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom' // Importera RouterProvider
import './index.css'
import router from './routing.tsx' // Importera routern

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} /> {/* Använd RouterProvider */}
  </StrictMode>,
)