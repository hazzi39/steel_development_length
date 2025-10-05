import React, { useState } from 'react';
import EquationDisplay from './EquationDisplay';
import InputForm from './InputForm';
import ResultsDisplay from './ResultsDisplay';
import ResultsTable from './ResultsTable';
import { SaveIcon, FileDown, ChevronDown, ChevronRight } from 'lucide-react';
import { CalculatorInputs, CalculationResults } from '../types';
import { calculateAll } from '../utils/calculations';
import { generateDocument } from '../utils/documentGenerator';

const ReinforcementCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    barDiameter: 16,
    yieldStrength: 500,
    concreteStrength: 32,
    cd: 40,
    isHorizontal: true,
    hasConcreteBelow: true,
    elementType: 'wide',
    spliceType: 'single',
    sb: 0,
    asProvided: 0,
    asRequired: 0,
    isSlipFormed: false,
    hasMinTransverseReinforcement: false,
    hasHook: false,
    hookType: 'none'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [savedResults, setSavedResults] = useState<CalculationResults[]>([]);
  const [showEquations, setShowEquations] = useState(false);

  const handleInputChange = (name: keyof CalculatorInputs, value: any) => {
    if (typeof value === 'number' && isNaN(value)) {
      setErrors({...errors, [name]: 'Please enter a valid number'});
      return;
    }
    
    if (errors[name]) {
      const newErrors = {...errors};
      delete newErrors[name];
      setErrors(newErrors);
    }
    
    if (name === 'hasHook' && value === false) {
      setInputs(prev => ({...prev, [name]: value, hookType: 'none'}));
      return;
    }
    
    setInputs(prev => ({...prev, [name]: value}));
  };

  const results = calculateAll(inputs);

  const saveResults = () => {
    setSavedResults(prev => [...prev, {...results, inputs: {...inputs}}]);
  };

  const clearSavedResults = () => {
    setSavedResults([]);
  };

  const handleGenerateDocument = async () => {
    await generateDocument(results, inputs);
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-md">
        {/* Collapsible Equations Section */}
        <button 
          onClick={() => setShowEquations(!showEquations)}
          className="w-full px-6 py-4 flex items-center justify-between text-left border-b border-gray-200 hover:bg-gray-50 transition-colors"
        >
          <div>
            <h3 className="text-lg font-medium text-gray-900">Calculation Formula</h3>
            <p className="text-sm text-gray-500">View the equations and methodology</p>
          </div>
          {showEquations ? <ChevronDown className="h-5 w-5 text-gray-500" /> : <ChevronRight className="h-5 w-5 text-gray-500" />}
        </button>
        
        {showEquations && (
          <div className="p-6 border-b border-gray-200">
            <EquationDisplay />
          </div>
        )}
        
        {/* Input Form */}
        <div className="p-6">
          <InputForm 
            inputs={inputs} 
            errors={errors}
            onInputChange={handleInputChange} 
          />
        </div>
      </div>
      
      {/* Results Display */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Results</h3>
          <div className="flex gap-2">
            <button 
              onClick={handleGenerateDocument}
              className="inline-flex items-center px-3 py-2 border border-green-600 text-sm font-medium rounded-md text-green-600 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <FileDown size={16} className="mr-1.5" />
              Export
            </button>
            <button 
              onClick={saveResults}
              className="inline-flex items-center px-3 py-2 border border-blue-600 text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <SaveIcon size={16} className="mr-1.5" />
              Save
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <ResultsDisplay results={results} />
        </div>
      </div>
      
      {/* Saved Results */}
      {savedResults.length > 0 && (
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Saved Results</h3>
            <button 
              onClick={clearSavedResults}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Clear All
            </button>
          </div>
          <div className="overflow-x-auto">
            <ResultsTable results={savedResults} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReinforcementCalculator;