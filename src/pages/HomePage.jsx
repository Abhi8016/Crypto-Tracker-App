import React, { useState } from "react";
import Header from "../components/common/header/Header";
import MainComponent from "../components/landingPage/mainComponent/MainComponent";
import Footer from "../components/common/footer/Footer";
import Modal from "../components/common/modalComponent/modal/Modal";

const HomePage = () => {
  const [modalOpen, setModalopen] = useState(true);

  const close = () => setModalopen(false);
  const open = () => setModalopen(true);
  return (
    <>
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
      {!modalOpen && (
        <>
          <Header />
          <MainComponent />
          <Footer />
        </>
      )}
    </>
  );
};

export default HomePage;
