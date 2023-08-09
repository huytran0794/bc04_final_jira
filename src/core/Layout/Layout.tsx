import React from "react";
/* import react router dom packages */
import { Outlet, useLocation } from "react-router-dom";

/* import local components */
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar/Sidebar";

/* import react router packages */

const Layout = () => {
  let location = useLocation();

  if (location.pathname === "/login" || location.pathname === "/register") {
    return <Outlet />;
  }

  /* write more conditions here if you like */
  return (
    <div className="flex">
      <div className="flex-shrink-0">
        <div className="sticky top-0 left-0">
          <Sidebar />
        </div>
      </div>
      <div className="flex-grow">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
