// function for creating latency array in difficult condition (p(miss) = .13)
const hardArray = function() {

  let geomArray = [];       // array of random draws from geometric distribution
  let lossesArray = [];     // number of losses per draw from geometric distribution
  let totalTrials = 0;      // total number of game trials given geomArray
  let maxLosingStreak = 3;  // length of longest losing streak given geomArray
  let totalLosses = 0;      // total losses given geomArray
  let rtArray = [];         // array of RTs

  // create random vector of 50 trial outcomes with 6 wins, 6 losses, and no losing streak > 2
  do {
    geomArray = [];
    lossesArray = []
    totalTrials = 0;   
    maxLosingStreak = 3;
    totalLosses = 0;

    // make 6 random draws from geometric distribution
    for (let i = 0; i < 6; i++) {
      let probDraw = (Math.random() * .998) + .001;
      let geomDraw = Math.floor(Math.log(1 - probDraw) / Math.log(1 - .13));
      geomArray.push(geomDraw);
    }

    lossesArray = geomArray.map(x => Math.floor(x/5));
    maxLosingStreak = Math.max(...lossesArray);

    // count total number of trials given geom array
    for (let i = 0; i < geomArray.length; i++) {
      totalTrials += geomArray[i] + 1;
      totalLosses += lossesArray[i];
    }

  } while (totalTrials !== 50 || maxLosingStreak > 2 || totalLosses !== 6 || geomArray[0] == 0);

  for (let i = 0; i < geomArray.length; i++) {
    rtArray.push(...Array(geomArray[i]).fill(225));
    rtArray.push(750);
  }

  return rtArray;
}

// function for creating latency array in easy condition (p(hit) = .5)
const easyArray = function() {

  let geomArray = [];       // array of random draws from geometric distribution
  let totalTrials = 0;      // total number of game trials given geomArray
  let maxLosingStreak = 5;  // length of longest losing streak given geomArray
  let winStreakPass = true; // length of longest winning streak given geomArray
  let rtArray = [];         // array of RTs

  // create random vector of 50 trial outcomes with 6 wins, 6 losses, and no losing streak > 2
  do {
    geomArray = [];
    totalTrials = 0;   
    maxLosingStreak = 5;
    winStreakPass = true;


    // make 6 random draws from geometric distribution
    for (let i = 0; i < 25; i++) {
      let probDraw = (Math.random() * .998) + .001;
      let geomDraw = Math.floor(Math.log(1 - probDraw) / Math.log(1 - .5));
      geomArray.push(geomDraw);
    }

    for (let i = 4; i < 25; i++) {
      let geomSlice = geomArray.slice(i-4, i);
      if (geomSlice.every(x => x == 0)) {
        winStreakPass = false;
      }
    }

    maxLosingStreak = Math.max(...geomArray);

    // count total number of trials given geom array
    for (let i = 0; i < geomArray.length; i++) {
      totalTrials += geomArray[i] + 1;
    }

  } while (totalTrials !== 50 || maxLosingStreak > 4 || !winStreakPass || geomArray[0] == 0);

  for (let i = 0; i < geomArray.length; i++) {
    rtArray.push(...Array(geomArray[i]).fill(225));
    rtArray.push(750);
  }

  return rtArray;
}
