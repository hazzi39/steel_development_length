import katex from 'katex';

export function renderEquation() {
  const equation = document.getElementById('equation');
  
  katex.render(`L_{sy.t} = \\frac{k_1k_3f_{sy}d_b}{4k_2\\sqrt{f'_c}} \\geq 25k_1d_b`, equation, {
    displayMode: true,
    throwOnError: false
  });
}