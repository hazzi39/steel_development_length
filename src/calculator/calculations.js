// Calculate k₂ factor according to AS 5100
export function calculateK2(db) {
  return (130 - db) / 100;
}

// Calculate k₃ factor according to AS 5100
export function calculateK3(cd, db) {
  const k3 = 2.4 - 0.15 * (cd - db) / db;
  return Math.min(Math.max(k3, 1.0), 2.4);
}

// Calculate basic development length according to AS 5100
export function calculateLsyt(db, fc, fsy, k1, k2, k3) {
  const lsyt = (k1 * k3 * fsy * db) / (4 * k2 * Math.sqrt(fc));
  const minLength = 25 * k1 * db;
  return Math.max(lsyt, minLength);
}