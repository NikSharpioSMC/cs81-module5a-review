// hobbyLog is the source dataset: each object represents one hobby session with day, hobby name, minutes spent, and mood.
const hobbyLog = [
  { day: "Monday", hobby: "drawing", minutes: 30, mood: "focused" },
  { day: "Tuesday", hobby: "reading", minutes: 20, mood: "relaxed" },
  { day: "Wednesday", hobby: "gaming", minutes: 45, mood: "excited" },
  { day: "Thursday", hobby: "drawing", minutes: 25, mood: "creative" },
  { day: "Friday", hobby: "reading", minutes: 35, mood: "calm" }
];

/**
 * totalTime(log):
 * - Purpose: returns the sum of minutes across all sessions in `log`.
 * - Uses Array.prototype.reduce (a higher-order function) to accumulate a total.
 */
function totalTime(log) {
  // reduce takes a callback (higher-order use) and an initial value 0; callback receives running sum and current session
  return log.reduce((sum, session) => sum + session.minutes, 0); // returns a single number (total minutes)
}

/**
 * uniqueHobbies(log):
 * - Purpose: returns an array of unique hobby names found in `log`.
 * - Uses map (to project each entry to its hobby name) and Set (to dedupe), then spreads back to a plain array.
 */
function uniqueHobbies(log) {
  const names = log.map(entry => entry.hobby); // returns array of strings like ["drawing","reading",...]
  return [...new Set(names)]; // Set removes duplicates; spread returns a new array of unique hobby names
}

/**
 * longSessions(log, minMinutes):
 * - Purpose: returns all sessions whose minutes exceed `minMinutes`.
 * - Uses filter (a higher-order function) with a predicate that keeps entries with minutes > minMinutes.
 */
function longSessions(log, minMinutes) {
  return log.filter(entry => entry.minutes > minMinutes); // returns a new array (possibly empty) of matching session objects
}

/**
 * countMood(log, moodType):
 * - Purpose: counts how many sessions match a given mood string.
 * - Uses filter to select entries with entry.mood === moodType, then .length to count them.
 */
function countMood(log, moodType) {
  return log.filter(entry => entry.mood === moodType).length; // returns a number (frequency of moodType)
}

console.log("Total time spent:", totalTime(hobbyLog), "minutes"); // calls totalTime; computes sum of all minutes -> 155

console.log("Unique hobbies:", uniqueHobbies(hobbyLog)); // maps to hobby names, dedupes via Set -> ["drawing","reading","gaming"]

console.log("Sessions longer than 30 min:", longSessions(hobbyLog, 30)); // filters entries with minutes > 30 -> array of 3 sessions

console.log("Number of relaxed sessions:", countMood(hobbyLog, "relaxed")); // filters by mood === "relaxed", returns count -> 1

console.log("Focused sessions:", countMood(hobbyLog, "focused")); // same pattern -> 1

// Composes higher-order functions: filter (to keep only drawing) + totalTime (reduce) to total minutes for one hobby.
console.log("Total time for drawing:", totalTime(hobbyLog.filter(entry => entry.hobby === "drawing")), "minutes"); // -> 55

console.log("Unique hobbies count:", uniqueHobbies(hobbyLog).length); // length of unique array -> 3

console.log("Long sessions count:", longSessions(hobbyLog, 30).length); // count of sessions with minutes > 30 -> 3

// Builds a frequency map by mood using reduce: accumulator object gains counts per mood key.
console.log("Mood counts:", hobbyLog.reduce((acc, entry) => {
  acc[entry.mood] = (acc[entry.mood] || 0) + 1; // for each entry, increment count for its mood
  return acc; // return accumulator for next iteration
}, {})); // initial accumulator is {}; result is an object like {focused:1, relaxed:1, ...}

// Average = total minutes divided by number of unique hobbies; toFixed(2) formats to 2 decimal places (string).
console.log("Average time per hobby:", (totalTime(hobbyLog) / uniqueHobbies(hobbyLog).length).toFixed(2), "minutes"); // -> "51.67"

console.log("Hobby sessions on Monday:", hobbyLog.filter(entry => entry.day === "Monday")); // filter by day -> array of Monday sessions

console.log("Total sessions:", hobbyLog.length); // number of total entries -> 5

// Sort by minutes descending. Uses spread to clone (non-mutating), then sort with a comparator (higher-order callback).
console.log("Hobby log sorted by minutes:", [...hobbyLog].sort((a, b) => b.minutes - a.minutes)); // new array, original remains unchanged

// Sort alphabetically by day using localeCompare on day strings.
console.log("Hobby log sorted by day:", [...hobbyLog].sort((a, b) => a.day.localeCompare(b.day))); // returns new sorted array

// map (higher-order) creates a new array where each element is the original entry plus a derived property moodCount.
console.log("Hobby log with mood counts:", hobbyLog.map(entry => ({
  ...entry, // spread copies existing properties
  moodCount: countMood(hobbyLog, entry.mood) // derived value: how many times this mood appears in the whole log
})));

// map adds a property that is the entire unique hobbies list (same array repeated per element).
console.log("Hobby log with unique hobbies:", hobbyLog.map(entry => ({
  ...entry,
  uniqueHobbies: uniqueHobbies(hobbyLog) // note: computed each time; could be hoisted to avoid recomputation
})));

// Repeats the total time to show that totalTime operates over whole array; returns same 155.
console.log("Total time for all hobbies:", totalTime(hobbyLog), "minutes");

// Length of unique hobbies array -> numeric count.
console.log("Total unique hobbies:", uniqueHobbies(hobbyLog).length);

// Count of sessions longer than threshold -> number.
console.log("Total long sessions:", longSessions(hobbyLog, 30).length);

// Count specific moods by name using countMood helper.
console.log("Total relaxed sessions:", countMood(hobbyLog, "relaxed"));
console.log("Total focused sessions:", countMood(hobbyLog, "focused"));
console.log("Total excited sessions:", countMood(hobbyLog, "excited"));
console.log("Total creative sessions:", countMood(hobbyLog, "creative"));
console.log("Total calm sessions:", countMood(hobbyLog, "calm"));

// Recompute the same average as above; same formula and formatting.
console.log("Average time per hobby:", (totalTime(hobbyLog) / uniqueHobbies(hobbyLog).length).toFixed(2), "minutes");

// Filtering by specific days; each returns an array with the matching entry.
console.log("Hobby sessions on Tuesday:", hobbyLog.filter(entry => entry.day === "Tuesday"));
console.log("Hobby sessions on Wednesday:", hobbyLog.filter(entry => entry.day === "Wednesday"));
console.log("Hobby sessions on Thursday:", hobbyLog.filter(entry => entry.day === "Thursday"));
console.log("Hobby sessions on Friday:", hobbyLog.filter(entry => entry.day === "Friday"));

console.log("Total hobby sessions:", hobbyLog.length); // same as earlier total count

// map composes filter + totalTime to compute per-hobby totals for each row (drawing => 55, reading => 55, gaming => 45).
console.log("Hobby log with total time per hobby:", hobbyLog.map(entry => ({
  ...entry,
  totalTime: totalTime(hobbyLog.filter(e => e.hobby === entry.hobby)) // composition of higher-order functions
})));

// map adds how many unique hobbies exist (same number repeated).
console.log("Hobby log with unique hobbies count:", hobbyLog.map(entry => ({
  ...entry,
  uniqueHobbiesCount: uniqueHobbies(hobbyLog).length
})));

// map adds count of long sessions given a threshold (same number repeated).
console.log("Hobby log with long sessions count:", hobbyLog.map(entry => ({
  ...entry,
  longSessionsCount: longSessions(hobbyLog, 30).length
})));

// Duplicate of moodCount enrichment shown earlier.
console.log("Hobby log with mood counts:", hobbyLog.map(entry => ({
  ...entry,
  moodCount: countMood(hobbyLog, entry.mood)
})));

// Duplicate of unique hobbies enrichment shown earlier.
console.log("Hobby log with unique hobbies:", hobbyLog.map(entry => ({
  ...entry,
  uniqueHobbies: uniqueHobbies(hobbyLog)
})));

// map adds a property with the grand total time (same scalar on each element).
console.log("Hobby log with total time for each hobby:", hobbyLog.map(entry => ({
  ...entry,
  totalTimeForHobby: totalTime(hobbyLog.filter(e => e.hobby === entry.hobby))
})));

// Adds a formatted average per hobby on each element (string due to toFixed).
console.log("Hobby log with average time per hobby:", hobbyLog.map(entry => ({
  ...entry,
  averageTimePerHobby: (totalTime(hobbyLog) / uniqueHobbies(hobbyLog).length).toFixed(2)
})));

// SUGGESTION: The label below says "sessions longer than 30 minutes" but the code computes moodCount.
// Add a reusable helper and use it to align label and computation, and to avoid repeating the filter logic elsewhere.
//
// function longSessionsCount(log, min) { 
//   return log.filter(e => e.minutes > min).length; 
// }
//
console.log("Hobby log with sessions longer than 30 minutes:", hobbyLog.map(entry => ({
  ...entry,
  moodCount: countMood(hobbyLog, entry.mood) // note: label and computation are inconsistent
})));

// Duplicate unique hobbies enrichment.
console.log("Hobby log with unique hobbies:", hobbyLog.map(entry => ({
  ...entry,
  uniqueHobbies: uniqueHobbies(hobbyLog)
})));

// Adds same total time (155) to each entry.
console.log("Hobby log with total time for all hobbies:", hobbyLog.map(entry => ({
  ...entry,
  totalTimeForAllHobbies: totalTime(hobbyLog)
})));

// Adds same unique hobbies count (3) to each entry.
console.log("Hobby log with total unique hobbies:", hobbyLog.map(entry => ({
  ...entry,
  totalUniqueHobbies: uniqueHobbies(hobbyLog).length
})));

// Adds count of long sessions with threshold 33 (2 in this dataset) to each entry.
console.log("Hobby log with total long sessions:", hobbyLog.map(entry => ({
  ...entry,
  totalLongSessions: longSessions(hobbyLog, 33).length
})));

// Same pattern for specific mood tallies; each property repeats the overall count on every row.
console.log("longsession(hobbylog, 33).length Hobby log with total relaxed sessions: ", hobbyLog.map(entry => ({
  ...entry,
  totalRelaxedSessions: countMood(hobbyLog, "relaxed")
})));
console.log("Hobby log with total focused sessions:", hobbyLog.map(entry => ({
  ...entry,
  totalFocusedSessions: countMood(hobbyLog, "focused")
})));
console.log("Hobby log with total excited sessions:", hobbyLog.map(entry => ({
  ...entry,
  totalExcitedSessions: countMood(hobbyLog, "excited")
})));
console.log("Hobby log with total creative sessions:", hobbyLog.map(entry => ({
  ...entry,
  totalCreativeSessions: countMood(hobbyLog, "creative")
})));
console.log("Hobby log with total calm sessions:", hobbyLog.map(entry => ({
  ...entry,
  totalCalmSessions: countMood(hobbyLog, "calm")
})));


