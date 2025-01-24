// Assumption that the type of n is number

var withNaN = function(fn) {
  return (n) => {
    if(Number.isNaN(n)) return 0;

    return fn(n);
  }
};

// using for loop (or while loop), travel from 1 to n
var sum_to_n_a = withNaN(function(n) {
  let sum = 0;
  let left = 1;
  let right = n;

  if(n < 0) {
    left = right;
    right = 0;
  }

  for(; left <= right; left++) {
    sum += left;
  }

  return sum;
});

// using formula for sum of arithmetic progressions:
var sum_to_n_b = withNaN(function(n) {
  return (Math.abs(n) + 1)*n/2;
});

// using functional programming concept: reduce
var sum_to_n_c = withNaN(function(n) {
  const coefficient = n < 0 ? -1 : 1;
  return Array.from({length: Math.abs(n)}).reduce((sum, _, i) => sum + coefficient*(i + 1), 0);
});

// NOTE: OR WE CAN CARE ABOUT THE SIGN OF RESULT AFTER THE SUMMATION WAS BUILT

// let [MAX_UNDER, MAX_UPPER] = [-100, 100];
//
// console.log('function sum_to_n_a:');
// for(let i = MAX_UNDER; i <= MAX_UPPER; i++) {
//   console.log(i, sum_to_n_a(i)) 
// };
//
// console.log('function sum_to_n_b:');
// for(let i = MAX_UNDER; i <= MAX_UPPER; i++) {
//   console.log(i, sum_to_n_b(i));
// };
//
// console.log('function sum_to_n_c:')
// for(let i = MAX_UNDER; i <= MAX_UPPER; i++) {
//   console.log(i, sum_to_n_c(i));
// }  ;
