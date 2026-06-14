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

export interface AircraftMetadata {
  manufacturer?: string
  dataReliability: DataReliability
  /** Other descriptive metadata (engines, production, sources, ...). */
  [key: string]: unknown
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
}

/**
 * A supported aircraft. `stations` maps a station key to its arm (inches);
 * non-numeric entries (e.g. `notes`) are ignored by the calculations.
 */
export interface Aircraft {
  name: string
  tcds?: string
  emptyWeight: number
  emptyArm: number
  maxWeight: number
  cgLimits: CgLimits
  stations: Record<string, number | string>
  loadStations: LoadStation[]
  cgEnvelope: CgEnvelope
  safetyFactors: SafetyFactors
  metadata: AircraftMetadata
  operationalLimits?: Record<string, unknown>
  variants?: Record<string, unknown>
  dataValidation?: Record<string, unknown>
}

/** Weights entered in the form, keyed by station (raw string values). */
export type StationWeights = Record<string, string>

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
