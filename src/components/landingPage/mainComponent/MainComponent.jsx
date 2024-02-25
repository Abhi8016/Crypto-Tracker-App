import React from "react";
import "./styles.css";
import iphone from "../../../assets/phone 1.png";
import gradient from "../../../assets/gradient 1.png";
import Button from "../../common/button/Button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { RWebShare } from "react-web-share";
const MainComponent = () => {
  return (
    <div className="flex-info">
      <div className="left-component">
        <motion.h1
          className="track-crypto-heading"
          initial={{ opacity: 0, x: 70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span>Track Crypto</span>
        </motion.h1>
        <motion.h1
          className="real-time-heading"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Real Time.
        </motion.h1>
        <motion.p
          className="info-text"
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Track crypto through a public api in real time. Visit the Dashbord to
          do so!
        </motion.p>
        <div className="btn-flex">
          <Link to="/dashboard">
            <Button text={"Dashbord"} outLined={false} />
          </Link>
          <RWebShare
            data={{
              text: "Track Crypto Real Time.",
              url: "https://crypto-dashboard-jan.netlify.app",
              title: "CryptoTracker.",
            }}
          >
            <Button text={"Share App"} outLined={true} />
          </RWebShare>
        </div>
      </div>
      <div className="phone-container">
        <motion.img
          className="iphone"
          initial={{ y: -10 }}
          animate={{ y: 10 }}
          transition={{
            type: "smooth",
            repeatType: "mirror",
            duration: 2,
            repeat: Infinity,
          }}
          src={iphone}
        />
        <img className="gradient" src={gradient} />
      </div>
    </div>
  );
};

export default MainComponent;
