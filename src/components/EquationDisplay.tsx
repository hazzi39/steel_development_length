import React from 'react';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const EquationDisplay: React.FC = () => {
  return (
    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg overflow-x-auto">
      <div className="mb-4">
        <h4 className="text-sm font-medium text-slate-700 mb-2">Basic Development Length Formula</h4>
        <div className="flex justify-center py-2">
          <InlineMath math={`L_{sy.tb} = \\frac{0.5 \\cdot k_1 \\cdot k_3 \\cdot f_{sy} \\cdot d_b}{k_2 \\cdot \\sqrt{f'_c}} \\geq 29 \\cdot k_1 \\cdot d_b`} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <h4 className="font-medium text-slate-700 mb-2">Coefficient Definitions</h4>
          <ul className="space-y-2 text-slate-600">
            <li>
              <span className="font-medium">k<sub>1</sub></span>: Bar position factor
              <ul className="list-disc ml-6 mt-1 text-xs">
                <li>1.3 for horizontal reinforcement with &gt;300mm of concrete below</li>
                <li>1.0 for all other cases</li>
              </ul>
            </li>
            <li>
              <span className="font-medium">k<sub>2</sub></span>: Bar size factor
              <ul className="list-disc ml-6 mt-1 text-xs">
                <li>k<sub>2</sub> = (132 - d<sub>b</sub>)/100</li>
                <li>Where d<sub>b</sub> is the bar diameter in mm</li>
              </ul>
            </li>
            <li>
              <span className="font-medium">k<sub>3</sub></span>: Cover factor
              <ul className="list-disc ml-6 mt-1 text-xs">
                <li>k<sub>3</sub> = 1.0 - 0.15(c<sub>d</sub> - d<sub>b</sub>)/d<sub>b</sub></li>
                <li>0.7 ≤ k<sub>3</sub> ≤ 1.0</li>
              </ul>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium text-slate-700 mb-2">Parameter Definitions</h4>
          <ul className="space-y-2 text-slate-600">
            <li><span className="font-medium">f<sub>sy</sub></span>: Yield strength of reinforcement (MPa)</li>
            <li><span className="font-medium">d<sub>b</sub></span>: Bar diameter (mm)</li>
            <li><span className="font-medium">f'<sub>c</sub></span>: Concrete compressive strength (MPa)</li>
            <li><span className="font-medium">c<sub>d</sub></span>: Concrete cover to bar (mm)</li>
          </ul>
          
          <h4 className="font-medium text-slate-700 mt-4 mb-2">Lap Splice Length</h4>
          <ul className="space-y-2 text-slate-600">
            <li>For wide elements: L<sub>sy.t.lap</sub> = k<sub>7</sub> × L<sub>sy.tb</sub></li>
            <li>For narrow elements: L<sub>sy.t.lap</sub> = max(k<sub>7</sub> × L<sub>sy.tb</sub>, L<sub>sy.tb</sub> + 1.5s<sub>b</sub>)</li>
            <li>Where k<sub>7</sub> = 1.25 (standard) or 1.0 (reduced)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EquationDisplay;