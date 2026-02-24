import { describe, it, expect } from 'vitest'
import {
  isPointInEnvelope,
  calculateMoment,
  calculateCG,
  calculateWeightBalance,
  validateSafetyConditions
} from './calculations'

// Sample aircraft data for testing (King Air E90)
const sampleAircraft = {
  emptyWeight: 6682,
  emptyArm: 151.0415,
  maxWeight: 10100,
  cgLimits: { forward: 144.7, aft: 160.0 },
  stations: {
    pilot: 144.0,
    copilot: 144.0,
    passenger1: 190.0,
    passenger2: 190.0,
    passenger3: 220.0,
    passenger4: 220.0,
    baggage1: 280.0,
    baggage2: 310.0,
    fuel: 154.0
  },
  cgEnvelope: {
    points: [
      { arm: 144.7, weight: 6000 },
      { arm: 144.7, weight: 7850 },
      { arm: 152.0, weight: 10100 },
      { arm: 160.0, weight: 10100 },
      { arm: 160.0, weight: 6000 },
      { arm: 144.7, weight: 6000 }
    ]
  },
  safetyFactors: {
    weightMargin: 0.95,
    cgMargin: 0.1
  }
}

describe('calculateMoment', () => {
  it('should calculate moment correctly', () => {
    expect(calculateMoment(100, 150)).toBe(15000)
  })

  it('should handle zero weight', () => {
    expect(calculateMoment(0, 150)).toBe(0)
  })

  it('should handle zero arm', () => {
    expect(calculateMoment(100, 0)).toBe(0)
  })
})

describe('calculateCG', () => {
  it('should calculate CG correctly', () => {
    expect(calculateCG(15000, 100)).toBe(150)
  })

  it('should handle zero weight (avoid division by zero)', () => {
    expect(calculateCG(15000, 0)).toBe(0)
  })

  it('should handle decimal values', () => {
    expect(calculateCG(1009254.1730, 6682)).toBeCloseTo(151.0415, 2)
  })
})

describe('isPointInEnvelope', () => {
  const envelope = sampleAircraft.cgEnvelope.points

  it('should return true for point inside envelope', () => {
    // Center of envelope
    expect(isPointInEnvelope(152, 8000, envelope)).toBe(true)
  })

  it('should return true for point at valid corner', () => {
    expect(isPointInEnvelope(155, 9000, envelope)).toBe(true)
  })

  it('should return false for point outside envelope (too forward)', () => {
    expect(isPointInEnvelope(140, 8000, envelope)).toBe(false)
  })

  it('should return false for point outside envelope (too aft)', () => {
    expect(isPointInEnvelope(165, 8000, envelope)).toBe(false)
  })

  it('should return false for point outside envelope (too heavy)', () => {
    expect(isPointInEnvelope(155, 12000, envelope)).toBe(false)
  })

  it('should return false for point outside envelope (too light)', () => {
    expect(isPointInEnvelope(155, 5000, envelope)).toBe(false)
  })

  it('should handle edge case: empty envelope', () => {
    expect(isPointInEnvelope(150, 8000, [])).toBe(false)
  })

  it('should handle edge case: null envelope', () => {
    expect(isPointInEnvelope(150, 8000, null)).toBe(false)
  })

  it('should handle edge case: insufficient points', () => {
    expect(isPointInEnvelope(150, 8000, [{ arm: 144, weight: 6000 }])).toBe(false)
  })
})

describe('calculateWeightBalance', () => {
  it('should calculate weight balance with pilot only', () => {
    const weights = {
      pilot: 180,
      copilot: 0,
      passenger1: 0,
      passenger2: 0,
      passenger3: 0,
      passenger4: 0,
      baggage1: 0,
      baggage2: 0,
      fuel: 0
    }

    const result = calculateWeightBalance(sampleAircraft, weights)

    expect(result.totalWeight).toBe(6682 + 180)
    expect(result.centerOfGravity).toBeCloseTo(150.86, 1)
    expect(result.isWeightOk).toBe(true)
  })

  it('should calculate weight balance with full load', () => {
    const weights = {
      pilot: 180,
      copilot: 180,
      passenger1: 160,
      passenger2: 160,
      passenger3: 150,
      passenger4: 150,
      baggage1: 100,
      baggage2: 50,
      fuel: 500
    }

    const result = calculateWeightBalance(sampleAircraft, weights)

    expect(result.totalWeight).toBe(6682 + 180 + 180 + 160 + 160 + 150 + 150 + 100 + 50 + 500)
    expect(result.isWeightOk).toBe(true)
  })

  it('should detect overweight condition', () => {
    const weights = {
      pilot: 200,
      copilot: 200,
      passenger1: 200,
      passenger2: 200,
      passenger3: 200,
      passenger4: 200,
      baggage1: 350,
      baggage2: 350,
      fuel: 2000 // Excessive fuel
    }

    const result = calculateWeightBalance(sampleAircraft, weights)

    expect(result.totalWeight).toBeGreaterThan(sampleAircraft.maxWeight)
    expect(result.isWeightOk).toBe(false)
  })

  it('should handle null aircraft', () => {
    expect(calculateWeightBalance(null, {})).toBeNull()
  })

  it('should handle null weights', () => {
    expect(calculateWeightBalance(sampleAircraft, null)).toBeNull()
  })

  it('should handle string weights (parse correctly)', () => {
    const weights = {
      pilot: '180',
      copilot: '0',
      passenger1: '0',
      passenger2: '0',
      passenger3: '0',
      passenger4: '0',
      baggage1: '0',
      baggage2: '0',
      fuel: '0'
    }

    const result = calculateWeightBalance(sampleAircraft, weights)
    expect(result.totalWeight).toBe(6682 + 180)
  })
})

describe('validateSafetyConditions', () => {
  it('should return valid for normal conditions', () => {
    const result = validateSafetyConditions(sampleAircraft, 8000, 152)

    expect(result.isValid).toBe(true)
    expect(result.errors).toHaveLength(0)
    expect(result.warnings).toHaveLength(0)
  })

  it('should return error for overweight', () => {
    const result = validateSafetyConditions(sampleAircraft, 11000, 152)

    expect(result.isValid).toBe(false)
    expect(result.errors.some(e => e.type === 'weight')).toBe(true)
  })

  it('should return warning for near max weight', () => {
    // 95% of 10100 = 9595
    const result = validateSafetyConditions(sampleAircraft, 9700, 152)

    expect(result.isValid).toBe(true)
    expect(result.warnings.some(w => w.type === 'weight')).toBe(true)
  })

  it('should return error for CG too forward', () => {
    const result = validateSafetyConditions(sampleAircraft, 8000, 140)

    expect(result.isValid).toBe(false)
    expect(result.errors.some(e => e.type === 'cg')).toBe(true)
  })

  it('should return error for CG too aft', () => {
    const result = validateSafetyConditions(sampleAircraft, 8000, 165)

    expect(result.isValid).toBe(false)
    expect(result.errors.some(e => e.type === 'cg')).toBe(true)
  })

  it('should return warning for CG near forward limit', () => {
    // Forward limit is 144.7, margin is 0.1, so 144.75 should trigger warning
    const result = validateSafetyConditions(sampleAircraft, 8000, 144.75)

    expect(result.isValid).toBe(true)
    expect(result.warnings.some(w => w.type === 'cg')).toBe(true)
  })

  it('should return warning for CG near aft limit', () => {
    // Aft limit is 160, margin is 0.1, so 159.95 should trigger warning
    const result = validateSafetyConditions(sampleAircraft, 8000, 159.95)

    expect(result.isValid).toBe(true)
    expect(result.warnings.some(w => w.type === 'cg')).toBe(true)
  })
})
