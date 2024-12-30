export function validateInputs(values) {
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