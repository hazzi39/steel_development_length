import { computePosition, flip, shift, offset } from '@floating-ui/dom';

export function setupTooltips() {
  const tooltipElements = document.querySelectorAll('.has-tooltip');

  tooltipElements.forEach(element => {
    const tooltip = element.querySelector('.tooltip');
    
    element.addEventListener('mouseenter', () => {
      computePosition(element, tooltip, {
        placement: 'top',
        middleware: [offset(6), flip(), shift({padding: 5})]
      }).then(({x, y}) => {
        Object.assign(tooltip.style, {
          left: `${x}px`,
          top: `${y}px`
        });
      });
    });
  });
}