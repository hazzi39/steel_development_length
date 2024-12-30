export function createCalculator() {
  const form = document.getElementById('calculator-form');
  const inputs = form.querySelectorAll('input, select');

  function calculateK2(db) {
    // AS 5100 specifies k₂ = (130 - db)/100
    return (130 - db) / 100;
  }

  function calculateK3(cd, db) {
    // AS 5100 specifies k₃ = 2.4 - 0.15(cd - db)/db
    const k3 = 2.4 - 0.15 * (cd - db) / db;
    return Math.min(Math.max(k3, 1.0), 2.4);
  }

  function calculateLsyt(db, fc, fsy, k1, k2, k3) {
    // AS 5100 equation: Lsy.t = (k1 * k3 * fsy * db)/(4 * k2 * √f'c)
    const lsyt = (k1 * k3 * fsy * db) / (4 * k2 * Math.sqrt(fc));
    // AS 5100 minimum length requirement is 25k₁dᵦ
    const minLength = 25 * k1 * db;
    return Math.max(lsyt, minLength);
  }

  function validateInputs(values) {
    const errors = {};
    
    if (values.db <= 0) {
      errors.db = 'Bar diameter must be positive';
    }
    
    if (values.fc <= 0 || values.fc > 100) {
      errors.fc = 'Concrete strength must be positive and ≤ 100 MPa';
    }
    
    if (values.fsy <= 0) {
      errors.fsy = 'Steel yield strength must be positive';
    }
    
    if (values.cd <= 0) {
      errors.cd = 'Cover dimension must be positive';
    }

    return errors;
  }

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
  }

  inputs.forEach(input => {
    input.addEventListener('input', updateResults);
  });
}