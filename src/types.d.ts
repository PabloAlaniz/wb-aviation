/**
 * Domain types for Weight & Balance calculations.
 *
 * These are consumed from JSDoc annotations in the JS source via
 * `import('../types').TypeName`, enabling TypeScript type-checking
 * (`npm run typecheck`) over the safety-critical W&B logic without
 * migrating files to `.ts`.
 */

/** A single vertex of a CG envelope polygon. */
export interface EnvelopePoint {
  arm: number
  weight: number
}

/** Forward/aft CG limits in inches aft of datum. */
export interface CgLimits {
  forward: number
  aft: number
  notes?: string
}

export interface RecommendedReserve {
  fuel: number
  weight: number
}

export interface SafetyFactors {
  /** Fraction of maxWeight that triggers a warning (e.g. 0.95). */
  weightMargin: number
  /** Inches of margin to the CG limits that triggers a warning. */
  cgMargin: number
  recommendedReserve: RecommendedReserve
}

export type DataReliability = "verified-complete" | "verified-partial" | "estimated"

/** Data tied to a specific tail number (shown as a warning in the UI). */
export interface AircraftSpecific {
  registrationExample?: string
  serialNumber?: string
  warning?: string
}

export interface AircraftMetadata {
  manufacturer: string
  productionYears: string
  totalProduced: number
  engines: string
  dataReliability: DataReliability
  sourceDocuments: string[]
  aircraftSpecific?: AircraftSpecific
  /** Other descriptive metadata (tcdsDate, previousHolder, notes, ...). */
  [key: string]: unknown
}

export interface DataValidation {
  lastUpdated?: string
  verifiedAgainst?: string[]
  pendingVerification: string[]
}

export interface CgEnvelope {
  /** Closed polygon (last point repeats the first). */
  points: EnvelopePoint[]
  source?: string
  verificationStatus?: string
}

/** UI configuration for one row of the load form. */
export interface LoadStation {
  key: string
  label: string
  placeholder?: string
  fullWidth?: boolean
  /** Marks a fuel station (burned in flight; removed for zero-fuel weight). */
  isFuel?: boolean
}

/**
 * A supported aircraft. `stations` maps a station key to its arm (inches);
 * non-numeric entries (e.g. `notes`) are ignored by the calculations.
 */
export interface Aircraft {
  name: string
  tcds: string
  emptyWeight: number
  emptyArm: number
  maxWeight: number
  /** Max landing weight (lbs). Optional: only checked when declared. */
  maxLandingWeight?: number
  /** Max zero-fuel weight (lbs). Optional: only checked when declared. */
  maxZeroFuelWeight?: number
  cgLimits: CgLimits
  stations: Record<string, number | string>
  loadStations: LoadStation[]
  cgEnvelope: CgEnvelope
  safetyFactors: SafetyFactors
  metadata: AircraftMetadata
  operationalLimits?: Record<string, unknown>
  variants?: Record<string, unknown>
  dataValidation?: DataValidation
}

/** Weights entered in the form, keyed by station (raw string values). */
export type StationWeights = Record<string, string>

/** Option for the aircraft selector. */
export interface SelectOption {
  value: string
  label: string
}

export interface WeightBalanceResult {
  totalWeight: number
  totalMoment: number
  centerOfGravity: number
  isWeightOk: boolean
  isCgOk: boolean
  maxWeight: number
  cgLimits: CgLimits
}

export interface SafetyIssue {
  type: string
  message: string
  value?: number
  limit?: number
  severity?: "low" | "medium" | "high"
}

export interface SafetyValidation {
  isValid: boolean
  warnings: SafetyIssue[]
  errors: SafetyIssue[]
}

export interface SafetyRecommendation {
  type: string
  message: string
}

export interface SafetyReport {
  warnings: SafetyIssue[]
  recommendations: SafetyRecommendation[]
  weightPercentage: string
  cgMargins: { forward: string; aft: string }
  dataReliability: DataReliability
}

/** Weight and CG of the aircraft at one phase of the flight. */
export interface FlightPhase {
  totalWeight: number
  totalMoment: number
  centerOfGravity: number
  inEnvelope: boolean
}

export interface FlightPhasesResult {
  takeoff: FlightPhase
  /** Takeoff minus the (clamped) planned fuel burn. */
  landing: FlightPhase
  /** Takeoff minus all the loaded fuel. */
  zeroFuel: FlightPhase
  /** Total fuel loaded across fuel stations (lbs). */
  fuelLoaded: number
  /** Effective burn used for landing, clamped to [0, fuelLoaded] (lbs). */
  fuelBurn: number
  /** Burn as requested by the user, before clamping (lbs, >= 0). */
  requestedBurn: number
  burnExceedsFuel: boolean
  hasFuelStation: boolean
}

export interface LandingReport {
  isLandingOk: boolean
  errors: SafetyIssue[]
  warnings: SafetyIssue[]
}
