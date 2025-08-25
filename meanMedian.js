const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let numbers = [];

console.log("Enter integers one at a time. Type 'q' to finish.");

function askForNumber() {
  rl.question("Enter a number (or 'q' to quit): ", (input) => {
    if (input.toLowerCase() === "q") {
      if (numbers.length === 0) {
        console.log("No numbers were entered. Exiting program.");
        rl.close();
        return;
      }

      let mean = calculateMean(numbers);
      let median = calculateMedian(numbers);

      console.log(`\nNumbers: ${numbers.join(", ")}`);
      console.log(`Mean: ${mean}`);
      console.log(`Median: ${median}`);

      rl.close();
    } else {
      let num = parseInt(input, 10);

      if (isNaN(num)) {
        console.log("❌ Invalid input. Please enter an integer or 'q' to quit.");
      } else {
        numbers.push(num);
      }

      askForNumber();
    }
  });
}

function calculateMean(arr) {
  let sum = arr.reduce((acc, val) => acc + val, 0);
  return (sum / arr.length).toFixed(2);
}

function calculateMedian(arr) {
  let sorted = [...arr].sort((a, b) => a - b);
  let mid = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return ((sorted[mid - 1] + sorted[mid]) / 2).toFixed(2);
  } else {
    
    return sorted[mid].toFixed(2);
  }
}

// Start asking
askForNumber();
