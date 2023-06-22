import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import FlagCard from "../components/FlagCard";
import Layout from "../components/common/Layout";

function Toss() {
  const location = useLocation();
  const { selectedTeams } = location.state;
  const [selectedTeam, setSelectedTeam] = useState(selectedTeams[0]); // Set initial selected team

  const navigate = useNavigate();

  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
  };

  const handleStartPlay = () => {
    // post request to server
    const newMatch = {
      team1: selectedTeams[0],
      team2: selectedTeams[1],
      tossWinner: selectedTeam,
    };

    axios.post("http://localhost:8080/matches", newMatch).then((res) => {
      navigate(`/play/${res.data.id}`);
    });
  };

  return (
    <Layout>
      <div className="m-auto">
        <div className="flex justify-center">
          <h1 className="text-4xl font-bold mb-5">Select Who will Bowl</h1>
        </div>
        <div className="flex justify-center gap-10">
          {selectedTeams.map((team) => (
            <div key={team.id} className="flex">
              <FlagCard
                team={team}
                onSelect={handleTeamSelect}
                isSelected={selectedTeam && selectedTeam.id === team.id}
              />
              <input
                type="radio"
                id={team.id}
                name="selectedTeam"
                value={team.id}
                checked={selectedTeam && selectedTeam.id === team.id}
                onChange={() => handleTeamSelect(team)}
                className="m-5"
                style={{ transform: "scale(1.5)" }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center m-5">
          <button
            className="btn btn-lg btn-success"
            disabled={!selectedTeam}
            onClick={handleStartPlay}
          >
            Lets Play
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Toss;
