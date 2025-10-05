import React from 'react';
import { CalculatorInputs } from '../types';
import Tooltip from './Tooltip';
import { InfoIcon } from 'lucide-react';

interface InputFormProps {
  inputs: CalculatorInputs;
  errors: Record<string, string>;
  onInputChange: (name: keyof CalculatorInputs, value: any) => void;
}

const InputForm: React.FC<InputFormProps> = ({ inputs, errors, onInputChange }) => {
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>, name: keyof CalculatorInputs) => {
    const value = e.target.value === '' ? '' : parseFloat(e.target.value);
    onInputChange(name, value === '' ? 0 : value);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, name: keyof CalculatorInputs) => {
    onInputChange(name, e.target.checked);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, name: keyof CalculatorInputs) => {
    onInputChange(name, e.target.value);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Bar Properties */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-900">Bar Properties</h4>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="barDiameter" className="text-sm text-gray-700">db</label>
              <Tooltip content="Diameter of the reinforcement bar in millimeters">
                <InfoIcon size={14} className="text-gray-400" />
              </Tooltip>
            </div>
            <div className="mt-1 relative">
              <input
                type="number"
                id="barDiameter"
                value={inputs.barDiameter || ''}
                onChange={(e) => handleNumberChange(e, 'barDiameter')}
                className={`block w-full px-3 py-1.5 text-sm border rounded-md ${errors.barDiameter ? 'border-red-500' : 'border-gray-300'}`}
              />
              <span className="absolute right-3 top-2 text-xs text-gray-500">mm</span>
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="yieldStrength" className="text-sm text-gray-700">fsy</label>
              <Tooltip content="Yield strength of reinforcement">
                <InfoIcon size={14} className="text-gray-400" />
              </Tooltip>
            </div>
            <div className="mt-1 relative">
              <input
                type="number"
                id="yieldStrength"
                value={inputs.yieldStrength || ''}
                onChange={(e) => handleNumberChange(e, 'yieldStrength')}
                className="block w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md"
              />
              <span className="absolute right-3 top-2 text-xs text-gray-500">MPa</span>
            </div>
          </div>
        </div>

        {/* Material Properties */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-900">Material Properties</h4>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="concreteStrength" className="text-sm text-gray-700">f'c</label>
              <Tooltip content="Concrete compressive strength">
                <InfoIcon size={14} className="text-gray-400" />
              </Tooltip>
            </div>
            <div className="mt-1 relative">
              <input
                type="number"
                id="concreteStrength"
                value={inputs.concreteStrength || ''}
                onChange={(e) => handleNumberChange(e, 'concreteStrength')}
                className="block w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md"
              />
              <span className="absolute right-3 top-2 text-xs text-gray-500">MPa</span>
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="cd" className="text-sm text-gray-700">cd</label>
              <Tooltip content="Minimum concrete cover to bar">
                <InfoIcon size={14} className="text-gray-400" />
              </Tooltip>
            </div>
            <div className="mt-1 relative">
              <input
                type="number"
                id="cd"
                value={inputs.cd || ''}
                onChange={(e) => handleNumberChange(e, 'cd')}
                className="block w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md"
              />
              <span className="absolute right-3 top-2 text-xs text-gray-500">mm</span>
            </div>
          </div>
        </div>

        {/* Configuration */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-900">Configuration</h4>
          <div>
            <select
              id="elementType"
              value={inputs.elementType}
              onChange={(e) => handleSelectChange(e, 'elementType')}
              className="block w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md"
            >
              <option value="wide">Wide Element (Slab/Wall)</option>
              <option value="narrow">Narrow Element (Beam/Column)</option>
            </select>
          </div>
          
          <div>
            <select
              id="spliceType"
              value={inputs.spliceType}
              onChange={(e) => handleSelectChange(e, 'spliceType')}
              className="block w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md"
            >
              <option value="single">Single Bar</option>
              <option value="bundle3">3-Bar Bundle</option>
              <option value="bundle4">4-Bar Bundle</option>
            </select>
          </div>
          
          {inputs.hasHook && (
            <div>
              <select
                id="hookType"
                value={inputs.hookType}
                onChange={(e) => handleSelectChange(e, 'hookType')}
                className="block w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md"
              >
                <option value="180">180° Standard Hook</option>
                <option value="135">135° Standard Hook</option>
                <option value="90cog">90° Standard Cog</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={inputs.isHorizontal}
              onChange={(e) => handleCheckboxChange(e, 'isHorizontal')}
              className="h-4 w-4 text-blue-600 rounded border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">Horizontal Reinforcement</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={inputs.hasConcreteBelow}
              onChange={(e) => handleCheckboxChange(e, 'hasConcreteBelow')}
              className="h-4 w-4 text-blue-600 rounded border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">Concrete Below (&gt;300mm)</span>
          </label>
        </div>
        
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={inputs.isSlipFormed}
              onChange={(e) => handleCheckboxChange(e, 'isSlipFormed')}
              className="h-4 w-4 text-blue-600 rounded border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">Slip Formed</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={inputs.hasHook}
              onChange={(e) => handleCheckboxChange(e, 'hasHook')}
              className="h-4 w-4 text-blue-600 rounded border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">Include Hook/Cog</span>
          </label>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={inputs.asProvided || ''}
              onChange={(e) => handleNumberChange(e, 'asProvided')}
              placeholder="Area of steel provided"
              className="block w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md"
            />
            <span className="text-xs text-gray-500">mm²</span>
          </div>
          
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={inputs.asRequired || ''}
              onChange={(e) => handleNumberChange(e, 'asRequired')}
              placeholder="Area of steel required"
              className="block w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md"
            />
            <span className="text-xs text-gray-500">mm²</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputForm;