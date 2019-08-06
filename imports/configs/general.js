export const RM_CONVERSION = [null, 100, 95, 91, 88, 85, 83, 81, 79, 77, 75, 73, 72, 70, 69, 68, 66, 65, 64, 63, 62, 61, 60, 59, 58, 57, 56, 55, 54, 53, 52, 51, 49];
export function oneRM(weight, reps) {
  weight = parseFloat(weight);
  reps = parseFloat(reps);
  return weight * 100 / RM_CONVERSION[reps];
}
