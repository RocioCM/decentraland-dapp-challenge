import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Footer, Navbar, Page } from "decentraland-ui";
import Home from "../Home";
import Transfer from "../Transfer";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Navbar activePage="Home" />
        <Page className="Page">
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
