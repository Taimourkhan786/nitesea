import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";

import Helmet from "./components/Helmet";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* HOME */}
        <Route
          path="/"
          element={
            <>
              <Helmet
                title="NiteSea - Free Online Image Resizer Tool"
                description="Resize images instantly in browser for free"
                url="https://nitesea.com/"
                image="https://nitesea.com/logo512.png"
              />
              <Home />
            </>
          }
        />

        {/* ABOUT */}
        <Route
          path="/about"
          element={
            <>
              <Helmet
                title="About NiteSea - Image Resizer Tool"
                description="Learn about NiteSea image resizer tool"
                url="https://nitesea.com/about"
                image="https://nitesea.com/logo512.png"
              />
              <About />
            </>
          }
        />

        {/* CONTACT */}
        <Route
          path="/contact"
          element={
            <>
              <Helmet
                title="Contact NiteSea Support"
                description="Contact NiteSea for help and support"
                url="https://nitesea.com/contact"
                image="https://nitesea.com/logo512.png"
              />
              <Contact />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;