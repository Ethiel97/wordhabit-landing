const HERO_VARIANTS = ['a', 'b', 'c'] as const

export type HeroVariant = (typeof HERO_VARIANTS)[number]

/**
 * Returns the persisted hero variant in a normalized form.
 *
 * The pre-launch landing stored uppercase values in the same cookie, so
 * callers must never consume the raw value directly. Keeping the rule here
 * also guarantees that every landing CTA reports the same analytics variant.
 */
export function useHeroVariant() {
  const cookie = useCookie<string>('wh-hero', {default: () => 'a'})

  return computed<HeroVariant>(() => {
    const value = String(cookie.value ?? '').toLowerCase()
    return HERO_VARIANTS.includes(value as HeroVariant)
      ? value as HeroVariant
      : 'a'
  })
}
