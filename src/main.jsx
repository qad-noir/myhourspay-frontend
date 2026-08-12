import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import AuthPage from './AuthPage.jsx'
import DashboardPage from './DashboardPage.jsx'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter basename={import.meta.env.BASE_URL}>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/login" element={<AuthPage mode="login" />} />
				<Route path="/signup" element={<AuthPage mode="signup" />} />
				<Route path="/dashboard" element={<DashboardPage />} />
				<Route path="*" element={<App />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>,
)
