import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Create from "./Pages/Create";
import View from "./Pages/ViewPost";
import "./App.css";
import { Authcontext, FirebaseContext } from "./Store/Context";
import Post from "./Store/postContext";
/**
 * ?  =====Import Components=====
 */
import Home from "./Pages/Home";

function App() {
  const { setUser } = useContext(Authcontext);
  const { firebase } = useContext(FirebaseContext);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  });

  let email = localStorage.getItem("email");
  return (
    <div>
      <Post>
        <Router>
          <Route exact path="/">
            {email ? <Home /> : <Login />}
          </Route>
          <Route path="/signup">{!email ? <Signup /> : <Home />}</Route>
          <Route path="/login">{!email ? <Login /> : <Home />}</Route>
          <Route path="/create">
            {email ? <Create /> : <Login />}
            
          </Route>
          <Route path="/view">
            {email ? <View /> : <Login />}
            
          </Route>
        </Router>
      </Post>
    </div>
  );
}

export default App;
