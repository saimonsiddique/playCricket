import React from "react";

function RunTable({ runs }) {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Over</th>
            <th>Run</th>
          </tr>
        </thead>
        <tbody>
          {runs?.map((run, index) => (
            <tr key={index}>
              <td>
                {Math.floor(index / 6)}.{(index % 6) + 1}
              </td>
              <td>{run}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RunTable;
