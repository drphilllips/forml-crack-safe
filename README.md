# Forml Crack Safe

**Disclaimer**: It does not work, and I ran out of time. The main logic is in [server/features/crackSafe.ts](https://github.com/drphilllips/forml-crack-safe/blob/main/server/features/crackSafe.ts), where I use an "incrementing mask" strategy.

### Here is the strategy:

0. Create `correct_digits` helper fcn
1. Calculate total num occurences of each digit (0-9)
   a. create all-one-digit masks for each digit
   b. count number of correct digits for each
3. Use an "incrementing mask" to find positions of each digit
   a. e.g., (d000...) -> (dd00...) -> (ddd0...) -> ...
   b. if number of correct digits goes up from previous count, then we found one of the `n` positions for that digit
   c. stop testing incrmenting masks once we find all `n` positions for the digit

### Analysis:

Incrementing mask strategy should run close to **O(n) time** for most cases, where `n` is the total length of the password

**Explanation:**

- if a digit has no occurences, the internal "masking" loop is not run
- if the loop IS run, it only runs until all the occurences are found
- in the worst scenario the inner loop runs `n` times for **just one digit**; then the next digit's inner loop runs for `n-1`, then `n-2` and so on, leading to (n^2 + n) / 2 time; roughly O(n^2) in this worst case
