import React from "react";
import { motion } from "framer-motion";
import Backdrop from "../backdrop/Backdrop";
import "./styles.css";
const Modal = ({ handleClose, text1, text2, title }) => {
  const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        dumping: 2,
        stiffness: 100,
      },
    },
    exit: { y: "100vh", opacity: 0 },
  };
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="modal gradient-m"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h2>{title}</h2>
        <p>{text1}</p>
        <p>{text2}</p>
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
