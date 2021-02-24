import React, { useState, useEffect } from 'react';

function Leaderboard(props) {
  // get top 3 scores
  const [topUsers, setTopUsers] = useState([]);
  useEffect(() => {
    let topUsersArr = [];

    for (let i = 0; i < 3; i++) {
      if (props.allDocs[i] !== undefined) {
        topUsersArr.push(props.allDocs[i]);
      }
    }
    setTopUsers(topUsersArr);
  }, [props.allDocs]);

  // reset all states
  function resetTopUsers() {
    props.reset();
  }
  debugger;

  if (props.showLeader) {
    return (
      <div className="leader-board-table">
        <button onClick={resetTopUsers} className={'reset-btn btn'}>
          Reset Game
        </button>
        {topUsers.map((user, index) => {
          return (
            <p className="ranks">
              {index + 1}. Name: {user.name} Time: {user.time} Seconds
            </p>
          );
        })}
      </div>
    );
  } else {
    return (
      <button onClick={resetTopUsers} className={'reset-btn btn'}>
        Reset Game
      </button>
    );
  }
}

export default Leaderboard;
