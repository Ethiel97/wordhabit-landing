<script setup lang="ts">
import type {SharedWordResult} from "#server/api/words/[id].get";
import {selectLocalizedDefinition} from '~/utils/selectLocalizedDefinition'

const route = useRoute();
const config = useRuntimeConfig();
const {locale, t} = useI18n();

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
        class="sw-hero"
        :aria-label="notFound ? t('sharedWord.aria.notFound') : t('sharedWord.aria.sharedWord')">
      <div class="c1"/>
      <div class="c2"/>
      <div class="c3"/>
      <div v-if="!notFound" class="ghost" aria-hidden="true">{{ word?.term }}</div>
      <div class="grain"/>

      <header class="sw-head up">
        <NuxtLink to="/">
          <span class="mark"><span>W</span></span>
          <span class="name">Wordhabit</span>
        </NuxtLink>
        <LocaleSwitcher dark class="sw-locale" />
      </header>

      <div class="sw-wrap">
        <template v-if="notFound">
          <div class="sw-fly pop" aria-hidden="true">
            <SharedWordMascot :size="86" :label="t('sharedWord.aria.mascot')" flying/>
            <svg class="trail" viewBox="0 0 40 12" aria-hidden="true">
              <path
                  d="M2 2 Q14 6 38 3 M2 9 Q18 12 34 9"
                  stroke="rgba(255,255,255,0.5)" stroke-width="2" fill="none"
                  stroke-linecap="round" stroke-dasharray="2 5"/>
            </svg>
          </div>
          <h1 class="sw-nf-title up d1" style="max-width: 9em">{{ t('sharedWord.notFound.title') }}</h1>
          <p class="sw-nf-msg up d2">{{ t('sharedWord.notFound.message') }}</p>
        </template>

        <template v-else>
          <h1 class="sw-term up d1">{{ word?.term }}</h1>
          <div class="sw-meta up d2">
            <span class="pos">{{ posLabel }}</span>
            <span v-if="word?.pronunciation" class="phon">{{ word.pronunciation }}</span>
          </div>
          <p v-if="definition" class="sw-def up d3">{{ definition.text }}</p>
          <div v-if="word?.example?.sentence" class="sw-ex up d4">“{{ word.example.sentence }}”</div>
        </template>
      </div>
    </section>

    <div class="sw-stamp pop">
      <SharedWordMascot :size="30" :label="t('sharedWord.aria.mascot')"/>
      <span>{{ t('sharedWord.origin') }}</span>
    </div>

    <main class="sw-main">
      <section class="sw-cta up d5">
        <h2 class="display">
          {{ t('sharedWord.tagline.first') }}
          <span class="acc">{{ t('sharedWord.tagline.emphasis') }}</span>
          {{ t('sharedWord.tagline.last') }}
        </h2>
        <p class="sub">{{ t('sharedWord.subtitle') }}</p>

        <div class="sw-badges">
          <a
              class="sw-badge"
              :href="config.public.playStoreUrl"
              :aria-label="t('sharedWord.aria.googlePlay')">
            <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 2.7v18.6c0 .6.7 1 1.2.6l1-.6L16 12 6.2 2.7l-1-.6C4.7 1.7 4 2.1 4 2.7z" fill="#4CC9F0"/>
              <path d="M16 12l3.8-2.2c.9.5.9 1.9 0 2.4L16 12z" fill="#FFD166"/>
              <path d="M6.2 2.7L16 12l3.8-2.2L7.4 2.3c-.4-.2-.9-.2-1.2.4z" fill="#22C55E"/>
              <path d="M6.2 21.3L16 12l3.8 2.2-12.4 7.5c-.4.2-.9.2-1.2-.4z" fill="#F97316"/>
            </svg>
            <span class="t">
              <small>{{ t('sharedWord.store.getOn') }}</small>
              <b>{{ t('sharedWord.store.googlePlay') }}</b>
            </span>
          </a>

          <a
              v-if="config.public.appStoreUrl"
              class="sw-badge"
              :href="config.public.appStoreUrl"
              :aria-label="t('sharedWord.aria.appStore')">
            <SharedWordAppleIcon/>
            <span class="t">
              <small>{{ t('sharedWord.store.downloadOn') }}</small>
              <b>{{ t('sharedWord.store.appStore') }}</b>
            </span>
          </a>
          <span v-else class="sw-badge soon">
            <SharedWordAppleIcon color="var(--color-muted-2)"/>
            <span class="t">
              <small>{{ t('sharedWord.store.comingSoon') }}</small>
              <b>{{ t('sharedWord.store.appStore') }}</b>
            </span>
          </span>
        </div>

        <div class="sw-free">{{ t('sharedWord.free') }}</div>
        <div v-if="notFound" class="sw-home">
          <NuxtLink to="/" class="sw-home-link">
            {{ t('sharedWord.notFound.home') }} →
          </NuxtLink>
        </div>
      </section>
    </main>

    <AppFooter/>
  </div>
</template>

<style scoped>
.sw-hero {
  position: relative;
  overflow: hidden;
  background: radial-gradient(120% 90% at 15% 0%, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0) 45%),
  linear-gradient(150deg, var(--color-green) 0%, var(--color-green-600) 62%, var(--color-green-700) 100%);
  color: white;
  border-radius: 0 0 36px 36px;
  padding: 0 24px 72px;
}

.sw-hero .grain {
  position: absolute;
  inset: 0;
  opacity: 0.05;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E");
}

.sw-hero .c1,
.sw-hero .c2,
.sw-hero .c3 {
  position: absolute;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.09);
}

.sw-hero .c1 {
  width: 300px;
  height: 300px;
  top: -130px;
  right: -90px;
  animation: drift 14s ease-in-out infinite alternate;
}

.sw-hero .c2 {
  width: 220px;
  height: 220px;
  bottom: -110px;
  left: -70px;
  background: rgba(255, 255, 255, 0.06);
  animation: drift 17s ease-in-out infinite alternate-reverse;
}

.sw-hero .c3 {
  width: 14px;
  height: 14px;
  top: 120px;
  right: 15%;
  background: rgba(255, 255, 255, 0.35);
}

.sw-hero .ghost {
  position: absolute;
  right: -4%;
  bottom: -4%;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(120px, 26vw, 260px);
  letter-spacing: -0.05em;
  color: rgba(255, 255, 255, 0.06);
  white-space: nowrap;
  pointer-events: none;
  line-height: 1;
}

@keyframes drift {
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(14px, 10px);
  }
}

.sw-head {
  position: relative;
  display: flex;
  justify-content: center;
  padding: 26px 0 0;
}

.sw-locale {
  position: absolute;
  right: 0;
}

.sw-head a {
  display: flex;
  align-items: center;
  gap: 10px;
}

.sw-head .mark {
  width: 34px;
  height: 34px;
  border-radius: 9px;
  background: white;
  display: grid;
  place-items: center;
  box-shadow: 0 2px 8px rgba(15, 27, 18, 0.15);
}

.sw-head .mark span {
  color: var(--color-green-600);
  font-weight: 800;
  font-size: 17px;
  font-family: var(--font-display);
}

.sw-head .name {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 20px;
  letter-spacing: -0.02em;
  color: white;
}

.sw-wrap {
  position: relative;
  max-width: 660px;
  margin: 0 auto;
  padding-top: clamp(44px, 9vw, 72px);
}

.sw-term {
  font-family: var(--font-display);
  font-weight: 800;
  letter-spacing: -0.035em;
  line-height: 0.92;
  font-size: clamp(58px, 16vw, 104px);
  overflow-wrap: anywhere;
  text-wrap: balance;
}

.sw-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 18px;
  font-size: 15px;
  font-weight: 600;
}

.sw-meta .pos {
  padding: 5px 13px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.22);
}

.sw-meta .phon {
  color: rgba(255, 255, 255, 0.85);
  letter-spacing: 0.01em;
}

.sw-def {
  margin-top: 26px;
  font-size: clamp(17px, 4.6vw, 20px);
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.97);
  max-width: 34em;
  text-wrap: pretty;
}

.sw-ex {
  margin-top: 18px;
  background: rgba(255, 255, 255, 0.13);
  border: 1px solid rgba(255, 255, 255, 0.17);
  border-radius: 16px;
  padding: 14px 17px;
  font-size: 15.5px;
  line-height: 1.6;
  font-style: italic;
  color: rgba(255, 255, 255, 0.94);
  max-width: 34em;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
}

.sw-stamp {
  position: relative;
  z-index: 6;
  display: flex;
  align-items: center;
  gap: 9px;
  width: fit-content;
  margin: -21px auto 0;
  background: white;
  border-radius: 999px;
  padding: 8px 18px 8px 10px;
  box-shadow: var(--shadow-md);
  color: var(--color-muted);
  font-size: 13px;
  font-weight: 600;
  border: 1px solid var(--color-line);
}

.sw-main {
  max-width: 600px;
  margin: 0 auto;
  padding: 0 24px 84px;
}

.sw-cta {
  text-align: center;
  margin-top: 60px;
}

.sw-cta h2 {
  font-size: clamp(30px, 8vw, 42px);
  text-wrap: balance;
}

.sw-cta h2 .acc {
  color: var(--color-green-600);
}

.sw-cta .sub {
  margin-top: 14px;
  font-size: 15.5px;
  line-height: 1.6;
  color: var(--color-muted);
}

.sw-badges {
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 28px;
}

.sw-badge {
  display: inline-flex;
  align-items: center;
  gap: 11px;
  background: var(--color-ink);
  color: white;
  border-radius: 14px;
  padding: 10px 20px 10px 15px;
  min-height: 58px;
  text-align: left;
  box-shadow: 0 4px 0 0 #000, 0 12px 24px -8px rgba(15, 27, 18, 0.35);
  transition: transform 0.1s ease, box-shadow 0.18s ease;
}

.sw-badge:hover {
  transform: translateY(-2px);
}

.sw-badge:active {
  transform: translateY(2px);
  box-shadow: 0 1px 0 0 #000, 0 6px 12px -6px rgba(15, 27, 18, 0.3);
}

.sw-badge .t {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
}

.sw-badge .t small {
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  opacity: 0.72;
}

.sw-badge .t b {
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.sw-badge.soon {
  background: transparent;
  color: var(--color-muted);
  box-shadow: inset 0 0 0 1.5px var(--color-line);
  cursor: default;
}

.sw-badge.soon:hover,
.sw-badge.soon:active {
  transform: none;
  box-shadow: inset 0 0 0 1.5px var(--color-line);
}

.sw-free {
  margin-top: 20px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-muted-2);
}

.sw-home {
  margin-top: 16px;
}

.sw-home-link {
  display: inline-block;
  padding: 12px 18px;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-muted);
}

.sw-nf-title {
  font-family: var(--font-display);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 0.98;
  font-size: clamp(42px, 11vw, 72px);
  text-wrap: balance;
}

.sw-nf-msg {
  margin-top: 20px;
  font-size: clamp(16px, 4.4vw, 19px);
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.95);
  max-width: 30em;
  text-wrap: pretty;
}

.sw-fly {
  position: absolute;
  top: clamp(8px, 4vw, 30px);
  right: 4%;
  transform: rotate(14deg);
  opacity: 0.95;
}

.sw-fly .trail {
  position: absolute;
  left: -46px;
  top: 34px;
  width: 40px;
  height: 2px;
}

.up {
  opacity: 0;
  animation: swUp 0.55s cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
}

@keyframes swUp {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.d1 {
  animation-delay: 0.06s;
}

.d2 {
  animation-delay: 0.14s;
}

.d3 {
  animation-delay: 0.22s;
}

.d4 {
  animation-delay: 0.3s;
}

.d5 {
  animation-delay: 0.42s;
}

.pop {
  opacity: 0;
  animation: swPop 0.45s cubic-bezier(0.2, 0.9, 0.3, 1.3) 0.5s forwards;
}

@media (max-width: 560px) {
  .sw-hero {
    padding-inline: 18px;
  }

  .sw-head {
    justify-content: space-between;
    gap: 12px;
  }

  .sw-locale {
    position: static;
    flex: 0 0 auto;
  }

  .sw-locale :deep(select) {
    min-height: 38px;
    max-width: 104px;
    padding-inline: 10px 26px;
    font-size: 12px;
  }

  .sw-head a {
    min-width: 0;
    gap: 8px;
  }

  .sw-head .mark {
    width: 32px;
    height: 32px;
  }

  .sw-head .name {
    font-size: 18px;
  }
}

@keyframes swPop {
  from {
    opacity: 0;
    transform: translateY(6px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .up,
  .pop {
    animation: none;
    opacity: 1;
  }

  .sw-hero .c1,
  .sw-hero .c2 {
    animation: none;
  }
}
</style>
