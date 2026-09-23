import { Routes, Route } from 'react-router'
import { GamesPage } from './pages/games/GamesPage';
import './App.css'

function App() {
	return (
		<>
			<Routes>
				{/* <Route index path="/" element={<HomePage />} /> */}
				<Route index path="/" element={<GamesPage />} />
				{/* <Route path="*" element={<PageNotFound />} /> */}
			</Routes>
		</>
	)
}

export default App
