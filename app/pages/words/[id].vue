<script setup lang="ts">
import type {SharedWordResult} from "#server/api/words/[id].get";
import {selectLocalizedDefinition} from '~/utils/selectLocalizedDefinition'

const route = useRoute();
const {locale, t} = useI18n();

const motionClasses = {
    up: 'animate-sw-up opacity-0 motion-reduce:animate-none motion-reduce:opacity-100',
    pop: 'animate-sw-pop opacity-0 motion-reduce:animate-none motion-reduce:opacity-100',
    d1: '[animation-delay:0.06s]',
    d2: '[animation-delay:0.14s]',
    d3: '[animation-delay:0.22s]',
    d4: '[animation-delay:0.3s]',
    d5: '[animation-delay:0.42s]',
} as const;

const {data} = await useAsyncData<{ success: boolean; data: SharedWordResult | null }>(
    `shared-word-${route.params.id}`,
    () => $fetch(`/api/words/${route.params.id}`),
    {default: () => ({success: false, data: null})},
);

const word = computed<SharedWordResult | null>(() => data.value?.data ?? null);
const notFound = computed(() => word.value === null);

const definition = computed(() => {
    return selectLocalizedDefinition(word.value?.definitions, locale.value);
});

const seoDescription = computed(() => {
    if (!definition.value) {
        return '';
    }

    const description = `${definition.value.text.trim()} ${t('sharedWord.seoSuffix')}`;
    if (description.length <= 160) {
        return description;
    }

    const shortened = description.slice(0, 159);
    const lastSpace = shortened.lastIndexOf(' ');
    return `${shortened.slice(0, lastSpace > 0 ? lastSpace : 159).trimEnd()}…`;
});

const posLabel = computed(() =>
    word.value
        ? t(`sharedWord.partOfSpeech.${word.value.partOfSpeech.toLowerCase()}`)
        : '');

const languageLabel = computed(() => {
    const languageCode = word.value?.targetLanguage?.toLowerCase();
    return languageCode ? t(`sharedWord.languages.${languageCode}`) : '';
});

const event = useRequestEvent();
if (import.meta.server && notFound.value && event) {
    setResponseStatus(event, 404);
}

if (word.value && definition.value) {
    const title = `${word.value.term} — ${t('sharedWord.origin')}`;
    const canonicalUrl = `https://wordhabit.app/words/${word.value.id}`;
    const imageAlt = t('sharedWord.ogAlt', {term: word.value.term});
    useHead({
        link: [{rel: 'canonical', href: canonicalUrl}],
    });
    useSeoMeta({
        title,
        description: seoDescription.value,
        ogTitle: title,
        ogDescription: seoDescription.value,
        ogType: 'article',
        ogUrl: canonicalUrl,
        ogSiteName: 'Wordhabit',
        twitterCard: 'summary_large_image',
        twitterTitle: title,
        twitterDescription: seoDescription.value,
    });
    defineOgImage('SharedWordTakumi', {
        term: word.value.term,
        pos: posLabel.value,
        definition: definition.value.text,
        eyebrow: t('sharedWord.ogEyebrow'),
        cta: t('sharedWord.ogCta'),
        language: languageLabel.value,
    }, {width: 1200, height: 630, alt: imageAlt});
} else {
    useSeoMeta({
        title: `${t('sharedWord.notFound.title')} · WordHabit`,
        description: t('sharedWord.notFound.message'),
        robots: 'noindex',
    });
}
</script>

<template>
  <div>
    <section
        class="relative overflow-hidden rounded-b-[36px] bg-[radial-gradient(120%_90%_at_15%_0%,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0)_45%),linear-gradient(150deg,var(--color-green)_0%,var(--color-green-600)_62%,var(--color-green-700)_100%)] px-6 pb-[72px] text-white max-[560px]:px-[18px]"
        :aria-label="notFound ? t('sharedWord.aria.notFound') : t('sharedWord.aria.sharedWord')">
      <div class="absolute top-[-130px] right-[-90px] h-[300px] w-[300px] animate-sw-drift rounded-full bg-white/9 motion-reduce:animate-none"/>
      <div class="absolute bottom-[-110px] left-[-70px] h-[220px] w-[220px] animate-sw-drift-reverse rounded-full bg-white/6 motion-reduce:animate-none"/>
      <div class="absolute top-[120px] right-[15%] h-3.5 w-3.5 rounded-full bg-white/35"/>
      <div
          v-if="!notFound"
          class="pointer-events-none absolute right-[-4%] bottom-[-4%] whitespace-nowrap font-display text-[clamp(120px,26vw,260px)] leading-none font-extrabold tracking-[-0.05em] text-white/6"
          aria-hidden="true"
      >
        {{ word?.term }}
      </div>
      <div class="pointer-events-none absolute inset-0 bg-[url('/grain.svg')] opacity-5"/>

      <header
          :class="[motionClasses.up, 'relative flex justify-center pt-[26px] max-[560px]:justify-between max-[560px]:gap-3']"
      >
        <AppLogo
            to="/"
            class="gap-2.5 [&>div]:h-[34px] [&>div]:w-[34px] [&>div]:rounded-[9px] [&>div]:bg-white [&>div]:shadow-[0_2px_8px_rgba(15,27,18,0.15)] [&>div>span]:text-[17px] [&>div>span]:text-green-600 [&>span]:text-xl [&>span]:tracking-[-0.02em] [&>span]:text-white max-[560px]:min-w-0 max-[560px]:gap-2 max-[560px]:[&>div]:h-8 max-[560px]:[&>div]:w-8 max-[560px]:[&>span]:text-lg"
        />
        <LocaleSwitcher
            dark
            class="absolute right-0 max-[560px]:static max-[560px]:shrink-0 max-[560px]:[&_select]:min-h-[38px] max-[560px]:[&_select]:max-w-[104px] max-[560px]:[&_select]:px-2.5 max-[560px]:[&_select]:pr-[26px] max-[560px]:[&_select]:text-xs"
        />
      </header>

      <div class="relative mx-auto max-w-[660px] pt-[clamp(44px,9vw,72px)]">
        <template v-if="notFound">
          <div
              :class="[motionClasses.pop, 'absolute top-[clamp(8px,4vw,30px)] right-[4%]']"
              aria-hidden="true"
          >
            <SharedWordMascot :size="86" :label="t('sharedWord.aria.mascot')" flying/>
            <svg class="absolute top-[34px] left-[-46px] h-0.5 w-10" viewBox="0 0 40 12" aria-hidden="true">
              <path
                  d="M2 2 Q14 6 38 3 M2 9 Q18 12 34 9"
                  stroke="rgba(255,255,255,0.5)" stroke-width="2" fill="none"
                  stroke-linecap="round" stroke-dasharray="2 5"/>
            </svg>
          </div>
          <h1
              :class="[motionClasses.up, motionClasses.d1, 'max-w-[9em] text-balance font-display text-[clamp(42px,11vw,72px)] leading-[0.98] font-extrabold tracking-[-0.03em]']"
          >
            {{ t('sharedWord.notFound.title') }}
          </h1>
          <p
              :class="[motionClasses.up, motionClasses.d2, 'mt-5 max-w-[30em] text-pretty text-[clamp(16px,4.4vw,19px)] leading-[1.65] text-white/95']"
          >
            {{ t('sharedWord.notFound.message') }}
          </p>
        </template>

        <template v-else>
          <h1
              :class="[motionClasses.up, motionClasses.d1, 'text-balance font-display text-[clamp(58px,16vw,104px)] leading-[0.92] font-extrabold tracking-[-0.035em] [overflow-wrap:anywhere]']"
          >
            {{ word?.term }}
          </h1>
          <div
              :class="[motionClasses.up, motionClasses.d2, 'mt-[18px] flex flex-wrap items-center gap-3 text-[15px] font-semibold']"
          >
            <span v-if="languageLabel" class="rounded-full border border-white/22 bg-white/92 px-[13px] py-[5px] font-extrabold text-green-700">
              {{ languageLabel }}
            </span>
            <span class="rounded-full border border-white/22 bg-white/16 px-[13px] py-[5px]">{{ posLabel }}</span>
            <span v-if="word?.pronunciation" class="tracking-[0.01em] text-white/85">{{ word.pronunciation }}</span>
          </div>
          <p
              v-if="definition"
              :class="[motionClasses.up, motionClasses.d3, 'mt-[26px] max-w-[34em] text-pretty text-[clamp(17px,4.6vw,20px)] leading-[1.6] text-white/97']"
          >
            {{ definition.text }}
          </p>
          <div
              v-if="word?.example?.sentence"
              :class="[motionClasses.up, motionClasses.d4, 'mt-[18px] max-w-[34em] rounded-2xl border border-white/17 bg-white/13 px-[17px] py-3.5 text-[15.5px] leading-[1.6] text-white/94 italic shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]']"
          >
            “{{ word.example.sentence }}”
          </div>
        </template>
      </div>
    </section>

    <div
        :class="[motionClasses.pop, 'relative z-[6] mx-auto mt-[-21px] flex w-fit items-center gap-[9px] rounded-full border border-line bg-white py-2 pr-[18px] pl-2.5 text-[13px] font-semibold text-muted shadow-md']"
    >
      <SharedWordMascot :size="30" :label="t('sharedWord.aria.mascot')"/>
      <span>{{ t('sharedWord.origin') }}</span>
    </div>

    <main class="mx-auto max-w-[600px] px-6 pb-[84px]">
      <section :class="[motionClasses.up, motionClasses.d5, 'mt-[60px] text-center']">
        <h2 class="text-balance font-display text-[clamp(30px,8vw,42px)] font-extrabold leading-[0.95] tracking-[-0.03em]">
          {{ t('sharedWord.tagline.first') }}
          <span class="text-green-600">{{ t('sharedWord.tagline.emphasis') }}</span>
          {{ t('sharedWord.tagline.last') }}
        </h2>
        <p class="mt-3.5 text-[15.5px] leading-[1.6] text-muted">{{ t('sharedWord.subtitle') }}</p>

        <StoreBadges context="word_page" center :word-id="word?.id" class="mt-7"/>

        <div class="mt-5 text-xs font-bold tracking-[0.08em] text-muted-2 uppercase">{{ t('sharedWord.free') }}</div>
        <div v-if="notFound" class="mt-4">
          <NuxtLink to="/" class="inline-block px-[18px] py-3 text-sm font-semibold text-muted">
            {{ t('sharedWord.notFound.home') }} →
          </NuxtLink>
        </div>
      </section>
    </main>

    <AppFooter/>
  </div>
</template>
