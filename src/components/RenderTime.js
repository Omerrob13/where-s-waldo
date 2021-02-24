import React, { useState } from 'react';
import firebase from '../firebase';
import 'firebase/firestore';
import 'firebase/database';

import Leaderboard from './Leader-board';

function RenderTime(props) {
  const {
    timeToWin,
    reset,
    btnClass,
    inputClass,
    hideInputs,
    showLeader,
    setShowLeader,
  } = props;
  const [allDocs, setAllDocs] = useState([]);
  const [userNameVal, setUserNameVal] = useState('');

  function handleChange(e) {
    setUserNameVal(e.target.value);
  }

  function onSaveName(e) {
    // display leader
    setShowLeader();
    if (userNameVal === '') {
      alert('not a valid user name');
      return;
    }

    // hide user name input
    hideInputs();
    setUserNameVal('');

    // saving use name and score in data base
    const db = firebase.firestore();
    let usersTimeRef = db.collection('users-times');
    usersTimeRef.add({
      time: timeToWin,
      name: userNameVal,
      id: firebase.firestore.Timestamp.fromDate(new Date()).seconds,
    });

    // get all collection
    let allDocing = [];
    db.collection('users-times')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          allDocing.push(doc.data());
        });

        // sort the collection by time
        allDocing.sort(compare);
        setAllDocs(allDocing);
      });

    function compare(a, b) {
      if (a.time > b.time) {
        return 1;
      } else {
        return -1;
      }
    }
  }

  if (timeToWin > 0) {
    return (
      <div className={'save-user-container'}>
        <h1>You have found Waldo AND Grey Head in {timeToWin} Seconds!</h1>
        <h4 className={'time-header'}>
          Save your name in the top 3 high score tables
        </h4>
        <input
          type="text"
          onChange={handleChange}
          value={userNameVal}
          className={inputClass}
        />
        <button onClick={onSaveName} className={btnClass}>
          Save Name
        </button>

        <Leaderboard allDocs={allDocs} reset={reset} showLeader={showLeader} />
      </div>
    );
  } else {
    return null;
  }
}

export default RenderTime;
