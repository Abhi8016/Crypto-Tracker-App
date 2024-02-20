import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/HomePage";
import DashbordPage from "./pages/DashbordPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashbordPage />} />
          {/* <Route path="/coin/:id" element={<CoinPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/watchlist" element={<WatchlistPage />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}
// Github
export default App;
