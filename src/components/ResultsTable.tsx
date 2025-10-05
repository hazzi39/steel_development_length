import React from 'react';
import { CalculationResults } from '../types';

interface ResultsTableProps {
  results: CalculationResults[];
}

const ResultsTable: React.FC<ResultsTableProps> = ({ results }) => {
  if (results.length === 0) {
    return null;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 text-sm">
        <thead>
          <tr className="bg-blue-50">
            <th className="px-4 py-2 text-left text-xs font-medium text-blue-800 border-b border-r">#</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-blue-800 border-b border-r">Bar Dia. (mm)</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-blue-800 border-b border-r">f<sub>sy</sub> (MPa)</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-blue-800 border-b border-r">f'<sub>c</sub> (MPa)</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-blue-800 border-b border-r">Cover (mm)</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-blue-800 border-b border-r">Element</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-blue-800 border-b border-r">Splice Type</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-blue-800 border-b border-r">Dev. Length (mm)</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-blue-800 border-b border-r">Lap Length (mm)</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-blue-800 border-b">Final Length (mm)</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => {
            const { inputs } = result;
            return (
              <tr key={index} className={index % 2 === 1 ? 'bg-slate-50' : ''}>
                <td className="px-4 py-2 border-b border-r">{index + 1}</td>
                <td className="px-4 py-2 border-b border-r">{inputs.barDiameter}</td>
                <td className="px-4 py-2 border-b border-r">{inputs.yieldStrength}</td>
                <td className="px-4 py-2 border-b border-r">{inputs.concreteStrength}</td>
                <td className="px-4 py-2 border-b border-r">{inputs.cd}</td>
                <td className="px-4 py-2 border-b border-r">{inputs.elementType === 'wide' ? 'Wide' : 'Narrow'}</td>
                <td className="px-4 py-2 border-b border-r">
                  {inputs.spliceType === 'single' ? 'Single Bar' : 
                   inputs.spliceType === 'bundle3' ? '3-Bar Bundle' : '4-Bar Bundle'}
                </td>
                <td className="px-4 py-2 border-b border-r font-medium">{result.developmentLength.toFixed(1)}</td>
                <td className="px-4 py-2 border-b border-r font-medium">{result.lapLength.toFixed(1)}</td>
                <td className="px-4 py-2 border-b font-medium text-blue-800">{result.finalLength.toFixed(1)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;