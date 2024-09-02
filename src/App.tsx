import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Home } from "./pages/game/active-games"
import { Game } from "./pages/game/single-game"
import NavBar from "./components/ui/NavBar"
import { AllGames } from "./pages/game/all-games"
import CreateUpdateGame from "./pages/game/create-update-game"
import { UserProfilePage } from "./pages/profile"
import { Card } from "./pages/card"
import MyOrders from "./pages/orders/my-orders"
import AllOrders from "./pages/orders/all-orders"

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
        <Route path="/users/me/orders" element={<MyOrders />} />
        <Route path="/orders" element={<AllOrders />} />
      </Routes>
    </Router>
  )
}

export default App
