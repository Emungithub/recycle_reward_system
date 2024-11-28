import React, { useEffect, useState } from "react";
import logo from "../../public/logo.png";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import homeImage from "../../public/home-img.png";
import Minter from "./Minter";
import Gallery from "./Gallery";
import { recycle_backend } from "../../../declarations/recycle_backend";
import CURRENT_USER_ID from "../main";
import WelcomeCard from "./WelcomeCard";
import Leaderboard from "./Leaderboard";
import RewardCard from "./RewardCard";

function Header() {

  const [userOwnedGallery, setOwnedGallery] = useState();
  const [listingGallery, setListingGallery] = useState();


  async function getNFTs() {
    const userNFTIds = await recycle_backend.getOwnedNFTs(CURRENT_USER_ID);
    console.log(userNFTIds);
    setOwnedGallery(<Gallery title="My NFTs" ids={userNFTIds} role="collection" />);

    const listedNFTIds = await recycle_backend.getListedNFTs();
    console.log(listedNFTIds);
    setListingGallery(<Gallery title="Green Marketplace" ids={listedNFTIds} role="marketplace" />);
  };

  useEffect(() => {
    getNFTs();
  }, [])

  return (
    <BrowserRouter forceRefresh={true}>
      <div className="app-root-1">
        <header className="Paper-root AppBar-root AppBar-positionStatic AppBar-colorPrimary Paper-elevation4">
          <div className="Toolbar-root Toolbar-regular header-appBar-13 Toolbar-gutters">
            <div className="header-left-4"></div>
            <img style={{margin: "10px"}} className="header-logo-11" src={logo} />
            <div className="header-vertical-9"></div>
            <h5 className="Typography-root header-logo-text">
              <Link to="/">
                Recycle Reward
              </Link>
            </h5>

            <div className="header-empty-6"></div>
            <div className="header-space-8"></div>
            <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
              <Link to="/marketplace">
                Green Marketplace
              </Link>
            </button>
            <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
              <Link to="/minter">
                Minter
              </Link>
            </button>
            <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
              <Link to="/collection">
                My NFTs
              </Link>
            </button>
            <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
              <Link to="/transaction">
                Transaction
              </Link>
            </button>
          </div>

          <Routes>
            <Route exact path="/" element={
              <>
                <div style={{
                  width: "70%",
                  height: "100vh", // Full viewport height
                  margin: "0 auto", // Center horizontally
                  justifyContent: "center", // Center horizontally
                  alignItems: "center", // Center vertically
                  textAlign: "center" // Optional: Align text in the center
                }}>

                  {/* <img className="bottom-space" src={homeImage} alt="Home" /> */}

                  <WelcomeCard
                    userName="Ee Mun"
                    profileImage="https://via.placeholder.com/60" // Replace with the real profile image URL
                    totalRecycled={200}
                    nftEarned={1}
                    ftEarned={1}
                  />

                  <RewardCard />

                  {/* <Transaction transactions={transactions} />; */}
                  <Leaderboard />
                </div>
              </>
            } />
            <Route path="/marketplace" element={listingGallery} />
            <Route path="/minter" element={<Minter />} />
            <Route path="/collection" element={userOwnedGallery} />
            <Route path="/transaction" element={<h1>Transaction</h1>} />
          </Routes>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default Header;
