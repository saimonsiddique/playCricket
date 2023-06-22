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
    <div className="navbar bg-indigo-200 px-10 shadow-lg">
      <a
        className="btn btn-ghost normal-case text-xl"
        onClick={() => navigate("/")}
      >
        Cricket Game
      </a>
      <a
        className="btn btn-ghost normal-case text-xl"
        onClick={handleSelectTeam}
      >
        Select Teams
      </a>
      <a className="btn btn-ghost normal-case text-xl" onClick={handleMatches}>
        Matches
      </a>
    </div>
  );
}

export default Navbar;
