export type InteractionSource = 'pointer' | 'keyboard' | 'programmatic'

export interface SelectionState {
  activeIndex: number | null
  selectedIndex: number | null
  selectedValue: string | null
  lastInteraction: InteractionSource | null
}

export function createSelectionState (): SelectionState {
  return {
    activeIndex: null,
    selectedIndex: null,
    selectedValue: null,
    lastInteraction: null
  }
}

export function clampIndex (index: number, max: number): number {
  if (max < 0) return -1
  if (index < 0) return 0
  if (index > max) return max
  return index
}

export function nextIndex (current: number, delta: number, max: number): number {
  const raw = current + delta
  if (raw < 0) return max
  if (raw > max) return 0
  return raw
}
