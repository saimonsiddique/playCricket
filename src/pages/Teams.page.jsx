import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import FlagCard from "../components/FlagCard";
import Layout from "../components/common/Layout";
import { useNavigate } from "react-router-dom";

const Teams = () => {
  const [allTeams, setAllTeams] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);

  const baseURL = "  http://localhost:8080";
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${baseURL}/teams`).then((res) => {
      setAllTeams(res.data);
    });
  }, []);

  const handleTeamSelect = (team) => {
    if (selectedTeams.length < 2) {
      setSelectedTeams((prevSelectedTeams) => [...prevSelectedTeams, team]);
    } else {
      setSelectedTeams((prevSelectedTeams) => [prevSelectedTeams[1], team]);
    }
  };

  const handleTeamDeselect = (team) => {
    setSelectedTeams((prevSelectedTeams) =>
      prevSelectedTeams.filter((selectedTeam) => selectedTeam.id !== team.id)
    );
  };

  const isTeamSelected = (team) => {
    return selectedTeams.some((selectedTeam) => selectedTeam.id === team.id);
  };

  const handleNavigateToToss = () => {
    navigate("/toss", { state: { selectedTeams } });
  };

  return (
    <>
      <Layout>
        <div className="flex flex-col items-center justify-center m-2">
          <h1 className="text-4xl font-bold mb-5">Lets Play Cricket</h1>
        </div>
        <div className="m-auto grid grid-cols-2 gap-4">
          {allTeams.map((team) => (
            <FlagCard
              key={team.id}
              team={team}
              onSelect={handleTeamSelect}
              onDeselect={handleTeamDeselect}
              isSelected={isTeamSelected(team)}
            />
          ))}
        </div>
        <div className="flex justify-center m-5">
          <button
            className="btn btn-lg
        bg-indigo-500 hover:bg-indigo-700 text-white font-bold px-4
        "
            disabled={selectedTeams.length !== 2}
            onClick={handleNavigateToToss}
          >
            Toss
          </button>
        </div>
      </Layout>
    </>
  );
};

export default Teams;
