import './style.css';
import { createCalculator } from './calculator/index.js';
import { setupTooltips } from './tooltips.js';
import { renderEquation } from './equation.js';

document.querySelector('#app').innerHTML = `
  <div class="min-h-screen py-8 px-4">
    <div class="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-6">Basic Development Length Calculator (AS 5100)</h1>
      
      <div id="equation" class="mb-6 p-4 bg-gray-50 rounded-lg overflow-x-auto"></div>
      
      <form id="calculator-form" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="input-group">
            <label class="input-label has-tooltip">
              Bar Diameter (dᵦ)
              <span class="tooltip">Diameter of the deformed bar developing stress</span>
            </label>
            <input type="number" name="db" class="input-field" step="0.1" required>
            <div class="error-message" data-error="db"></div>
          </div>

          <div class="input-group">
            <label class="input-label has-tooltip">
              Concrete Strength (f'c)
              <span class="tooltip">Characteristic compressive strength of concrete (≤ 100 MPa)</span>
            </label>
            <input type="number" name="fc" class="input-field" step="0.1" required>
            <div class="error-message" data-error="fc"></div>
          </div>

          <div class="input-group">
            <label class="input-label has-tooltip">
              Steel Yield Strength (fsy)
              <span class="tooltip">Yield strength of reinforcing steel</span>
            </label>
            <input type="number" name="fsy" class="input-field" step="0.1" required>
            <div class="error-message" data-error="fsy"></div>
          </div>

          <div class="input-group">
            <label class="input-label has-tooltip">
              Cover Dimension (cd)
              <span class="tooltip">Cover dimension as shown in Figure 13.1.2.2</span>
            </label>
            <input type="number" name="cd" class="input-field" step="0.1" required>
            <div class="error-message" data-error="cd"></div>
          </div>

          <div class="input-group">
            <label class="input-label has-tooltip">
              k₁ Factor
              <span class="tooltip">1.3 for horizontal bar with >300mm concrete below, 1.0 otherwise</span>
            </label>
            <select name="k1" class="input-field">
              <option value="1.0">1.0 (Default)</option>
              <option value="1.3">1.3 (>300mm concrete below)</option>
            </select>
          </div>
        </div>

        <div class="mt-8 p-4 bg-gray-50 rounded-lg">
          <h2 class="text-lg font-semibold mb-2">Results</h2>
          <div id="results" class="space-y-2">
            <p>k₂: <span id="k2-result" class="result">-</span></p>
            <p>k₃: <span id="k3-result" class="result">-</span></p>
            <p>Basic Development Length (Lsy.t): <span id="final-result" class="result">-</span></p>
          </div>
          <button 
            id="save-button" 
            type="button"
            disabled
            class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Result
          </button>
        </div>
      </form>

      <div id="saved-results" class="mt-8 overflow-x-auto"></div>
    </div>
  </div>
`;

renderEquation();
createCalculator();
setupTooltips();