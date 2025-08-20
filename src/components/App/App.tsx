import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Footer, Navbar, Page } from "decentraland-ui";
import Home from "../Home";
import Transfer from "../Transfer";
import "./App.css";
import "animate.css";
import "react-loading-skeleton/dist/skeleton.css";

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Navbar activePage="Home" />
        <Page className="app-page">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/transfer" element={<Transfer />} />
          </Routes>
        </Page>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
