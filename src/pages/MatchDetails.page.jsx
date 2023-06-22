import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RunTable from "../components/RunTable";
import Layout from "../components/common/Layout";

function MatchDetails() {
  const { uuid } = useParams();
  const [match, setMatch] = useState({});
  const [winner, setWinner] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:8080/matches/${uuid}`).then((res) => {
      setMatch(res.data);
    });
  }, [uuid]);

  useEffect(() => {
    if (match?.totalRun) {
      const team1Run = match?.matchRun.slice(0, 6).reduce((acc, run) => {
        if (run === 0) {
          return acc;
        }
        return acc + run;
      }, 0);
      const team2Run = match?.totalRun - team1Run;
      if (team1Run > team2Run) {
        setWinner(match?.team1?.teamName);
      } else {
        setWinner(match?.team2?.teamName);
      }
    }
  }, [match]);

  return (
    <Layout>
      <div>
        <h1 className="flex justify-center text-4xl font-bold mb-5">
          Match Details
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
          Total Run: <span className="font-bold">{match?.totalRun}</span>
        </p>
        <p className="flex items-center gap-2 justify-center">
          <span className="text-lg font-bold">{winner}</span> won the match
        </p>
      </div>
      <div className="flex justify-center">
        <div style={{ width: "70%" }}>
          <RunTable runs={match?.matchRun} />
        </div>
      </div>
    </Layout>
  );
}

export default MatchDetails;
