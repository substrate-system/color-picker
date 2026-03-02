export function isValidCssColor (value: string): boolean {
    if (!value || typeof value !== 'string') return false
    const option = new Option()
    option.style.color = ''
    option.style.color = value
    return option.style.color !== ''
}

export function sanitizeSwatches (swatches: string[]): string[] {
    return swatches.filter(isValidCssColor)
}
