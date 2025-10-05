export interface CalculatorInputs {
  barDiameter: number;         // mm (db)
  yieldStrength: number;       // MPa (fsy)
  concreteStrength: number;    // MPa (f'c)
  cd: number;                  // mm (cd)
  isHorizontal: boolean;
  hasConcreteBelow: boolean;
  elementType: 'wide' | 'narrow';
  spliceType: 'single' | 'bundle3' | 'bundle4';
  sb: number;                  // mm - clear spacing between bars
  asProvided: number;          // mm² - actual reinforcement area
  asRequired: number;          // mm² - required reinforcement area
  isSlipFormed: boolean;
  hasMinTransverseReinforcement: boolean;
  hasHook: boolean;
  hookType: 'none' | '180' | '135' | '90cog';
}

export interface CalculationFactors {
  k1: number;  // Position factor
  k2: number;  // Size factor
  k3: number;  // Cover factor 
  k7: number;  // Lap length factor
}

export interface HookDetails {
  horizontalLength: number;    // Minimum horizontal length
  description: string;         // Description of hook type
  minExtension: number;        // Minimum extension length
  minBendDiameter?: string;    // Minimum bend diameter (for 180° and 135° hooks)
  maxBendDiameter?: number;    // Maximum bend diameter (for 90° cog)
  totalLength: number;         // Total development length including hook
}

export interface CalculationResults {
  developmentLength: number;   // Basic development length
  lapLength: number;           // Lap splice length
  finalLength: number;         // Final required length (inc. bundle factor)
  isBundle: boolean;           // Whether it's a bundle
  bundleType?: 'bundle3' | 'bundle4';  // Type of bundle
  isSlipFormed: boolean;      // Whether slip forming factor is applied
  factors: CalculationFactors; // Calculation factors used
  inputs?: CalculatorInputs;   // Inputs used for this calculation
  hookData?: HookDetails;      // Hook calculation results if applicable
}