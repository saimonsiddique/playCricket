import React from "react";

function FlagCard({ team, onSelect, onDeselect, isSelected }) {
  const handleCardClick = () => {
    if (isSelected) {
      onDeselect(team);
    } else {
      onSelect(team);
    }
  };
  return (
    <div
      className={`w-48 bg-white shadow-md rounded-md overflow-hidden 
        hover:cursor-pointer hover:shadow-lg
      ${isSelected ? "border-2 border-indigo-500" : ""}`}
      onClick={handleCardClick}
    >
      <figure className="px-6 py-2">
        <img src={team.flagUrl} alt={team.teamName} className="rounded-lg" />
      </figure>
      <div className="card-body">
        <h2 className="card-title flex justify-center text-2xl font-semibold mb-2 uppercase">
          {team.teamName}
        </h2>
      </div>
    </div>
  );
}

export default FlagCard;
