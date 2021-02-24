import './App.css';
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Image from './components/GameImg';
import Target from './components/Target';
import firebase from './firebase';
import 'firebase/firestore';
import Feedback from './components/Feedback';
import RenderTime from './components/RenderTime';

function App() {
  // set class
  const [targetClassName, setClass] = useState('target hidden');
  const [imageClassName, setImageClassName] = useState('photo');
  const [headerContainerClass, setHeaderContainerClass] = useState(
    'header-container'
  );
  const [saveBtnClass, setSaveBtnClass] = useState('save-btn-user btn');
  const [inputClass, setInputClass] = useState('user-input');
  const [waldoBtn, setWaldoBtn] = useState('btn');
  const [greyHeadBtn, setGreyHeadBtn] = useState('btn');
  const [showLeader, setShowLeader] = useState(false);
  const [figureFound, setFigureFound] = useState(false);

  // user adjustable coordinates
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const [waldoCoor, setWaldoCoor] = useState({});
  const [greayHeadCoor, setGreyHeadCoor] = useState({});
  const [coord, setCoord] = useState({ waldo: false, greyHead: false });

  // if found one of the figuers
  const [isWaldo, setIsWaldo] = useState(false);
  const [isGreyHead, setIsGreyHead] = useState(false);

  // set user true coordinates
  const [userXCoor, setUserXCoor] = useState(0);
  const [userYCoor, setUserYCoor] = useState(0);

  const [loadTimeStamp, setLoadTimeStamp] = useState(0);
  const [FoundAllFiguersTimeStamp, setFoundAllFiguersTimeStamp] = useState(0);
  const [userTimeToWin, setUserTimeToWin] = useState(0);

  // click count to render feedback each click
  const [clickCount, setClickCount] = useState(0);

  function imgClick(e) {
    // show target box
    if (targetClassName === 'target hidden') {
      setClass('target');
    }

    // save user coordintaes on click
    const xCoord = e.clientX;
    const yCoord = e.clientY;

    // set user coordinates in percentage
    setUserXCoor((e.nativeEvent.offsetX / e.target.clientWidth) * 100);
    setUserYCoor((e.nativeEvent.offsetY / e.target.clientHeight) * 100);

    // adjust coordinates for the display box
    let adjustCoordX = xCoord - 30;
    let adjustCoordY = yCoord - 30;

    setX(adjustCoordX);
    setY(adjustCoordY);
  }

  // check if found a figure
  const isFigureCorrecte = figure => {
    // add click count to render feedback
    setClickCount(clickCount + 1);

    // hide target box
    setClass('target hidden');

    switch (figure) {
      case 'waldo':
        if (
          userXCoor > waldoCoor.xMin &&
          userXCoor < waldoCoor.xMax &&
          userYCoor > waldoCoor.yMin &&
          userYCoor < waldoCoor.yMax
        ) {
          if (coord['waldo'] !== true) {
            setIsWaldo(true);
            setFigureFound(true);
            const updateCoordObj = { ...coord, waldo: true };
            // setting old object to the updated one
            setCoord(updateCoordObj);
            setWaldoBtn('hidden');
          }
        } else {
          setFigureFound(false);
        }
        break;

      case 'grey head':
        if (
          userXCoor > greayHeadCoor.xMin &&
          userXCoor < greayHeadCoor.xMax &&
          userYCoor > greayHeadCoor.yMin &&
          userYCoor < greayHeadCoor.yMax
        ) {
          if (coord['greyHead'] !== true) {
            setIsGreyHead(true);
            setFigureFound(true);
            const updateCoordObj = { ...coord, greyHead: true };
            setCoord(updateCoordObj);
            setGreyHeadBtn('hidden');
          }
        } else {
          setFigureFound(false);
        }
        break;
      default:
    }
  };

  // check if found all figuers
  useEffect(() => {
    const ifAllTrue = [];
    for (let property in coord) {
      ifAllTrue.push(coord[property]);
    }

    if (ifAllTrue.every(item => item === true)) {
      setFigureFound(null);
      setFoundAllFiguersTimeStamp(Date.now());
      // hide image, target box and header
      setClass('hidden');
      setImageClassName('hidden');
      setHeaderContainerClass('hidden');
    }
  }, [coord]);

  // get figuers location
  useEffect(() => {
    const db = firebase.firestore();

    let locationWaldoRef = db.collection('location').doc('waldo');
    locationWaldoRef.get().then(doc => {
      setWaldoCoor(doc.data());
    });

    let locationGreyHeadRef = db.collection('location').doc('greyHead');
    locationGreyHeadRef.get().then(doc => {
      setGreyHeadCoor(doc.data());
    });
  }, []);

  // set page load time

  useEffect(() => {
    // setLoadTimeStamp(firebase.firestore.Timestamp.fromDate(new Date()).seconds);
    setLoadTimeStamp(Date.now());
  }, []);

  // set user time till found all figuers
  useEffect(() => {
    setUserTimeToWin((FoundAllFiguersTimeStamp - loadTimeStamp) / 1000);
  }, [FoundAllFiguersTimeStamp]);

  // hide uer name input
  function hideUserInputs() {
    setSaveBtnClass('hidden');
    setInputClass('hidden');
  }

  // show leader board state
  function showLeaderBoard() {
    setShowLeader(true);
  }

  //  reset all states
  function reset() {
    setClass('target hidden');
    setImageClassName('photo');
    setHeaderContainerClass('header-container');
    setX(0);
    setY(0);
    setIsWaldo(false);
    setIsGreyHead(false);
    setLoadTimeStamp(Date.now());
    setCoord({ waldo: false, greyHead: false });
    setFoundAllFiguersTimeStamp(0);
    setUserTimeToWin(0);
    setClickCount(0);
    setSaveBtnClass('save-btn-user btn');
    setInputClass('user-input');
    setWaldoBtn('btn');
    setGreyHeadBtn('btn');
    setShowLeader(false);
    setFigureFound(null);
  }

  return (
    <div>
      <Header headerContainerClass={headerContainerClass} />
      <Feedback
        isWaldo={isWaldo}
        isGreyHead={isGreyHead}
        clickCount={clickCount}
        figureFound={figureFound}
      />
      <RenderTime
        timeToWin={userTimeToWin}
        reset={reset}
        btnClass={saveBtnClass}
        inputClass={inputClass}
        hideInputs={hideUserInputs}
        showLeader={showLeader}
        setShowLeader={showLeaderBoard}
      />

      <Image onImgClick={imgClick} imgClass={imageClassName} />
      <Target
        xCoor={x}
        yCoor={y}
        targetClassName={targetClassName}
        isFigureCorrect={isFigureCorrecte}
        waldoBtn={waldoBtn}
        greyHeadBtn={greyHeadBtn}
      />
    </div>
  );
}

export default App;
