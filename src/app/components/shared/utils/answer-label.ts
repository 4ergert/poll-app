/** Converts a zero-based answer index to its uppercase alphabetic label. */
export function getAnswerLabel(index: number): string {
  return String.fromCharCode(65 + index);
}
