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
const heroVariant = useHeroVariant()
</script>

<template>
  <section
      id="hero"
      class="mx-auto grid max-w-[1240px] grid-cols-[1fr_0.8fr] items-center gap-14 px-8 pt-16 pb-[88px] max-[880px]:flex max-[880px]:flex-col max-[880px]:gap-10 max-[880px]:px-5 max-[880px]:pt-10 max-[880px]:pb-16 max-[880px]:text-center"
  >
    <div class="max-[880px]:flex max-[880px]:flex-col max-[880px]:items-center">
      <div class="mb-[22px] inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700">
        <span class="inline-block h-1.5 w-1.5 rounded-full bg-green"/>
        {{ t('landing.launch.nowOnPlay') }}
      </div>

      <h1 class="max-w-[11.5em] text-balance font-display text-[clamp(40px,5.4vw,60px)] font-extrabold leading-[0.95] tracking-[-0.03em]">
        {{ t(`landing.launch.heroes.${heroVariant}.first`) }}
        <span class="text-green">{{ t(`landing.launch.heroes.${heroVariant}.emphasis`) }}</span>
        {{ t(`landing.launch.heroes.${heroVariant}.last`) }}
      </h1>

      <p class="mt-[22px] max-w-[30em] text-pretty text-[19px] leading-[1.55] text-muted max-[880px]:text-[16.5px]">
        {{ t(`landing.launch.heroes.${heroVariant}.description`) }}
      </p>

      <StoreBadges context="landing" class="mt-8 max-[880px]:justify-center"/>

      <p class="mt-[22px] flex max-w-[30em] gap-2 text-sm font-semibold leading-[1.45] text-ink max-[880px]:text-left">
        <svg class="mt-0.5 shrink-0" width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
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

    </div>

    <div class="flex justify-center">
      <PhoneShot/>
    </div>
  </section>
</template>
