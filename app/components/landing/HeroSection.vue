<script setup lang="ts">
const {t} = useI18n()

/**
 * Launch-mode hero: the real app home screen next to the anti-volume
 * headline, with the Play badge as the single primary action.
 *
 * The three headlines are kept because the cookie can select them, but
 * nothing randomizes it: everyone gets 'a' until we choose to test.
 * `hero_variant` rides along on store-click events so the measurement
 * is already there when we do.
 */
const HERO_VARIANTS = ['a', 'b', 'c'] as const
type HeroVariant = (typeof HERO_VARIANTS)[number]

const heroCookie = useCookie<string>('wh-hero', {default: () => 'a'})

/**
 * Normalized, never trusted raw: the pre-launch hero wrote 'A'|'B'|'C'
 * into this same cookie, and returning visitors still carry it. An
 * unrecognized value would resolve to no translation and print the key.
 */
const heroVariant = computed<HeroVariant>(() => {
  const value = String(heroCookie.value ?? '').toLowerCase()
  return HERO_VARIANTS.includes(value as HeroVariant) ? (value as HeroVariant) : 'a'
})

function scrollToNotify() {
  document.getElementById('ios-notify')?.scrollIntoView({behavior: 'smooth'})
}
</script>

<template>
  <section id="hero" class="hero">
    <div class="copy">
      <div class="pill live">
        <span class="pill-dot"/>
        {{ t('landing.launch.nowOnPlay') }}
      </div>

      <h1 class="display heading">
        {{ t(`landing.launch.heroes.${heroVariant}.first`) }}
        <span class="text-green">{{ t(`landing.launch.heroes.${heroVariant}.emphasis`) }}</span>
        {{ t(`landing.launch.heroes.${heroVariant}.last`) }}
      </h1>

      <p class="sub">{{ t(`landing.launch.heroes.${heroVariant}.description`) }}</p>

      <StoreBadges context="landing" :variant="heroVariant" class="badges"/>

      <p class="free">
        <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
          <circle cx="10" cy="10" r="10" fill="var(--color-green)"/>
          <path
              d="M6 10.2l2.6 2.6L14 7.5"
              stroke="white"
              stroke-width="2.2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
          />
        </svg>
        <span>{{ t('landing.launch.freeForever') }}</span>
      </p>

      <p class="hint">
        {{ t('landing.launch.iphoneHint') }}
        <a href="#ios-notify" @click.prevent="scrollToNotify">
          {{ t('landing.launch.iphoneHintLink') }}
        </a>
      </p>
    </div>

    <div class="shot">
      <PhoneShot/>
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: 1fr 0.8fr;
  gap: 56px;
  align-items: center;
  max-width: 1240px;
  margin: 0 auto;
  padding: 64px 32px 88px;
}

.heading {
  font-size: clamp(40px, 5.4vw, 60px);
  text-wrap: balance;
  max-width: 11.5em;
}

.sub {
  margin-top: 22px;
  font-size: 19px;
  line-height: 1.55;
  color: var(--color-muted);
  max-width: 30em;
  text-wrap: pretty;
}

.badges {
  margin-top: 32px;
}

.free {
  display: flex;
  gap: 8px;
  margin-top: 22px;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-ink);
  line-height: 1.45;
  max-width: 30em;
}

.free svg {
  flex-shrink: 0;
  margin-top: 2px;
}

.hint {
  margin-top: 12px;
  font-size: 13px;
  color: var(--color-muted);
}

.hint a {
  font-weight: 600;
  color: var(--color-green-700);
}

.shot {
  display: flex;
  justify-content: center;
}

.pill-dot {
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background-color: var(--color-green);
  display: inline-block;
}

.pill.live {
  margin-bottom: 22px;
}

.text-green {
  color: var(--color-green);
}

@media (max-width: 880px) {
  .hero {
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding: 40px 20px 64px;
    text-align: center;
  }

  .copy {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .badges {
    justify-content: center;
  }

  .free {
    text-align: left;
  }

  .sub {
    font-size: 16.5px;
  }
}
</style>
