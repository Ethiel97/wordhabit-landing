<script setup lang="ts">
const {t} = useI18n()

/** The three learning languages the app ships, with a sample word. */
const languages = [
  {code: 'EN', name: 'English', color: 'var(--color-green)', word: 'maladaptive', pos: 'adjective'},
  {code: 'FR', name: 'Français', color: '#7C3AED', word: 'palimpseste', pos: 'nom'},
  {code: 'ES', name: 'Español', color: '#F97316', word: 'sobremesa', pos: 'sustantivo'},
] as const
</script>

<template>
  <section id="languages" class="languages-section">
    <div class="section-inner">
      <div class="section-header">
        <div class="pill" style="margin-bottom: 16px;">{{ t('landing.languages.eyebrow') }}</div>
        <h2 class="display section-heading">
          {{ t('landing.languages.headingFirst') }}
          <span class="text-green">{{ t('landing.languages.headingEmphasis') }}</span>
        </h2>
      </div>

      <ul class="cards">
        <li v-for="lang in languages" :key="lang.code" class="card">
          <span class="chip" :style="{background: lang.color}">{{ lang.code }}</span>
          <div class="name">{{ lang.name }}</div>
          <div class="word">
            {{ lang.word }} <em>{{ lang.pos }}</em>
          </div>
        </li>
      </ul>

      <div class="own">
        <svg width="40" height="40" viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="35" cy="35" r="22" fill="#22C55E"/>
          <circle cx="40" cy="32" r="3" fill="#0F1B12"/>
          <path d="M30 38 Q35 42 40 38" stroke="#0F1B12" stroke-width="2" fill="none" stroke-linecap="round"/>
          <path d="M52 35 L62 33 L62 40 L52 40z" fill="#F97316"/>
          <path d="M30 50 Q40 75 60 78 Q70 75 75 65 Q70 55 55 53" fill="#16A34A"/>
        </svg>
        <p>{{ t('landing.languages.ownLanguage') }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.languages-section {
  padding: 96px 32px;
  background: white;
}

.section-inner {
  max-width: 960px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 56px;
}

.section-heading {
  font-size: clamp(32px, 5vw, 48px);
  text-wrap: balance;
}

.text-green {
  color: var(--color-green);
}

.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  list-style: none;
}

.card {
  background: var(--color-paper);
  border: 1px solid var(--color-line);
  border-radius: 20px;
  padding: 26px 24px;
}

.chip {
  display: inline-grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 14px;
  color: white;
  font-weight: 800;
  font-size: 15px;
}

.name {
  margin-top: 16px;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.word {
  margin-top: 6px;
  font-size: 14.5px;
  color: var(--color-muted);
  font-weight: 500;
}

.word em {
  color: var(--color-muted-2);
  font-size: 13px;
  margin-left: 4px;
}

.own {
  display: flex;
  align-items: center;
  gap: 16px;
  max-width: 640px;
  margin: 32px auto 0;
  background: var(--color-green-50);
  border: 1px solid var(--color-green-100);
  border-radius: 20px;
  padding: 18px 22px;
}

.own svg {
  flex-shrink: 0;
}

.own p {
  font-size: 14.5px;
  line-height: 1.55;
  color: var(--color-ink-2);
  text-wrap: pretty;
}

@media (max-width: 880px) {
  .languages-section {
    padding: 64px 20px;
  }

  .section-header {
    margin-bottom: 36px;
  }

  .cards {
    display: flex;
    flex-direction: column;
  }
}
</style>
