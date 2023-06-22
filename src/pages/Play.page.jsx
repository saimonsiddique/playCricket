import React, { useEffect, useState } from "react";
import RunTable from "../components/RunTable";
import { useParams } from "react-router-dom";
import axios from "axios";

function Play() {
  const { uuid } = useParams();
  const [match, setMatch] = useState({});
  const [matchRun, setMatchRun] = useState([]);
  const [totalRun, setTotalRun] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:8080/matches/${uuid}`).then((res) => {
      console.log(res.data);
      setMatch(res.data);
    });
  }, [uuid]);

  const handleBowl = () => {
    // Increase table row by 1 and add run to total run and update match matchRun
    const run = generateRun();
    setMatchRun([...matchRun, run]);
    setTotalRun(totalRun + run);
    // Update match run
    axios.patch(`http://localhost:8080/matches/${uuid}`, {
      matchRun: matchRun,
      totalRun: totalRun,
    });
  };

  return (
    <div>
      <div>
        <h1 className="flex justify-center text-4xl font-bold mb-5">
          Lets Play Cricket
        </h1>
        <p className="flex items-center gap-2 justify-center">
          <span className="text-lg font-bold">{match?.team1?.teamName}</span>
          vs
          <span className="text-lg font-bold">{match?.team2?.teamName}</span>
        </p>
        <p className="flex items-center gap-2 justify-center">
          <span className="text-lg font-bold">
            {match?.tossWinner?.teamName}
          </span>{" "}
          won the toss and elected to {match?.tossDecision} first
        </p>
        <p className="flex items-center gap-2 justify-center">
          Total Run: <span className="font-bold">{totalRun}</span>
        </p>
        <div className="flex items-center gap-2 justify-center">
          {matchRun.length <= 12 ? (
            <button
              className="btn 
            bg-blue-500 text-white font-semibold py-2 px-4 rounded
            hover:bg-indigo-700 hover:text-white
          "
              onClick={handleBowl}
              disabled={matchRun.length > 12}
            >
              Bowl
            </button>
          ) : (
            <p className="flex items-center gap-2 justify-center">
              Match Finished Well done
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <div style={{ width: "70%" }}>
          <RunTable runs={matchRun} />
        </div>
      </div>
    </div>
  );
}

export default Play;

function generateRun() {
  const run = Math.floor(Math.random() * 6);
  if (run === 5 || run === 0) {
    return generateRun();
  }
  return run;
}
