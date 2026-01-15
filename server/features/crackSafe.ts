import { CrackSafeResponse } from "../../shared/types/crackSafe";

export default function crackSafe(actual_combination: string): CrackSafeResponse {
  let attempts = 0
  const start_time = new Date()

  // 1. Get total amount of each digit
  const num_each_digit = []
  for (let d = 0; d < 10; d++) {
    const digit_mask = Array(10).fill(d).toString()
    num_each_digit.push(correctDigits(actual_combination, digit_mask))
    attempts++
  }

  // 2. Increasing mask strategy
  // Slide a mask across the combo, count correct digits
  // If correct digits goes up from prev, we've found the
  // correct position of that digit
  // Stop once we find the amount of each digit
  const all_digit_positions: Array<Array<number>> = []
  num_each_digit.forEach((n, d) => {
    const this_digit_positions: Array<number> = []
    let found = 0
    let prev_count = 0
    for (let mask_size = 0; mask_size <= 10 && found < n; mask_size++) {
      const digits_arr = Array(mask_size).fill(d)     // e.g., "1111"
      const rest_of_combo = Array(10-mask_size).fill(0)   // e.g., "000000"
      const increasing_mask = [...digits_arr, ...rest_of_combo].toString() // e.g., "1111000000"
      const count_correct = correctDigits(actual_combination, increasing_mask)
      if (count_correct > prev_count) {
        this_digit_positions.push(mask_size - 1)
        found++
      }
      prev_count = count_correct
      attempts++
    }
    all_digit_positions.push(this_digit_positions)
  })

  const end_time = new Date()
  const duration_ms = end_time.getTime() - start_time.getTime()
  const time_taken = duration_ms / 1000

  return { attempts, time_taken }
}

function correctDigits(actual_combination: string, test_combination: string): number {
  const actual_digits = actual_combination.split("")
  const test_digits = test_combination.split("")

  let num_matching = 0
  for (let i = 0; i < 10; i++) {
    if (test_digits[i] === actual_digits[i]) {
      num_matching++
    }
  }

  return num_matching
}