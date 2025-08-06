# Module 5 Assignment 5A: Code Review

## cs81-module5a-review

### Details

This assignment helps you strengthen your understanding of higher-order functions by studying and commenting on a working JavaScript file. You’ll read a hobby tracking program, explain how it works, and suggest improvements or variations based on your understanding.

## Learning Goals

* Practice reading and explaining real code using `map()`, `filter()`, and `reduce()`
* Build confidence identifying logic and patterns
* Strengthen your ability to spot improvements and reflect on program structure

## Instructions

### 1. Review the Code Below

Copy this code into a file named `hobbyTracker.js` in your GitHub repo.

```

const hobbyLog = [
  { day: "Monday", hobby: "drawing", minutes: 30, mood: "focused" },
  { day: "Tuesday", hobby: "reading", minutes: 20, mood: "relaxed" },
  { day: "Wednesday", hobby: "gaming", minutes: 45, mood: "excited" },
  { day: "Thursday", hobby: "drawing", minutes: 25, mood: "creative" },
  { day: "Friday", hobby: "reading", minutes: 35, mood: "calm" }
];

function totalTime(log) {
  return log.reduce((sum, session) => sum + session.minutes, 0);
}

function uniqueHobbies(log) {
  const names = log.map(entry => entry.hobby);
  return [...new Set(names)];
}

function longSessions(log, minMinutes) {
  return log.filter(entry => entry.minutes > minMinutes);
}

function countMood(log, moodType) {
  return log.filter(entry => entry.mood === moodType).length;
}

console.log("Total time spent:", totalTime(hobbyLog), "minutes");
console.log("Unique hobbies:", uniqueHobbies(hobbyLog));
console.log("Sessions longer than 30 min:", longSessions(hobbyLog, 30));
console.log("Number of relaxed sessions:", countMood(hobbyLog, "relaxed"));
```

### 2. Add Comments

Add at least 10 meaningful comments explaining:

* What each function does
* What each line returns or calculates
* How higher-order functions are being used

### 3. Suggest an Improvement

Find one part of the code that could be improved. Suggest a better function name, reusable code structure, or an added feature. Leave your suggestion as a comment in the file.

### 4. Add a New Test

Write a new `console.log()` line calling an existing function with new inputs. Example:

```
console.log("Focused sessions:", countMood(hobbyLog, "focused"));
  
```

### 5. Write a Reflection

Create a file called `REFLECTION.md` and answer these questions:

* What did you learn from reading and commenting on this code?
* What was the most confusing part?

## Submission Instructions

1. Create a GitHub repo named cs81-module5a-review
2. Include your edited `hobbyTracker.js` and your `REFLECTION.md`
3. Make at least 3 commits with messages like "added comments", "wrote reflection", etc.
4. Submit the GitHub repo link to Canvas
