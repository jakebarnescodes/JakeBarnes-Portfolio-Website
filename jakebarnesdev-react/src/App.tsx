import { Routes, Route } from 'react-router'
import { useMediaQuery } from 'react-responsive';
import { GamesPage } from './pages/games/GamesPage';
import { HomePage } from './pages/home/HomePage';
import './App.css'

function App() {
	const isMobile = useMediaQuery({ maxWidth: 768 });

	return (
		<>
			<Routes>
				<Route index path="/" element={<HomePage isMobile={isMobile} />} />
				<Route path="/games" element={<GamesPage />} />
				{/* <Route path="*" element={<PageNotFound />} /> */}
			</Routes>
		</>
	)
}

export default App
