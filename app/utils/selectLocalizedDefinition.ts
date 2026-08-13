export interface LocalizedDefinition {
  explanationLanguage: string
  text: string
}

function normalizeLocale(value: string | null | undefined) {
  return value?.trim().toLowerCase().split(/[-_]/)[0] ?? ''
}

export function selectLocalizedDefinition<T extends LocalizedDefinition>(
  definitions: readonly T[] | null | undefined,
  locale: string,
  fallbackLocale = 'en',
): T | null {
  if (!definitions?.length) {
    return null
  }

  const requestedLocale = normalizeLocale(locale)
  const normalizedFallback = normalizeLocale(fallbackLocale)
  const match = (candidate: T) =>
    normalizeLocale(candidate.explanationLanguage) === requestedLocale

  return definitions.find(match)
    ?? definitions.find(
      candidate => normalizeLocale(candidate.explanationLanguage) === normalizedFallback,
    )
    ?? definitions[0]
    ?? null
}
