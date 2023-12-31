import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RunTable from "../components/RunTable";
import Layout from "../components/common/Layout";

function generateRun() {
  const run = Math.floor(Math.random() * 7);
  if (run === 5 || run === 0) {
    return generateRun();
  }
  return run;
}

function Play() {
  const { uuid } = useParams();
  const [match, setMatch] = useState({});
  const [matchRun, setMatchRun] = useState([]);
  const [totalRun, setTotalRun] = useState(0);

  const baseUrl = "https://play-cricket.onrender.com";

  useEffect(() => {
    axios.get(`/matches/${uuid}`).then((res) => {
      console.log(res.data);
      setMatch(res.data);
    });
  }, [uuid]);

  useEffect(() => {
    if (matchRun.length === 12) {
      axios.patch(`${baseUrl}/matches/${uuid}`, {
        matchRun,
        totalRun,
      });
    }
  }, [matchRun, totalRun, uuid]);

  const handleBowl = () => {
    const run = generateRun();
    setMatchRun([...matchRun, run]);
    setTotalRun(totalRun + run);
  };

  return (
    <Layout>
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
          won the toss and elected to bowl first
        </p>
        <p className="flex items-center gap-2 justify-center">
          Total Run: <span className="font-bold">{totalRun}</span>
        </p>
        <div className="flex items-center gap-2 justify-center">
          {matchRun.length < 12 ? (
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
            <div className="flex flex-col ">
              <p className="flex items-center gap-2 justify-center">
                Match Finished Well done
              </p>
              <button
                className="btn 
          bg-green-500 text-white font-semibold py-2 px-4 rounded
          hover:bg-green-700 hover:text-white
          "
              >
                Full Score
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <div
          className="border-2 rounded-md shadow-lg m-2"
          style={{ width: "70%" }}
        >
          <RunTable runs={matchRun} />
        </div>
      </div>
    </Layout>
  );
}

export default Play;
