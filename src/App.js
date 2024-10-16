import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginComponent } from "./Components/user/Login/LoginComponent";
import Profile from "./Components/user/ProfilePage/Profile";
import NavBarClient from "./Components/user/NavBar";
import SignUpClient from "./Components/user/SignUpPage/SignUp";
import DataBases from "./Components/user/DBsPage/DBs";
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<LoginComponent />}
        />
        <Route
          path="/signup"
          element={<SignUpClient />}
        />
        <Route
          path="/profile"
          element={
            <>
              <NavBarClient />
              <Profile />
            </>
          }
        />
        <Route
          path="/homepage"
          element={
            <>
          <NavBarClient />
            <DataBases />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
