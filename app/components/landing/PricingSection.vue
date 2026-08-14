<script setup lang="ts">
const {t} = useI18n()

/**
 * Mirrors the app's own paywall comparison, so the page cannot promise
 * a feature the product does not ship. No price is printed here: the
 * amount comes from the stores per country and is shown in the app
 * before subscribing.
 */
const rows = [
  {key: 'dailyWord', free: true},
  {key: 'flashcards', free: true},
  {key: 'mastery', free: true},
  {key: 'quizModes', free: false},
  {key: 'languages', free: false},
  {key: 'streakRepair', free: false},
] as const
</script>

<template>
  <LandingSection id="pricing">
    <div class="mx-auto max-w-[880px]">
      <LandingSectionHeader
          class="mx-auto mb-12"
          :eyebrow="t('landing.pricing.eyebrow')"
          :heading-first="t('landing.pricing.headingFirst')"
          :heading-emphasis="t('landing.pricing.headingEmphasis')"
          :description="t('landing.pricing.description')"
      />

      <div class="w-full overflow-hidden rounded-[20px] border border-line bg-white">
        <div class="grid grid-cols-[1fr_120px_120px] items-center gap-3 border-b border-line bg-paper px-[22px] py-4 max-[880px]:grid-cols-[1fr_72px_72px] max-[880px]:gap-2 max-[880px]:px-4 max-[880px]:py-3.5">
          <div class="text-[14.5px] leading-[1.45] text-ink-2 max-[880px]:text-[13.5px]"/>
          <div class="flex flex-col items-center gap-1 text-center">
            <span class="text-[15px] font-bold tracking-[-0.01em]">{{ t('landing.pricing.free.name') }}</span>
            <span class="text-[10.5px] font-semibold tracking-[0.03em] text-green-700 uppercase">{{ t('landing.pricing.free.badge') }}</span>
          </div>
          <div class="flex flex-col items-center gap-1 text-center">
            <span class="text-[15px] font-bold tracking-[-0.01em]">{{ t('landing.pricing.pro.name') }}</span>
            <span class="text-[10.5px] font-semibold tracking-[0.03em] text-muted uppercase">{{ t('landing.pricing.pro.badge') }}</span>
          </div>
        </div>

        <div
            v-for="row in rows"
            :key="row.key"
            class="grid grid-cols-[1fr_120px_120px] items-center gap-3 border-t border-line px-[22px] py-4 max-[880px]:grid-cols-[1fr_72px_72px] max-[880px]:gap-2 max-[880px]:px-4 max-[880px]:py-3.5"
        >
          <div class="text-[14.5px] leading-[1.45] text-ink-2 max-[880px]:text-[13.5px]">
            {{ t(`landing.pricing.rows.${row.key}`) }}
          </div>
          <div class="grid place-items-center">
            <span v-if="row.free" class="grid place-items-center" :aria-label="t('landing.pricing.free.name')">
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
            </span>
            <span v-else class="text-base text-muted-2" aria-hidden="true">–</span>
          </div>
          <div class="grid place-items-center">
            <span class="grid place-items-center">
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
            </span>
          </div>
        </div>
      </div>

      <p class="mt-[18px] text-center text-[13px] text-muted">{{ t('landing.pricing.priceNote') }}</p>

      <div class="mt-8">
        <StoreBadges context="landing" center/>
      </div>
    </div>
  </LandingSection>
</template>
