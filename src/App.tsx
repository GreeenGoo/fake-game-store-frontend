import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Home } from "./pages/home"
import { Game } from "./pages/game"
import NavBar from "./components/ui/NavBar"
import { AllGames } from "./pages/all-games"
import CreateUpdateGame from "./pages/create-update-game"
import { UserProfilePage } from "./pages/profile"
import { Card } from "./pages/card"

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/games/all" element={<AllGames />} />
        <Route path="/games/active" element={<Home />} />
        <Route path="/games/:id" element={<Game />} />
        <Route path="/games/add" element={<CreateUpdateGame />} />
        <Route path="/users/me" element={<UserProfilePage />} />
        <Route path="/users/me/orders/current" element={<Card />} />
      </Routes>
    </Router>
  )
}

export default App
