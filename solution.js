// Lab 4: JavaScript Fundamentals & Git Concepts

// Problem 1: The Strict Type Checker
function checkVariable(input) {
  let type = typeof input;
  if (input === null) {
    return "object";
  }

  switch (type) {
    case "string":
      return "string";
    case "number":
      return "number";
    case "boolean":
      return "boolean";
    case "bigint":
      return "bigint";
    case "undefined":
      return "undefined";
    case "object":
      return "object";
    default:
      return type;
  }
}
//===================================
//Problem 2: Secure ID Generator
//===================================
function generateIDs(count) {
  const ids = [];

  for (let i = 0; i < count; i++) {
    if (i === 5) {
      continue;
    }
    ids.push(`ID-${i}`);
  }

  return ids;
}
// Problem 3: The Functional Sum
function calculateTotal(...numbers) {
  if (numbers.some((n) => typeof n !== "number")) {
    throw new TypeError("Invalid input: All arguments must be numbers");
  }

  return numbers.reduce((sum, n) => sum + n, 0);
}
// Problem 4: Leaderboard Filter
function getTopScorers(playerList) {
  return playerList
    .filter((player) => typeof player.score === "number" && player.score > 8)
    .map((player) => player.name)
    .join(", ");
}
// Problem 5: The Private Inventory
class Item {
  #discount = 0.1;

  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  get finalPrice() {
    return this.price - this.price * this.#discount;
  }
}
// Problem 6: Robust Division
function safeDivide(a, b) {
  try {
    if (b === 0) {
      throw new Error("Cannot divide by zero");
    }
    return a / b;
  } catch (error) {
    return error.message;
  } finally {
    console.log("Operation attempted");
  }
}

// Quick usage examples:
console.log("Problem 1", checkVariable("hello"), checkVariable(7), checkVariable(false), checkVariable(BigInt(2)), checkVariable(undefined), checkVariable({}), checkVariable(null));
console.log("Problem 2", generateIDs(7));
console.log("Problem 3", calculateTotal(1, 2, 3, 4));
try {
  calculateTotal(1, "2", 3);
} catch (e) {
  console.log("Problem 3 error", e.message);
}
const players = [
  { name: "Alice", score: 10 },
  { name: "Bob", score: 5 },
  { name: "Cindy", score: 9 },
  { name: "Dan", score: 12 }
];
console.log("Problem 4", getTopScorers(players));
const sampleItem = new Item("Sample", 100);
console.log("Problem 5", sampleItem.finalPrice);
console.log("Problem 6", safeDivide(10, 2));
console.log("Problem 6 div by 0", safeDivide(10, 0));