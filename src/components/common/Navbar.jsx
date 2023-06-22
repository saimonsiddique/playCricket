import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const handleSelectTeam = () => {
    navigate("/");
  };

  const handleMatches = () => {
    navigate("/matches");
  };

  return (
    <div className="navbar bg-indigo-400 px-10 shadow-lg flex justify-between">
      <a
        className="btn btn-ghost uppercase text-xl"
        onClick={() => navigate("/")}
      >
        Cricket Game
      </a>
      <div>
        <a
          className="btn btn-ghost text-xl uppercase"
          onClick={handleSelectTeam}
        >
          Select Teams
        </a>
        <a className="btn btn-ghost text-xl uppercase" onClick={handleMatches}>
          Matches
        </a>
      </div>
    </div>
  );
}

export default Navbar;
