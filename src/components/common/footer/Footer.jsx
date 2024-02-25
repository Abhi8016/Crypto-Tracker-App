import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";

function Footer() {
  return (
    <div className="footer">
      <h2 className="logo-footer">
        CryptoTracker<span>.</span>
      </h2>
      <div className="social-links">
        <Link to="https://facebook.com">
          <FacebookIcon className="social-link" />
        </Link>
        <Link to="mailto:avivashishta@gmail.com">
          <EmailIcon className="social-link" />
        </Link>
        <Link to="https://www.x.com">
          <XIcon className="social-link" />
        </Link>
        <Link to="https://www.instagram.com">
          <InstagramIcon className="social-link" />
        </Link>
      </div>
    </div>
  );
}

export default Footer;
