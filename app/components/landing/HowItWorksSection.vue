<script setup lang="ts">
const {t} = useI18n()

/** The four beats of the app's real daily journey, in order. */
const steps = computed(() => [
  {key: 'discover', icon: 'eye'},
  {key: 'practice', icon: 'cards'},
  {key: 'master', icon: 'brain'},
  {key: 'review', icon: 'clock'},
] as const)
</script>

<template>
  <LandingSection id="how-it-works">
    <div class="mx-auto max-w-[1120px]">
      <LandingSectionHeader
          class="mx-auto mb-14 max-w-[800px] max-[880px]:mb-9"
          :eyebrow="t('landing.howItWorks.eyebrow')"
          :heading-first="t('landing.howItWorks.headingFirst')"
          :heading-emphasis="t('landing.howItWorks.headingEmphasis')"
      />

      <ol class="grid list-none grid-cols-4 gap-6 max-[880px]:mx-auto max-[880px]:flex max-[880px]:max-w-[340px] max-[880px]:flex-col max-[880px]:gap-0">
        <li
            v-for="(step, index) in steps"
            :key="step.key"
            class="text-center max-[880px]:flex max-[880px]:gap-[18px] max-[880px]:pb-7 max-[880px]:text-left"
        >
          <div
              :class="[
                `relative mb-[18px] flex justify-center after:absolute after:top-[27px] after:left-[calc(50%+42px)] after:h-0.5 after:w-[calc(100%-60px)] after:bg-line after:content-[''] max-[880px]:mb-0 max-[880px]:shrink-0 max-[880px]:flex-col max-[880px]:items-center max-[880px]:after:top-[60px] max-[880px]:after:left-1/2 max-[880px]:after:h-[calc(100%-60px)] max-[880px]:after:w-0.5 max-[880px]:after:-translate-x-1/2`,
                {'after:hidden': index === steps.length - 1},
              ]"
          >
            <span class="grid h-14 w-14 place-items-center rounded-full border-2 border-green bg-white text-green-700 shadow-[0_2px_8px_rgba(15,27,18,0.06)]">
              <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                <g v-if="step.icon === 'eye'">
                  <ellipse cx="12" cy="12" rx="9" ry="6" fill="none" stroke="currentColor" stroke-width="1.8"/>
                  <circle cx="12" cy="12" r="2.6" fill="currentColor"/>
                </g>
                <g v-else-if="step.icon === 'cards'" fill="none" stroke="currentColor" stroke-width="1.8">
                  <rect x="7.5" y="3.5" width="12" height="15" rx="2.5" transform="rotate(6 13.5 11)"/>
                  <rect x="4" y="5.5" width="12" height="15" rx="2.5" fill="white"/>
                </g>
                <g v-else-if="step.icon === 'brain'" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
                  <path d="M11 4.5a3.2 3.2 0 0 0-3.2 3.2c-2 .3-3.3 1.7-3.3 3.6 0 1.4.7 2.5 1.8 3.1-.1 2.2 1.4 3.9 3.5 3.9 1.1 0 1.2-.5 1.2-1.2V5.7c0-.7-.3-1.2-1.2-1.2z" transform="translate(1.2 0)"/>
                  <path d="M13 4.5a3.2 3.2 0 0 1 3.2 3.2c2 .3 3.3 1.7 3.3 3.6 0 1.4-.7 2.5-1.8 3.1.1 2.2-1.4 3.9-3.5 3.9-1.1 0-1.2-.5-1.2-1.2V5.7c0-.7.3-1.2 1.2-1.2z" transform="translate(-1.2 0)"/>
                </g>
                <g v-else fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
                  <circle cx="12" cy="12" r="8.5"/>
                  <path d="M12 7.5V12l3.2 2"/>
                </g>
              </svg>
            </span>
          </div>
          <div class="max-[880px]:pt-1.5">
            <h3 class="text-[17px] font-bold tracking-[-0.01em]">{{ t(`landing.howItWorks.steps.${step.key}.title`) }}</h3>
            <p class="mt-2 text-pretty text-[14.5px] leading-[1.55] text-muted">
              {{ t(`landing.howItWorks.steps.${step.key}.description`) }}
            </p>
          </div>
        </li>
      </ol>
    </div>
  </LandingSection>
</template>
