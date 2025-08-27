const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const inputs = []; 

function ask() {
  rl.question("Enter an integer (or 'q' to quit): ", (raw) => {
    const s = raw.trim();

    // Quit?
    if (s.toLowerCase() === "q") {
      finish();
      return;
    }

    if (!/^[-+]?\d+$/.test(s)) {
      console.error("Error: please enter an integer or 'q' to quit.");
      ask(); 
      return;
    }

    const val = Number(s);
    inputs.push(val);
    ask();
  });
}

ask();

function finish() {
  if (inputs.length === 0) {
    console.log("\nYou entered 0 integers.");
  } else {
    console.log(`\nYou entered ${inputs.length} integer(s): [${inputs.join(", ")}]`);
  }

  const result = findProductTriple(inputs);

  if (result) {
    const { a, b, c } = result;
    console.log(`Condition is met: ${a} x ${b} = ${c}`);
  } else {
    console.log("Condition was not met");
  }

  rl.close();
}

function findProductTriple(arr) {
  if (arr.length < 3) return null;

  const freq = new Map();
  for (const v of arr) freq.set(v, (freq.get(v) || 0) + 1);

  const uniq = Array.from(freq.keys());

  for (let i = 0; i < uniq.length; i++) {
    for (let j = i; j < uniq.length; j++) {
      const a = uniq[i];
      const b = uniq[j];
      const product = a * b;

      if (!freq.has(product)) continue;


      const ca = freq.get(a);
      const cb = freq.get(b);
      const cp = freq.get(product);

      if (a !== b) {
        if (product === a) {
          if (ca >= 2 && cb >= 1) return { a, b, c: product };
        } else if (product === b) {
          if (cb >= 2 && ca >= 1) return { a, b, c: product };
        } else {
          if (ca >= 1 && cb >= 1 && cp >= 1) return { a, b, c: product };
        }
      } else {
        if (product === a) {
          if (ca >= 3) return { a, b, c: product };
        } else {
          if (ca >= 2 && cp >= 1) return { a, b, c: product };
        }
      }
    }
  }
  return null;
}
