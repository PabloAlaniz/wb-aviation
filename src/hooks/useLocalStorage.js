import { useState } from "react"

/**
 * useState variant persisted in localStorage.
 * Falls back to initialValue when storage is empty, corrupt or unavailable,
 * and when the stored value fails the optional validator.
 * @template T
 * @param {string} key - localStorage key
 * @param {T} initialValue - Default value
 * @param {(value: unknown) => boolean} [validate] - Optional predicate; stored values that fail it are discarded
 * @returns {[T, (next: T | ((prev: T) => T)) => void, () => void]} - [value, setValue, reset]
 */
export function useLocalStorage(key, initialValue, validate) {
  const [value, setValue] = useState(
    /** @returns {T} */ () => {
      try {
        const stored = window.localStorage.getItem(key)
        if (stored === null) return initialValue
        const parsed = JSON.parse(stored)
        if (validate && !validate(parsed)) return initialValue
        return parsed
      } catch {
        return initialValue
      }
    }
  )

  const setAndStore = (/** @type {T | ((prev: T) => T)} */ next) => {
    setValue((prev) => {
      const resolved =
        typeof next === "function" ? /** @type {(prev: T) => T} */ (next)(prev) : next
      try {
        window.localStorage.setItem(key, JSON.stringify(resolved))
      } catch {
        // storage full or blocked: keep working in memory only
      }
      return resolved
    })
  }

  const reset = () => {
    try {
      window.localStorage.removeItem(key)
    } catch {
      // ignore: nothing to clean if storage is unavailable
    }
    setValue(initialValue)
  }

  return [value, setAndStore, reset]
}
