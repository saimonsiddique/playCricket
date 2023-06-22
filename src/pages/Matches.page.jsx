import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Matches() {
  const [allMatches, setAllMatches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [matchesPerPage] = useState(2);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/matches`).then((res) => {
      console.log(res.data);
      setAllMatches(res.data);
    });
  }, []);

  const indexOfLastMatch = currentPage * matchesPerPage;
  const indexOfFirstMatch = indexOfLastMatch - matchesPerPage;
  const currentMatches = allMatches.slice(indexOfFirstMatch, indexOfLastMatch);

  const handleMatchClick = (match) => {
    navigate(`/matches/${match?.id}`);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleDeleteMatch = (match) => {
    axios.delete(`http://localhost:8080/matches/${match.id}`).then((res) => {
      console.log(res.data);
      setAllMatches(allMatches.filter((m) => m.id !== match.id));
    });
  };

  return (
    <>
      <div>
        <h1 className="flex justify-center text-4xl font-bold mb-5">
          All Matches
        </h1>
      </div>
      <div className="flex flex-col w-[70%] m-auto">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>All Match List</th>
                <th>Match Details</th>
                <th>Delete Match Info</th>
              </tr>
            </thead>
            <tbody>
              {currentMatches.map((match, index) => (
                <tr
                  key={index}
                  onClick={() => handleMatchClick(match)}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  <td className="flex gap-2">
                    <span>{match?.team1?.teamName}</span>
                    vs
                    <span>{match?.team2?.teamName}</span>
                  </td>
                  <td>
                    <button
                      className="btn
                    bg-blue-500 text-white font-semibold py-2 px-4 rounded
                    hover:bg-indigo-700 hover:text-white
                  "
                    >
                      Match Details
                    </button>
                  </td>
                  <td>
                    <button
                      style={{ transform: "scale(1.8)" }}
                      className="text-red-500"
                      onClick={() => handleDeleteMatch(match)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-x-circle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="join grid grid-cols-2">
          <button
            className="join-item btn btn-outline"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous page
          </button>
          <button
            className="join-item btn btn-outline"
            onClick={handleNextPage}
            disabled={indexOfLastMatch >= allMatches.length}
          >
            Next page
          </button>
        </div>
      </div>
    </>
  );
}

export default Matches;
