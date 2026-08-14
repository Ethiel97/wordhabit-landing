<script setup lang="ts">
const {t} = useI18n()

/** The three learning languages the app ships, with a sample word. */
const languages = [
  {code: 'EN', name: 'English', colorClass: 'bg-green', word: 'maladaptive', pos: 'adjective'},
  {code: 'FR', name: 'Français', colorClass: 'bg-wh-purple', word: 'palimpseste', pos: 'nom'},
  {code: 'ES', name: 'Español', colorClass: 'bg-wh-orange', word: 'sobremesa', pos: 'sustantivo'},
] as const
</script>

<template>
  <LandingSection id="languages" class="bg-white">
    <div class="mx-auto max-w-[960px]">
      <LandingSectionHeader
          class="mx-auto mb-14 max-w-[800px] max-[880px]:mb-9"
          :eyebrow="t('landing.languages.eyebrow')"
          :heading-first="t('landing.languages.headingFirst')"
          :heading-emphasis="t('landing.languages.headingEmphasis')"
      />

      <ul class="grid list-none grid-cols-3 gap-5 max-[880px]:flex max-[880px]:flex-col">
        <li v-for="lang in languages" :key="lang.code" class="rounded-[20px] border border-line bg-paper px-6 py-[26px]">
          <span
              :class="['inline-grid h-11 w-11 place-items-center rounded-[14px] text-[15px] font-extrabold text-white', lang.colorClass]"
          >
            {{ lang.code }}
          </span>
          <div class="mt-4 text-lg font-bold tracking-[-0.01em]">{{ lang.name }}</div>
          <div class="mt-1.5 text-[14.5px] font-medium text-muted">
            {{ lang.word }} <em class="ml-1 text-[13px] text-muted-2">{{ lang.pos }}</em>
          </div>
        </li>
      </ul>

      <div class="mx-auto mt-8 flex max-w-[640px] items-center gap-4 rounded-[20px] border border-green-100 bg-green-50 px-[22px] py-[18px]">
        <svg class="shrink-0" width="40" height="40" viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="35" cy="35" r="22" fill="#22C55E"/>
          <circle cx="40" cy="32" r="3" fill="#0F1B12"/>
          <path d="M30 38 Q35 42 40 38" stroke="#0F1B12" stroke-width="2" fill="none" stroke-linecap="round"/>
          <path d="M52 35 L62 33 L62 40 L52 40z" fill="#F97316"/>
          <path d="M30 50 Q40 75 60 78 Q70 75 75 65 Q70 55 55 53" fill="#16A34A"/>
        </svg>
        <p class="text-pretty text-[14.5px] leading-[1.55] text-ink-2">{{ t('landing.languages.ownLanguage') }}</p>
      </div>
    </div>
  </LandingSection>
</template>
