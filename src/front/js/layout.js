import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import Home from "./pages/home";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar.jsx";
import { Footer } from "./component/footer";
import MasterDashboard from "./pages/masterDashboard.jsx";
import { Users } from "./pages/users.jsx";
import { Assets } from "./pages/assets.jsx";
import { Providers } from "./pages/providers.jsx";
import { Branches } from "./pages/branches.jsx";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <ScrollToTop>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<MasterDashboard />} path="/masterDashboard" />
          <Route element={<Users />} path="/users" />
          <Route element={<Assets />} path="/assets" />
          <Route element={<Providers />} path="/providers" />
          <Route element={<Branches />} path="/branches" />
          <Route element={<h1>Not found!</h1>} />
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
};

export default injectContext(Layout);
