<script setup lang="ts">
// Universal-link landing: a phone with the app installed never sees
// this page, the link opens the paywall directly. Everyone else lands
// here and is sent to the store, campaign parameters preserved.
const {t} = useI18n()

useSeoMeta({
  title: () => t('pro.seo.title'),
  description: () => t('pro.seo.description'),
  ogTitle: () => t('pro.seo.title'),
  ogDescription: () => t('pro.seo.description'),
  ogType: 'website',
  ogSiteName: 'Wordhabit',
  ogUrl: 'https://wordhabit.app/pro',
  ogImage: 'https://wordhabit.app/og-image-v2.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  twitterCard: 'summary_large_image',
  twitterTitle: () => t('pro.seo.title'),
  twitterDescription: () => t('pro.seo.description'),
})

const motion = {
  up: 'animate-sw-up opacity-0 motion-reduce:animate-none motion-reduce:opacity-100',
  d1: '[animation-delay:0.06s]',
  d2: '[animation-delay:0.14s]',
  d3: '[animation-delay:0.22s]',
  d4: '[animation-delay:0.3s]',
} as const

const features = ['quizModes', 'languages', 'streakRepair'] as const
const steps = ['one', 'two', 'three'] as const

const faqItems = computed(() =>
  (['after', 'cancel', 'free'] as const).map((key) => ({
    q: t(`pro.faq.items.${key}.question`),
    a: t(`pro.faq.items.${key}.answer`),
  })),
)
</script>

<template>
  <div class="overflow-hidden">
    <!-- Not AppNav: its links are anchors into the landing sections. -->
    <header class="sticky top-0 z-50 border-b border-line bg-[rgba(247,247,242,0.85)] backdrop-blur-[12px]">
      <div class="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-4 py-3 lg:px-8 lg:py-3.5">
        <AppLogo to="/"/>
        <div class="flex items-center gap-4">
          <NuxtLink to="/" class="hidden text-sm font-medium text-ink-2 transition-colors duration-150 hover:text-green-700 sm:inline">
            {{ t('pro.nav.back') }}
          </NuxtLink>
          <LocaleSwitcher/>
        </div>
      </div>
    </header>

    <!-- Hero -->
    <section
        class="mx-auto grid max-w-[1240px] grid-cols-[1fr_0.85fr] items-center gap-14 px-8 pt-16 pb-[88px] max-[880px]:flex max-[880px]:flex-col max-[880px]:gap-12 max-[880px]:px-5 max-[880px]:pt-10 max-[880px]:pb-16 max-[880px]:text-center"
    >
      <div class="max-[880px]:flex max-[880px]:flex-col max-[880px]:items-center">
        <div :class="['mb-[22px] inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700', motion.up]">
          <span class="inline-block h-1.5 w-1.5 rounded-full bg-green"/>
          {{ t('pro.hero.eyebrow') }}
        </div>

        <h1 :class="['max-w-[11.5em] text-balance font-display text-[clamp(40px,5.4vw,60px)] font-extrabold leading-[0.95] tracking-[-0.03em]', motion.up, motion.d1]">
          {{ t('pro.hero.headingFirst') }}
          <span class="text-green">{{ t('pro.hero.headingEmphasis') }}</span>
        </h1>

        <p :class="['mt-[22px] max-w-[30em] text-pretty text-[19px] leading-[1.55] text-muted max-[880px]:text-[16.5px]', motion.up, motion.d2]">
          {{ t('pro.hero.description') }}
        </p>

        <StoreBadges context="pro_page" :class="['mt-8 max-[880px]:justify-center', motion.up, motion.d3]"/>

        <p :class="['mt-[22px] flex max-w-[30em] gap-2 text-sm font-semibold leading-[1.45] text-ink max-[880px]:text-left', motion.up, motion.d4]">
          <svg class="mt-0.5 shrink-0" width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
            <circle cx="10" cy="10" r="10" fill="var(--color-green)"/>
            <path d="M6 10.2l2.6 2.6L14 7.5" stroke="white" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>{{ t('pro.hero.trialNote') }}</span>
        </p>
      </div>

      <!-- The Pro card, as the app draws it on the profile screen. -->
      <div class="flex justify-center">
        <div
            :class="['relative w-full max-w-[400px] overflow-hidden rounded-[28px] bg-ink p-8 text-white shadow-lg', motion.up, motion.d2]"
            aria-hidden="true"
        >
          <div class="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-green opacity-30 blur-3xl animate-sw-drift"/>
          <div class="pointer-events-none absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-wh-purple opacity-25 blur-3xl animate-sw-drift-reverse"/>

          <div class="relative">
            <div class="flex items-center justify-between">
              <span class="inline-flex items-center gap-1.5 rounded-full bg-white/12 px-3 py-1.5 text-[11px] font-bold tracking-[0.08em] uppercase">
                <span class="inline-block h-1.5 w-1.5 rounded-full bg-green"/>
                {{ t('pro.hero.cardBadge') }}
              </span>
              <span class="font-display text-2xl font-extrabold tracking-[-0.03em]">W</span>
            </div>

            <p class="mt-8 font-display text-[28px] font-extrabold leading-[1.05] tracking-[-0.03em]">
              {{ t('pro.hero.cardTitle') }}
            </p>

            <ul class="mt-6 flex flex-col gap-3.5">
              <li v-for="key in features" :key="key" class="flex items-start gap-3 text-[15px] font-medium leading-[1.4]">
                <svg class="mt-0.5 shrink-0" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                  <circle cx="10" cy="10" r="10" fill="var(--color-green)"/>
                  <path d="M6 10.2l2.6 2.6L14 7.5" stroke="white" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>{{ t(`landing.pricing.rows.${key}`) }}</span>
              </li>
            </ul>

            <div class="mt-8 rounded-[16px] border border-white/12 bg-white/8 px-4 py-3.5 text-[13.5px] leading-[1.45] text-white/85">
              {{ t('pro.hero.cardTrial') }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- What Pro adds -->
    <section class="bg-white px-8 py-24 max-[880px]:px-5 max-[880px]:py-16">
      <div class="mx-auto max-w-[1100px]">
        <LandingSectionHeader
            class="mx-auto mb-14"
            :eyebrow="t('pro.features.eyebrow')"
            :heading-first="t('pro.features.headingFirst')"
            :heading-emphasis="t('pro.features.headingEmphasis')"
            :description="t('pro.features.description')"
        />

        <div class="grid grid-cols-3 gap-5 max-[880px]:grid-cols-1">
          <article
              v-for="key in features"
              :key="key"
              class="rounded-[22px] border border-line bg-paper p-7 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <div class="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-green-100 text-green-700">
              <svg v-if="key === 'quizModes'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M13 2 4 14h7l-1 8 9-12h-7z"/>
              </svg>
              <svg v-else-if="key === 'languages'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="9"/>
                <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>
              </svg>
              <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M12 22c4-2.5 6-5.5 6-9a6 6 0 0 0-3-5.2c0 2-1 3.2-2 3.7C13 9 12 6 9.5 4 9.5 7 6 9 6 13a6 6 0 0 0 6 9z"/>
              </svg>
            </div>
            <h3 class="mb-2.5 font-display text-[21px] font-extrabold leading-[1.15] tracking-[-0.02em] text-ink">
              {{ t(`pro.features.items.${key}.title`) }}
            </h3>
            <p class="text-[15px] leading-[1.6] text-muted">
              {{ t(`pro.features.items.${key}.body`) }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <PricingSection/>

    <!-- The trial, step by step -->
    <section class="bg-white px-8 py-24 max-[880px]:px-5 max-[880px]:py-16">
      <div class="mx-auto max-w-[1100px]">
        <LandingSectionHeader
            class="mx-auto mb-14"
            :eyebrow="t('pro.trial.eyebrow')"
            :heading-first="t('pro.trial.headingFirst')"
            :heading-emphasis="t('pro.trial.headingEmphasis')"
        />

        <ol class="grid grid-cols-3 gap-5 max-[880px]:grid-cols-1">
          <li
              v-for="(key, index) in steps"
              :key="key"
              class="relative rounded-[22px] border border-line bg-paper p-7"
          >
            <span class="mb-5 grid h-10 w-10 place-items-center rounded-full border border-green-100 bg-green-50 font-display text-[15px] font-extrabold text-green-700">
              {{ index + 1 }}
            </span>
            <h3 class="mb-2.5 font-display text-[20px] font-extrabold leading-[1.15] tracking-[-0.02em] text-ink">
              {{ t(`pro.trial.steps.${key}.title`) }}
            </h3>
            <p class="text-[15px] leading-[1.6] text-muted">
              {{ t(`pro.trial.steps.${key}.body`) }}
            </p>
          </li>
        </ol>

        <div class="mt-12">
          <StoreBadges context="pro_page" center/>
        </div>
      </div>
    </section>

    <FaqSection
        id="pro-faq"
        :items="faqItems"
        :eyebrow="t('pro.faq.eyebrow')"
        :heading-first="t('pro.faq.headingFirst')"
        :heading-emphasis="t('pro.faq.headingEmphasis')"
    />

    <FinalCta/>
    <AppFooter/>
  </div>
</template>
