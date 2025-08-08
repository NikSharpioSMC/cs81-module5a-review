# Reflection

What I learned
- The code demonstrates core higher-order array methods (map, filter, reduce, sort) and how callbacks shape outputs.
- reduce is used both for numeric aggregation (total minutes) and for building a frequency map (moods).
- Composition of higher-order functions (e.g., filter -> reduce) creates expressive, readable data pipelines.
- Immutability is preserved when sorting by cloning with spread before sort.
- Derived values can be computed once and reused (e.g., uniqueHobbies, totals) to avoid repeated work.
- Helper functions (e.g., longSessionsCount, perHobbyTotal) improve clarity and reduce duplication.
- Clear labels are as important as correct logic; logs must match what is computed.
- Adding per-item enrichments shows how to annotate rows with global stats, but it’s better to compute globals once.
- Naming that describes return types (e.g., longSessions vs. longSessionsCount) prevents ambiguity.
- Small utilities (memoization or hoisting constants) can improve performance and readability.

Most confusing part
- A console label claims “sessions longer than 30 minutes” while the code computes moodCount for each entry.
- Many near-duplicate logs that