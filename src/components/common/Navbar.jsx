import React from "react";

function Navbar() {
  return (
    <nav className="bg-indigo-600">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center text-white">
              <span className="text-2xl font-bold">CricketGame</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
