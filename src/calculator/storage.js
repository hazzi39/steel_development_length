export function saveResult(result) {
  const savedResults = getSavedResults();
  savedResults.push({
    ...result,
    timestamp: new Date().toISOString()
  });
  localStorage.setItem('calculationResults', JSON.stringify(savedResults));
}

export function getSavedResults() {
  const saved = localStorage.getItem('calculationResults');
  return saved ? JSON.parse(saved) : [];
}

export function clearSavedResults() {
  localStorage.removeItem('calculationResults');
}