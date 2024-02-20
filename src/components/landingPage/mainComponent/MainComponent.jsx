import React from "react";
import "./styles.css";
import iphone from "../../../assets/phone 1.png";
import gradient from "../../../assets/gradient 1.png";
import Button from "../../common/button/Button";
import { motion } from "framer-motion";
const MainComponent = () => {
  return (
    <div className="flex-info">
      <div className="left-component">
        <motion.h1
          className="track-crypto-heading"
          initial={{ opacity: 0, x: 70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <span>Track Crypto</span>
        </motion.h1>
        <motion.h1
          className="real-time-heading"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Real Time.
        </motion.h1>
        <motion.p
          className="info-text"
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Track crypto through a public api in real time. Visit the Dashbord to
          do so!
        </motion.p>
        <div className="btn-flex">
          <Button text={"Dashbord"} />
          <Button text={"Share"} outLined={true} />
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
