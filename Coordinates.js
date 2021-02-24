import firebase from '../firebase';
import 'firebase/firestore';

function WaldoCoor() {
  const db = firebase.firestore();

  let locationRef = db.collection('location').doc('waldo');

  let data;
  locationRef.get().then(doc => {
    debugger;
    console.log(doc.data());
    return doc.data();
  });
}

// const db = firebase.firestore();

// let locationRef = db.collection('location');
// locationRef.onSnapshot(querySnapshoe => {
//   const items = [];
//   querySnapshoe.forEach(item => {
//     console.log(item.data());
//   });
// });

// locationRef.get().then(doc => {
//   console.log(doc.data);
//   if (doc.exists) {
//     console.log('document data', doc.data());
//   }
// });

// var loc = db.collection('location');
// var citiesRef = db.collection('cities');

// citiesRef.doc('SF').set({
//   name: 'San Francisco',
//   state: 'CA',
//   country: 'USA',
//   capital: false,
//   population: 860000,
//   regions: ['west_coast', 'norcal'],
// });

// var docRef = db.collection('cities').doc('SF');
// docRef.get().then(doc => {
//   console.log('ss', doc.data());
// });

// reference to acess the tree like strcture
//

// if (
//   xCoord > waldoCoor.xMin &&
//   xCoord < waldoCoor.xMax &&
//   yCoord > waldoCoor.yMin &&
//   yCoord < waldoCoor.yMax
// ) {
//   setIsWaldo(true);
// } else {
//   setIsWaldo(false);
// }

// if click the input - then we run the set Is Waldo Function

// I can maybe have a function that do the math and do conditioanl rendering after each click -
// if its positinve, then positive, if its negative, then negative
//1223
// 729
// 40 for each side -
// so if its between 1180 - 1260, 690 - 770
// export default WaldoCoor;

// ----------------- time stamps ---------------
// const db = firebase.firestore();
// var timeStamp = firebase.firestore.FieldValue.serverTimestamp();
// let b = firebase.firestore.Timestamp.fromDate(new Date());
// b = b.seconds; //// correct one

// db.collection('users').add({
//   first: 'ada',
//   time: b,
// });

// ----------------- renderTime ------------------//
// const { foundWaldoTimeStamp, timeToWin } = props;

// const [timeToFoundWaldo, setTimeToFoundWaldo] = useState(foundWaldoTimeStamp);
// const [overAllTime, setOverAllTime] = useState(0);

// const [count, setCount] = useState(0);
// useEffect(() => {
//   if (props.foundWaldoTimeStamp !== timeToFoundWaldo)
//     setTimeToFoundWaldo(props.foundWaldoTimeStamp);
// });

// useEffect(() => {
//   setOverAllTime(timeToFoundWaldo - props.loadTimeStamp);
// }, [timeToFoundWaldo]);

// useEffect(() => {
//   saveTime();
// }, [overAllTime]);

// function saveTime() {
//   setCount(5);
//   const db = firebase.firestore();
//   let usersTimeRef = db.collection('usersTime');
//   usersTimeRef.add({
//     time: overAllTime,
//   });

/////////// get all collections met a condition ////////
// db.collection('users-time')
//   .where('name', '==', 'maha')
//   .get()
//   .then(querySnapshot => {
//     querySnapshot.forEach(doc => {
//       console.log(doc.data());
//     });
//   });

/////////////// updating documnent ///////////
// const refSomething = db
// .collection('topScores')
// .doc('rankOne')
// .update({ time: 90 });

///////////// compare function /////////////
// useEffect(() => {
//   setAllDocs(prevarray => {
//     function compare(a, b) {
//       if (a.time > b.time) {
//         return 1;
//       } else {
//         return -1;
//       }
//     }
//     prevarray.sort(compare);

//     return prevarray;
//   });
//   setTopRanks(prevArray => {
//     let topThree = [];
//     for (let i = 0; i < 50; i++) {
//       topThree.push(allDocs[i]);
//     }
//     return topThree;
//   });
//   console.log(allDocs);
//   console.log(topRanks);
// }, [allDocs]);
