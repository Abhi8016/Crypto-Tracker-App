import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/HomePage";
import DashbordPage from "./pages/DashbordPage";
import CoinPage from "./pages/CoinPage";
import ComparePage from "./pages/ComparePage";
import WatchlistPage from "./pages/WatchlistPage";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import Modal from "./components/common/modalComponent/modal/Modal";

function App() {
  const [modalOpen, setModalopen] = useState(true);

  const close = () => setModalopen(false);
  const open = () => setModalopen(true);

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };
    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
    // modalOpen ? close() : open();
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 3,
      y: mousePosition.y + 6,
    },
  };
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
      />
      {modalOpen && (
        <Modal
          modalOpen={modalOpen}
          handleClose={close}
          title={"Important"}
          text1={
            "Please note that the API has a low rate limit. Be careful not to exceed it, as doing so can lead to temporary restrictions or denial of access. Manage your requests wisely to avoid disruptions to your applications."
          }
          text2={
            "You can click anywhere outside this window to close it. Thank you for your cooperation."
          }
        />
      )}
      <div className="motion-flex">
        <motion.div className="cursor" variants={variants} animate="default" />
        <motion.div
          className="cursor-2"
          variants={variants}
          animate="default"
          transition={{ duration: 0.2 }}
        />
      </div>
      {!modalOpen && (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashbordPage />} />
            <Route path="/coin/:id" element={<CoinPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/watchlist" element={<WatchlistPage />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}
// Github
export default App;
