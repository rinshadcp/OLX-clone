import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { Authcontext, FirebaseContext } from "../../Store/Context";
function Header() {
  const history = useHistory();
  const { user } = useContext(Authcontext);
  const { firebase } = useContext(FirebaseContext);
  const loginHandle = () => {
    history.push("/login");
  };
  const creatHandle = () => {
    history.push("/create");
  };
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span>
            {user ? (
              ` Welcome ${user.displayName}`
            ) : (
              <span onClick={loginHandle}>Login</span>
            )}
          </span>
          <hr />
        </div>
        {user && (
          <span
            className="logout"
            onClick={() => {
              firebase.auth().signOut();
              history.push("/login");
              localStorage.clear()
            }}
          >
            Logout
          </span>
        )}
        {user ? (
          <div className="sellMenu" onClick={creatHandle}>
            <SellButton></SellButton>
            <div className="sellMenuContent">
              <SellButtonPlus></SellButtonPlus>
              <span>SELL</span>
            </div>
          </div>
        ) : (
          <div className="sellMenu" onClick={loginHandle}>
            <SellButton></SellButton>
            <div className="sellMenuContent">
              <SellButtonPlus></SellButtonPlus>
              <span>SELL</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
