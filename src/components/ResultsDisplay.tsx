import React from 'react';
import { CalculationResults } from '../types';
import { CheckCircle, AlertTriangle } from 'lucide-react';

interface ResultsDisplayProps {
  results: CalculationResults;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  const { developmentLength, lapLength, finalLength, factors, hookData } = results;
  
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Basic Development Length */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
          <h4 className="text-blue-800 text-sm font-medium mb-1">Basic Development Length</h4>
          <p className="text-3xl font-bold text-blue-900">{Math.round(developmentLength)} <span className="text-lg">mm</span></p>
          <p className="text-xs text-blue-700 mt-1">L<sub>sy.tb</sub></p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
          <h4 className="text-blue-800 text-sm font-medium mb-1">Lap Splice Length</h4>
          <p className="text-3xl font-bold text-blue-900">{Math.round(lapLength)} <span className="text-lg">mm</span></p>
          <p className="text-xs text-blue-700 mt-1">L<sub>sy.t.lap</sub></p>
        </div>
        
        <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-4 rounded-lg border border-teal-200">
          <h4 className="text-teal-800 text-sm font-medium mb-1">Final Required Length</h4>
          <p className="text-3xl font-bold text-teal-900">{Math.round(finalLength)} <span className="text-lg">mm</span></p>
          <p className="text-xs text-teal-700 mt-1">{results.isBundle ? "Bundle-adjusted length" : "Design length"}</p>
        </div>
      </div>
      
      {/* Hook Details if applicable */}
      {hookData && (
        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-lg border border-indigo-200 mb-6">
          <h4 className="text-indigo-800 text-sm font-medium mb-3">Hook/Cog Requirements</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-indigo-600">Minimum Horizontal Length</p>
              <p className="text-xl font-bold text-indigo-900">{Math.round(hookData.horizontalLength)} <span className="text-sm">mm</span></p>
            </div>
            <div>
              <p className="text-sm text-indigo-600">Hook Type</p>
              <p className="text-xl font-bold text-indigo-900">{hookData.description}</p>
            </div>
            <div>
              <p className="text-sm text-indigo-600">Minimum Extension</p>
              <p className="text-xl font-bold text-indigo-900">{hookData.minExtension} <span className="text-sm">mm</span></p>
            </div>
            <div>
              <p className="text-sm text-indigo-600">Total Length with Hook</p>
              <p className="text-xl font-bold text-indigo-900">{Math.round(hookData.totalLength)} <span className="text-sm">mm</span></p>
            </div>
          </div>
          {hookData.maxBendDiameter && (
            <div className="mt-3 text-sm text-indigo-700">
              <strong>Maximum Bend Diameter:</strong> {hookData.maxBendDiameter} mm
            </div>
          )}
          {hookData.minBendDiameter && (
            <div className="mt-3 text-sm text-indigo-700">
              <strong>Bend Diameter:</strong> {hookData.minBendDiameter}
            </div>
          )}
        </div>
      )}
      
      {/* Calculation Factors */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="font-medium text-gray-800 mb-3">Calculation Factors</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-slate-700">k<sub>1</sub> - Bar Position Factor</span>
              <span className="font-semibold text-slate-900">{factors.k1.toFixed(2)}</span>
            </div>
            <div className="text-xs text-slate-500">
              {factors.k1 > 1 ? "Horizontal bar with concrete below (1.3)" : "Standard position (1.0)"}
            </div>
          </div>
          
          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-slate-700">k<sub>2</sub> - Bar Size Factor</span>
              <span className="font-semibold text-slate-900">{factors.k2.toFixed(2)}</span>
            </div>
            <div className="text-xs text-slate-500">
              Based on bar diameter: (132 - d<sub>b</sub>)/100
            </div>
          </div>
          
          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-slate-700">k<sub>3</sub> - Cover Factor</span>
              <span className="font-semibold text-slate-900">{factors.k3.toFixed(2)}</span>
            </div>
            <div className="text-xs text-slate-500">
              Based on concrete cover to bar diameter ratio
            </div>
          </div>
        </div>
      </div>
      
      {/* Compliance Checks */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="font-medium text-gray-800 mb-3">Compliance Checks</h4>
        
        <div className="space-y-2">
          <div className="flex items-start gap-2 p-2 rounded">
            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-800">
                Minimum development length requirement
              </p>
              <p className="text-xs text-gray-600">
                The calculated length meets the minimum requirement of 29 * k<sub>1</sub> * d<sub>b</sub>
              </p>
            </div>
          </div>
          
          {results.isSlipFormed && (
            <div className="flex items-start gap-2 p-2 bg-amber-50 rounded">
              <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-800">
                  Slip formed construction factor applied
                </p>
                <p className="text-xs text-gray-600">
                  A 30% increase has been applied due to slip formed construction
                </p>
              </div>
            </div>
          )}
          
          {results.isBundle && (
            <div className="flex items-start gap-2 p-2 bg-blue-50 rounded">
              <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-800">
                  Bundle adjustment factor applied: {results.bundleType === 'bundle3' ? '20%' : '33%'}
                </p>
                <p className="text-xs text-gray-600">
                  Length increased for {results.bundleType === 'bundle3' ? '3-bar' : '4-bar'} bundle as required
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Note about k7 factor */}
      {factors.k7 < 1.25 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-800">
                Reduced lap length factor (k<sub>7</sub>) applied
              </p>
              <p className="text-xs text-green-700">
                Lap length reduced to 1.0 × L<sub>sy.tb</sub> since provided reinforcement area is at least twice the required area.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsDisplay;