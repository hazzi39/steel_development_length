import React, { useState } from 'react';

interface TooltipProps {
  children: React.ReactNode;
  content: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <div className="relative inline-block">
      <div 
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="inline-flex"
      >
        {children}
      </div>
      
      {isVisible && (
        <div className="absolute z-10 w-64 px-3 py-2 text-sm text-white bg-gray-800 rounded-md shadow-lg opacity-95 transition-opacity duration-200 -translate-x-1/2 left-1/2 bottom-full mb-2">
          {content}
          <div className="absolute w-3 h-3 transform rotate-45 bg-gray-800 -bottom-1.5 left-1/2 -ml-1.5"></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;