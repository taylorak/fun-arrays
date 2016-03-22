var dataset = require('./dataset.json');
var bankBalances = dataset.bankBalances;

/*
  create an array with accounts from bankBalances that are
  greater than 100000.00
  assign the resulting array to `hundredThousandairs`
*/
var hundredThousandairs = null;
hundredThousandairs = bankBalances.filter(function(balances) {
  return parseFloat(balances.amount) > 100000;
})

/*
  set a new key for each object in bankBalances named `rounded`
  the value of this key will be the `amount` rounded to the nearest dollar
  example
    {
      "amount": "134758.44",
      "state": "HI",
      "rounded": 134758
    }
  assign the resulting array to `roundedDollar`
*/
var roundedDollar = null;
roundedDollar = bankBalances.map(function(balance) {
    var rounded = Math.round(parseFloat(balance['amount']));
    return {
      amount : balance.amount,
      state : balance.state,
      rounded : rounded
    }
})

/*
  set a the `amount` value for each object in bankBalances
  to the value of `amount` rounded to the nearest 10 cents
  example
    {
      "amount": 134758.4,
      "state": "HI"
    }
  assign the resulting array to `roundedDime`
*/
var roundedDime = null;
roundedDime = bankBalances.map(function(balance) {
  var rounded = Math.round(parseFloat(balance['amount']) * 10.0) / 10.0;
  return {
    amount : rounded,
    state : balance.state
  }
})

// set sumOfBankBalances to the sum of all amounts in bankBalances
var sumOfBankBalances = null;
sumOfBankBalance = bankBalances.reduce(function(prev, balance) {
  return prev + parseFloat(balance.amount);
}, 0)

sumOfBankBalances = Math.round(sumOfBankBalance * 100) / 100;


/*
  set sumOfInterests to the sum of the 18.9% interest
  for all amounts in bankBalances
  in each of the following states
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  the result should be rounded to the nearest cent
 */
var sumOfInterests = null;
sumOfInterests = bankBalances.filter(function(balance) {
  var states = ['WI', 'IL', 'WY', 'OH', 'GA', 'DE']
  return states.indexOf(balance.state) !== -1;
}).reduce(function(prev, balance) {
  return prev + parseFloat(balance.amount) * .189
}, 0)

sumOfInterests = Math.round(sumOfInterests * 100) / 100;



/*
  set sumOfHighInterests to the sum of the 18.9% interest
  for all amounts in bankBalances
  where the amount of the sum of interests in that state is
    greater than 50,000
  in every state except
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  the result should be rounded to the nearest cent
 */
var sumOfHighInterests = null;
var exceptionStates = ['WI', 'IL', 'WY', 'OH', 'GA', 'DE']

var otherStates = bankBalances.reduce(function(states, balance) {
  if(exceptionStates.indexOf(balance.state) === -1 && !states[balance.state]) {
    states[balance.state] = 0;
  }
  return states;
}, {})

sumObj = bankBalances.reduce(function(states, balance) {
  if(exceptionStates.indexOf(balance.state) === -1) {
    states[balance.state] += parseFloat(balance.amount) * .189;
  }
  return states;
}, otherStates)

mappedArr = []
Object.keys(sumObj).map(function(key) {
  mappedArr.push({
    amount : sumObj[key],
    state : key
  })
})

sumOfHighInterests = mappedArr.reduce(function(previous, current) {
  if(current.amount > 50000) {
    previous += current.amount;
  }
  return previous;
}, 0)

sumOfHighInterests = Math.round(sumOfHighInterests * 100) / 100;


/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table
    where the key is the two letter state abbreviation
    and the value is the sum of all amounts from that state
      the value must be rounded to the nearest cent
 */
var stateSums = null;
stateSums = bankBalances.reduce(function(states, balance) {
  if(states[balance.state]) {
    states[balance.state] += parseFloat(balance.amount)
  } else {
    states[balance.state] = parseFloat(balance.amount);
  }
  states[balance.state] = Math.round(parseFloat(states[balance.state]) * 100) / 100
  return states;
}, {})

/*
  set lowerSumStates to an array containing
  only the two letter state abbreviation of each state
  where the sum of amounts in the state is
    less than 1,000,000
 */
var lowerSumStates = null;
var allStates = bankBalances.reduce(function(states, balance) {
  if(states[balance.state]) {
    states[balance.state] += parseFloat(balance.amount)
  } else {
    states[balance.state] = parseFloat(balance.amount);
  }
  states[balance.state] = Math.round(parseFloat(states[balance.state]) * 100) / 100
  return states;
}, {})

lowerSumStates = Object.keys(allStates).reduce(function(lowerStates, state) {
  if(allStates[state] < 1000000) {
    lowerStates.push(state);
  }
  return lowerStates;
}, [])

/*
  set higherStateSums to be the sum of
    all amounts of every state
    where the sum of amounts in the state is
      greater than 1,000,000
 */
var higherStateSums = null;
// var allStates = bankBalances.reduce(function(states, balance) {
//   if(states[balance.state]) {
//     states[balance.state] += parseFloat(balance.amount)
//   } else {
//     states[balance.state] = parseFloat(balance.amount);
//   }
//   states[balance.state] = Math.round(parseFloat(states[balance.state]) * 100) / 100
//   return states;
// }, {})

higherStateSums = Object.keys(allStates).reduce(function(higherStates, state) {
  if(allStates[state] > 1000000) {
    higherStates += allStates[state];
  }
  return higherStates;
}, 0)

/*
  set areStatesInHigherStateSum to be true if
    all of these states have a sum of account values
      greater than 2,550,000
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  false otherwise
 */
var areStatesInHigherStateSum = null;
allStates = bankBalances.filter(function(balance) {
  var states = ['WI', 'IL', 'WY', 'OH', 'GA', 'DE']
  return states.indexOf(balance.state) !== -1;
}).reduce(function(states, balance) {
  if(states[balance.state]) {
    states[balance.state] += parseFloat(balance.amount)
  } else {
    states[balance.state] = parseFloat(balance.amount);
  }
  states[balance.state] = Math.round(parseFloat(states[balance.state]) * 100) / 100
  return states;
}, {})
console.log(allStates);

areStatesInHigherStateSum = Object.keys(allStates).every(function(state) {
  if(allStates[state] > 2550000) {
    return true;
  }
  return false;
})




/*
  set anyStatesInHigherStateSum to be true if
    any of these states have a sum of account values
      greater than 2,550,000
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  false otherwise
 */
var anyStatesInHigherStateSum = null;
anyStatesInHigherStateSum = Object.keys(allStates).some(function(state) {
  if(allStates[state] > 2550000) {
    return true;
  }
  return false;
})

module.exports = {
  hundredThousandairs : hundredThousandairs,
  roundedDollar : roundedDollar,
  roundedDime : roundedDime,
  sumOfBankBalances : sumOfBankBalances,
  sumOfInterests : sumOfInterests,
  sumOfHighInterests : sumOfHighInterests,
  stateSums : stateSums,
  lowerSumStates : lowerSumStates,
  higherStateSums : higherStateSums,
  areStatesInHigherStateSum : areStatesInHigherStateSum,
  anyStatesInHigherStateSum : anyStatesInHigherStateSum
};