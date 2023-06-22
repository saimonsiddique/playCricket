import React from "react";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex flex-col w-full">{children}</div>
    </div>
  );
}

export default Layout;
