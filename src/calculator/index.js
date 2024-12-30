import { calculateK2, calculateK3, calculateLsyt } from './calculations.js';
import { validateInputs } from './validation.js';
import { saveResult, getSavedResults } from './storage.js';
import { createResultsTable } from './results-table.js';

export function createCalculator() {
  const form = document.getElementById('calculator-form');
  const inputs = form.querySelectorAll('input, select');
  const savedResultsContainer = document.getElementById('saved-results');

  function updateResults() {
    const values = {
      db: parseFloat(form.db.value),
      fc: parseFloat(form.fc.value),
      fsy: parseFloat(form.fsy.value),
      cd: parseFloat(form.cd.value),
      k1: parseFloat(form.k1.value)
    };

    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

    const errors = validateInputs(values);
    if (Object.keys(errors).length > 0) {
      // Display errors
      Object.entries(errors).forEach(([field, message]) => {
        document.querySelector(`[data-error="${field}"]`).textContent = message;
      });
      return;
    }

    const k2 = calculateK2(values.db);
    const k3 = calculateK3(values.cd, values.db);
    const lsyt = calculateLsyt(values.db, values.fc, values.fsy, values.k1, k2, k3);

    document.getElementById('k2-result').textContent = k2.toFixed(3);
    document.getElementById('k3-result').textContent = k3.toFixed(3);
    document.getElementById('final-result').textContent = `${lsyt.toFixed(1)} mm`;

    // Enable save button when we have valid results
    document.getElementById('save-button').disabled = false;
  }

  function saveCurrentResult() {
    const values = {
      db: parseFloat(form.db.value),
      fc: parseFloat(form.fc.value),
      fsy: parseFloat(form.fsy.value),
      cd: parseFloat(form.cd.value),
      k1: parseFloat(form.k1.value),
      k2: parseFloat(document.getElementById('k2-result').textContent),
      k3: parseFloat(document.getElementById('k3-result').textContent),
      lsyt: parseFloat(document.getElementById('final-result').textContent)
    };

    saveResult(values);
    updateSavedResults();
  }

  function updateSavedResults() {
    const results = getSavedResults();
    if (results.length > 0) {
      savedResultsContainer.innerHTML = createResultsTable(results);
    }
  }

  inputs.forEach(input => {
    input.addEventListener('input', updateResults);
  });

  document.getElementById('save-button').addEventListener('click', saveCurrentResult);

  // Initialize saved results table
  updateSavedResults();
}