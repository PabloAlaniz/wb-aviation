import { describe, it, expect } from 'vitest'
import { isPointInEnvelope, calculateWeightBalance, validateSafetyConditions } from './calculations'

describe('Weight & Balance Calculations', () => {
  describe('isPointInEnvelope', () => {
    it('returns true for point inside rectangular envelope', () => {
      const envelope = [
        { arm: 100, weight: 5000 },
        { arm: 100, weight: 8000 },
        { arm: 120, weight: 8000 },
        { arm: 120, weight: 5000 }
      ]
      expect(isPointInEnvelope(110, 6000, envelope)).toBe(true)
    })

    it('returns false for point outside rectangular envelope (too far forward)', () => {
      const envelope = [
        { arm: 100, weight: 5000 },
        { arm: 100, weight: 8000 },
        { arm: 120, weight: 8000 },
        { arm: 120, weight: 5000 }
      ]
      expect(isPointInEnvelope(95, 6000, envelope)).toBe(false)
    })

    it('returns false for point outside rectangular envelope (too far aft)', () => {
      const envelope = [
        { arm: 100, weight: 5000 },
        { arm: 100, weight: 8000 },
        { arm: 120, weight: 8000 },
        { arm: 120, weight: 5000 }
      ]
      expect(isPointInEnvelope(125, 6000, envelope)).toBe(false)
    })

    it('returns false for point with weight too low', () => {
      const envelope = [
        { arm: 100, weight: 5000 },
        { arm: 100, weight: 8000 },
        { arm: 120, weight: 8000 },
        { arm: 120, weight: 5000 }
      ]
      expect(isPointInEnvelope(110, 4000, envelope)).toBe(false)
    })

    it('returns false for point with weight too high', () => {
      const envelope = [
        { arm: 100, weight: 5000 },
        { arm: 100, weight: 8000 },
        { arm: 120, weight: 8000 },
        { arm: 120, weight: 5000 }
      ]
      expect(isPointInEnvelope(110, 9000, envelope)).toBe(false)
    })

    it('handles irregular polygon envelope (King Air type)', () => {
      const envelope = [
        { arm: 144.7, weight: 6000 },
        { arm: 144.7, weight: 7850 },
        { arm: 152.0, weight: 10100 },
        { arm: 160.0, weight: 10100 },
        { arm: 160.0, weight: 6000 },
        { arm: 144.7, weight: 6000 }
      ]
      // Point inside
      expect(isPointInEnvelope(150, 8000, envelope)).toBe(true)
      // Point outside (too far forward)
      expect(isPointInEnvelope(140, 8000, envelope)).toBe(false)
      // Point outside (too far aft)
      expect(isPointInEnvelope(165, 8000, envelope)).toBe(false)
    })

    it('returns true for point on envelope edge', () => {
      const envelope = [
        { arm: 100, weight: 5000 },
        { arm: 100, weight: 8000 },
        { arm: 120, weight: 8000 },
        { arm: 120, weight: 5000 }
      ]
      // Point exactly on left edge
      expect(isPointInEnvelope(100, 6000, envelope)).toBe(true)
    })
  })

  describe('calculateWeightBalance', () => {
    const mockAircraft = {
      emptyWeight: 6000,
      emptyArm: 150,
      maxWeight: 10000,
      stations: {
        pilot: 140,
        copilot: 140,
        passenger1: 180,
        passenger2: 180,
        passenger3: 200,
        passenger4: 200,
        baggage1: 250,
        baggage2: 280,
        fuel: 155
      },
      cgLimits: {
        forward: 145,
        aft: 160
      },
      cgEnvelope: {
        points: [
          { arm: 145, weight: 6000 },
          { arm: 145, weight: 10000 },
          { arm: 160, weight: 10000 },
          { arm: 160, weight: 6000 }
        ]
      }
    }

    it('calculates empty aircraft correctly', () => {
      const weights = {
        pilot: '0',
        copilot: '0',
        passenger1: '0',
        passenger2: '0',
        passenger3: '0',
        passenger4: '0',
        baggage1: '0',
        baggage2: '0',
        fuel: '0'
      }
      
      const result = calculateWeightBalance(mockAircraft, weights)
      
      expect(result.totalWeight).toBe(6000)
      expect(result.centerOfGravity).toBe(150)
      expect(result.isWeightOk).toBe(true)
      expect(result.isCgOk).toBe(true)
    })

    it('calculates with pilot and copilot', () => {
      const weights = {
        pilot: '180',
        copilot: '170',
        passenger1: '0',
        passenger2: '0',
        passenger3: '0',
        passenger4: '0',
        baggage1: '0',
        baggage2: '0',
        fuel: '0'
      }
      
      const result = calculateWeightBalance(mockAircraft, weights)
      
      expect(result.totalWeight).toBe(6350) // 6000 + 180 + 170
      // CG = (6000*150 + 180*140 + 170*140) / 6350 = (900000 + 25200 + 23800) / 6350 = 149.45
      expect(result.centerOfGravity).toBeCloseTo(149.45, 1)
      expect(result.isWeightOk).toBe(true)
    })

    it('calculates full load scenario', () => {
      const weights = {
        pilot: '180',
        copilot: '170',
        passenger1: '160',
        passenger2: '150',
        passenger3: '140',
        passenger4: '130',
        baggage1: '100',
        baggage2: '80',
        fuel: '1200'
      }
      
      const result = calculateWeightBalance(mockAircraft, weights)
      
      const expectedWeight = 6000 + 180 + 170 + 160 + 150 + 140 + 130 + 100 + 80 + 1200
      expect(result.totalWeight).toBe(expectedWeight) // 8310
      expect(result.centerOfGravity).toBeGreaterThan(145)
      expect(result.centerOfGravity).toBeLessThan(160)
      expect(result.isWeightOk).toBe(true)
    })

    it('detects overweight condition', () => {
      const weights = {
        pilot: '200',
        copilot: '200',
        passenger1: '200',
        passenger2: '200',
        passenger3: '200',
        passenger4: '200',
        baggage1: '200',
        baggage2: '200',
        fuel: '3000' // Way too much
      }
      
      const result = calculateWeightBalance(mockAircraft, weights)
      
      expect(result.totalWeight).toBeGreaterThan(mockAircraft.maxWeight)
      expect(result.isWeightOk).toBe(false)
    })

    it('handles missing/invalid weight inputs', () => {
      const weights = {
        pilot: '',
        copilot: 'invalid',
        passenger1: null,
        passenger2: undefined,
        passenger3: '150',
        passenger4: '0',
        baggage1: '50',
        baggage2: '',
        fuel: '500'
      }
      
      const result = calculateWeightBalance(mockAircraft, weights)
      
      // Should treat invalid/missing as 0
      const expectedWeight = 6000 + 150 + 50 + 500 // Only valid weights
      expect(result.totalWeight).toBe(expectedWeight)
    })

    it('calculates moments correctly', () => {
      const weights = {
        pilot: '200',
        copilot: '0',
        passenger1: '0',
        passenger2: '0',
        passenger3: '0',
        passenger4: '0',
        baggage1: '0',
        baggage2: '0',
        fuel: '0'
      }
      
      const result = calculateWeightBalance(mockAircraft, weights)
      
      expect(result.moments.pilot).toBe(200 * 140) // 28000
      expect(result.moments.copilot).toBe(0)
      expect(result.moments.empty).toBe(6000 * 150) // 900000
      expect(result.totalMoment).toBe(900000 + 28000)
    })

    it('handles zero total weight edge case', () => {
      const zeroAircraft = {
        ...mockAircraft,
        emptyWeight: 0
      }
      
      const weights = {
        pilot: '0', copilot: '0', passenger1: '0', passenger2: '0',
        passenger3: '0', passenger4: '0', baggage1: '0', baggage2: '0', fuel: '0'
      }
      
      const result = calculateWeightBalance(zeroAircraft, weights)
      
      expect(result.totalWeight).toBe(0)
      expect(result.centerOfGravity).toBeNaN() // Division by zero
    })

    it('returns null if aircraft is null/undefined', () => {
      const weights = { pilot: '200' }
      expect(calculateWeightBalance(null, weights)).toBeNull()
      expect(calculateWeightBalance(undefined, weights)).toBeNull()
    })

    it('detects CG out of envelope (too far forward)', () => {
      // Heavy load at front
      const weights = {
        pilot: '250',
        copilot: '250',
        passenger1: '0',
        passenger2: '0',
        passenger3: '0',
        passenger4: '0',
        baggage1: '0',
        baggage2: '0',
        fuel: '0'
      }
      
      const result = calculateWeightBalance(mockAircraft, weights)
      
      // CG should be forward
      expect(result.centerOfGravity).toBeLessThan(150)
    })

    it('detects CG out of envelope (too far aft)', () => {
      // Heavy load at rear
      const weights = {
        pilot: '0',
        copilot: '0',
        passenger1: '0',
        passenger2: '0',
        passenger3: '250',
        passenger4: '250',
        baggage1: '300',
        baggage2: '300',
        fuel: '0'
      }
      
      const result = calculateWeightBalance(mockAircraft, weights)
      
      // CG should be aft
      expect(result.centerOfGravity).toBeGreaterThan(150)
    })
  })

  describe('validateSafetyConditions', () => {
    const mockAircraft = {
      maxWeight: 10000,
      cgLimits: {
        forward: 145,
        aft: 160
      },
      safetyFactors: {
        weightMargin: 0.95,
        cgMargin: 0.5,
        recommendedReserve: {
          weight: 500
        }
      },
      metadata: {
        dataReliability: 'verified-complete'
      }
    }

    it('returns no warnings for safe conditions', () => {
      const result = validateSafetyConditions(mockAircraft, 8000, 152)
      
      expect(result.warnings).toHaveLength(0)
      expect(result.weightPercentage).toBe('80.0')
      expect(result.cgMargins.forward).toBe('7.00')
      expect(result.cgMargins.aft).toBe('8.00')
    })

    it('warns when weight exceeds safety margin', () => {
      const result = validateSafetyConditions(mockAircraft, 9600, 152) // 96% of max
      
      const weightWarning = result.warnings.find(w => w.type === 'weight-warning')
      expect(weightWarning).toBeDefined()
      expect(weightWarning.severity).toBe('medium')
      expect(result.weightPercentage).toBe('96.0')
    })

    it('warns when CG too close to forward limit', () => {
      const result = validateSafetyConditions(mockAircraft, 8000, 145.3) // 0.3" margin
      
      const cgWarning = result.warnings.find(w => w.type === 'cg-forward-warning')
      expect(cgWarning).toBeDefined()
      expect(cgWarning.severity).toBe('high')
      expect(result.cgMargins.forward).toBe('0.30')
    })

    it('warns when CG too close to aft limit', () => {
      const result = validateSafetyConditions(mockAircraft, 8000, 159.6) // 0.4" margin
      
      const cgWarning = result.warnings.find(w => w.type === 'cg-aft-warning')
      expect(cgWarning).toBeDefined()
      expect(cgWarning.severity).toBe('high')
      expect(result.cgMargins.aft).toBe('0.40')
    })

    it('recommends weight reduction when above recommended reserve', () => {
      const result = validateSafetyConditions(mockAircraft, 9700, 152)
      
      const recommendation = result.recommendations.find(r => r.type === 'weight-reserve')
      expect(recommendation).toBeDefined()
      expect(recommendation.message).toContain('200 lbs') // 9700 - 9500
    })

    it('warns about partial data reliability', () => {
      const partialAircraft = {
        ...mockAircraft,
        metadata: {
          dataReliability: 'verified-partial'
        }
      }
      
      const result = validateSafetyConditions(partialAircraft, 8000, 152)
      
      const dataWarning = result.warnings.find(w => w.type === 'data-reliability')
      expect(dataWarning).toBeDefined()
      expect(dataWarning.message).toContain('parcialmente verificados')
    })

    it('warns about estimated data reliability', () => {
      const estimatedAircraft = {
        ...mockAircraft,
        metadata: {
          dataReliability: 'estimated'
        }
      }
      
      const result = validateSafetyConditions(estimatedAircraft, 8000, 152)
      
      const dataWarning = result.warnings.find(w => w.type === 'data-reliability')
      expect(dataWarning).toBeDefined()
      expect(dataWarning.message).toContain('estimados')
    })

    it('can have multiple warnings simultaneously', () => {
      const partialAircraft = {
        ...mockAircraft,
        metadata: {
          dataReliability: 'estimated'
        }
      }
      
      const result = validateSafetyConditions(partialAircraft, 9600, 145.3)
      
      expect(result.warnings.length).toBeGreaterThanOrEqual(2)
      expect(result.warnings.some(w => w.type === 'weight-warning')).toBe(true)
      expect(result.warnings.some(w => w.type === 'cg-forward-warning')).toBe(true)
      expect(result.warnings.some(w => w.type === 'data-reliability')).toBe(true)
    })

    it('calculates correct CG margins', () => {
      const result = validateSafetyConditions(mockAircraft, 8000, 150)
      
      expect(result.cgMargins.forward).toBe('5.00') // 150 - 145
      expect(result.cgMargins.aft).toBe('10.00') // 160 - 150
    })

    it('returns data reliability status', () => {
      const result = validateSafetyConditions(mockAircraft, 8000, 152)
      expect(result.dataReliability).toBe('verified-complete')
    })
  })
})
