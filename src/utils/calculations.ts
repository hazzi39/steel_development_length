import { CalculatorInputs, CalculationResults, CalculationFactors, HookDetails } from '../types';

// Constants
const MIN_DEVELOPMENT_LENGTH = 29;
const BUNDLE_FACTORS = { 
  bundle3: 0.2,  // 20% increase for 3-bar bundle
  bundle4: 0.33  // 33% increase for 4-bar bundle
};
const K7_DEFAULT = 1.25;
const K7_REDUCED = 1.0;
const HOOK_FACTOR = 0.5;  // 0.5L_sy.t for hooks/cogs
const MIN_HOOK_EXTENSION = 70; // minimum 70mm extension

/**
 * Calculate hook details if applicable
 */
const calculateHookDetails = (devLength: number, inputs: CalculatorInputs): HookDetails | undefined => {
  if (!inputs.hasHook || inputs.hookType === 'none') {
    return undefined;
  }

  const horizontalLength = HOOK_FACTOR * devLength;
  const minExtension = Math.max(4 * inputs.barDiameter, MIN_HOOK_EXTENSION);

  let hookDetails: HookDetails;
  
  switch (inputs.hookType) {
    case '180':
      hookDetails = {
        horizontalLength,
        description: "180° bend + extension",
        minExtension,
        minBendDiameter: "Per Clause 17.4.3.2",
        totalLength: horizontalLength + minExtension
      };
      break;
    case '135':
      hookDetails = {
        horizontalLength,
        description: "135° bend + extension",
        minExtension,
        minBendDiameter: "Per Clause 17.4.3.2",
        totalLength: horizontalLength + minExtension
      };
      break;
    case '90cog':
      hookDetails = {
        horizontalLength,
        description: "90° cog bend",
        minExtension,
        maxBendDiameter: 8 * inputs.barDiameter,
        totalLength: horizontalLength + minExtension
      };
      break;
    default:
      return undefined;
  }

  return hookDetails;
};

/**
 * Calculate all development length related values
 */
export const calculateAll = (inputs: CalculatorInputs): CalculationResults => {
  // Calculate k-factors
  const factors = calculateFactors(inputs);
  
  // Calculate basic development length
  const developmentLength = calculateBasicDevLength(inputs, factors);
  
  // Calculate lap length
  const lapLength = calculateLapLength(developmentLength, inputs, factors);
  
  // Calculate bundle adjustments if needed
  const { finalLength, isBundle, bundleType } = calculateBundleLength(lapLength, inputs);
  
  // Calculate hook details if applicable
  const hookData = calculateHookDetails(developmentLength, inputs);

  return {
    developmentLength,
    lapLength,
    finalLength,
    isBundle,
    bundleType: bundleType as 'bundle3' | 'bundle4' | undefined,
    isSlipFormed: inputs.isSlipFormed,
    factors,
    hookData
  };
};

/**
 * Calculate coefficients for development length
 */
const calculateFactors = (inputs: CalculatorInputs): CalculationFactors => {
  const { barDiameter, cd, isHorizontal, hasConcreteBelow, asProvided, asRequired } = inputs;
  
  // Calculate k1 - Bar position factor
  const k1 = (isHorizontal && hasConcreteBelow) ? 1.3 : 1.0;
  
  // Calculate k2 - Bar size factor
  const k2 = (132 - barDiameter) / 100;
  
  // Calculate k3 - Cover factor
  const k3Raw = 1.0 - 0.15 * (cd - barDiameter) / barDiameter;
  const k3 = Math.max(0.7, Math.min(1.0, k3Raw));
  
  // Calculate k7 - Lap length factor
  const k7 = (asProvided >= 2 * asRequired && asRequired > 0) ? K7_REDUCED : K7_DEFAULT;
  
  return { k1, k2, k3, k7 };
};

/**
 * Calculate basic development length
 */
const calculateBasicDevLength = (
  inputs: CalculatorInputs, 
  factors: CalculationFactors
): number => {
  const { barDiameter, yieldStrength, concreteStrength, isSlipFormed } = inputs;
  const { k1, k2, k3 } = factors;
  
  // Cap concrete strength at 65 MPa for calculation
  const effectiveConcreteStrength = Math.min(concreteStrength, 65);
  
  // Basic development length calculation
  const numerator = 0.5 * k1 * k3 * yieldStrength * barDiameter;
  const denominator = k2 * Math.sqrt(effectiveConcreteStrength);
  let Lsytb = numerator / denominator;
  
  // Apply minimum length requirement
  Lsytb = Math.max(Lsytb, MIN_DEVELOPMENT_LENGTH * k1 * barDiameter);
  
  // Apply slip form factor if needed
  return isSlipFormed ? Lsytb * 1.3 : Lsytb;
};

/**
 * Calculate lap splice length
 */
const calculateLapLength = (
  devLength: number, 
  inputs: CalculatorInputs, 
  factors: CalculationFactors
): number => {
  const { elementType, sb, barDiameter } = inputs;
  const { k1, k7 } = factors;
  
  const minLength = MIN_DEVELOPMENT_LENGTH * k1 * barDiameter;
  
  if (elementType === 'wide') {
    // Wide elements (slabs, walls)
    return Math.max(k7 * devLength, minLength);
  } else {
    // Narrow elements (beams, columns)
    // Only apply spacing adjustment if spacing is > 3db
    const effectiveSb = sb <= 3 * barDiameter ? 0 : sb;
    return Math.max(
      minLength,
      k7 * devLength,
      devLength + 1.5 * effectiveSb
    );
  }
};

/**
 * Apply bundle adjustment factors if needed
 */
const calculateBundleLength = (
  lapLength: number, 
  inputs: CalculatorInputs
): { finalLength: number, isBundle: boolean, bundleType?: string } => {
  switch (inputs.spliceType) {
    case 'bundle3':
      return {
        finalLength: lapLength * (1 + BUNDLE_FACTORS.bundle3),
        isBundle: true,
        bundleType: 'bundle3'
      };
    case 'bundle4':
      return {
        finalLength: lapLength * (1 + BUNDLE_FACTORS.bundle4),
        isBundle: true,
        bundleType: 'bundle4'
      };
    default:
      return {
        finalLength: lapLength,
        isBundle: false
      };
  }
};