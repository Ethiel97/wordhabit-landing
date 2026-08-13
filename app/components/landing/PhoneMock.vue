<script setup lang="ts">
import type {GetRandomWordForLandingResult} from '#server/api/random-word.get'
import {selectLocalizedDefinition} from '~/utils/selectLocalizedDefinition'

const props = defineProps<{ randomWord: GetRandomWordForLandingResult | null }>()
const {locale, t} = useI18n()

const term = computed(() => props.randomWord?.word.normalizedTerm || t('landing.phone.fallbackTerm'))
const definition = computed(() =>
  selectLocalizedDefinition(props.randomWord?.definitions, locale.value)?.text
    ?? t('landing.phone.fallbackDefinition'))
const partOfSpeech = computed(() => props.randomWord?.word.partOfSpeech
  ? t(`sharedWord.partOfSpeech.${props.randomWord.word.partOfSpeech.toLowerCase()}`)
  : t('sharedWord.partOfSpeech.adjective'))
</script>

<template>
  <div class="phone-outer">
    <div class="phone-screen">
      <!-- Dynamic island notch -->
      <div class="notch"/>

      <!-- Header -->
      <div class="screen-header">
        <div>
          <div class="streak-tag">{{ t('landing.phone.streak', { day: 47, count: 12 }) }}</div>
          <div class="display greeting">{{ t('landing.phone.greeting', { name: 'Ami' }) }}</div>
        </div>
      </div>

      <!-- Word of the day card -->
      <div class="wotd-card">
        <div class="wotd-label">{{ t('landing.phone.wordOfDay') }}</div>
        <h3 class="display wotd-word">{{ term }}</h3>
        <div class="wotd-pos">{{ partOfSpeech }}</div>
        <div class="wotd-def">{{ definition }}</div>
      </div>

      <!-- Stats grid -->
      <div class="stats-grid">
        <div class="stat-tile green">
          <div class="stat-label">{{ t('landing.phone.review') }}</div>
          <div class="display stat-num">14</div>
        </div>
        <div class="stat-tile purple">
          <div class="stat-label">{{ t('landing.phone.badges') }}</div>
          <div class="display stat-num">6</div>
        </div>
      </div>

      <!-- CTA -->
      <button type="button" class="phone-cta">{{ t('landing.phone.startLesson') }} →</button>
    </div>
  </div>
</template>

<style scoped>
.phone-outer {
  position: relative;
  width: 320px;
  height: 640px;
  margin: 0 auto;
  background-color: var(--color-ink);
  border-radius: 48px;
  padding: 12px;
  box-shadow: 0 40px 80px -20px rgba(15, 27, 18, 0.3),
  0 20px 40px -10px rgba(15, 27, 18, 0.2);
}

.phone-screen {
  width: 100%;
  height: 100%;
  background-color: var(--color-paper-2);
  border-radius: 36px;
  overflow: hidden;
  position: relative;
  padding: 50px 24px 24px;
}

.notch {
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 28px;
  border-radius: 9999px;
  background-color: var(--color-ink);
}

.screen-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.streak-tag {
  font-size: 12px;
  color: var(--color-muted);
}

.greeting {
  font-size: 22px;
  margin-top: 2px;
}

.wotd-card {
  background: white;
  border-radius: 20px;
  padding: 20px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-line);
}

.wotd-label {
  font-size: 11px;
  color: var(--color-muted);
  font-weight: 600;
}

.wotd-word {
  font-size: 32px;
  color: var(--color-green);
  margin: 8px 0 12px;
}

.wotd-pos {
  font-size: 13px;
  color: var(--color-muted-2);
  margin-bottom: 8px;
}

.wotd-def {
  font-size: 13px;
  line-height: 1.5;
  color: var(--color-ink-2);
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 14px;
}

.stat-tile {
  border-radius: 14px;
  padding: 14px;
}

.stat-tile.green {
  background-color: var(--color-green-50);
}

.stat-tile.purple {
  background-color: #F3E8FF;
}

.stat-label {
  font-size: 11px;
  font-weight: 600;
}

.stat-tile.green .stat-label {
  color: var(--color-green-700);
}

.stat-tile.purple .stat-label {
  color: #7C3AED;
}

.stat-num {
  font-size: 22px;
  margin-top: 4px;
}

.stat-tile.green .stat-num {
  color: var(--color-green-700);
}

.stat-tile.purple .stat-num {
  color: #7C3AED;
}

.phone-cta {
  margin-top: 14px;
  width: 100%;
  background-color: var(--color-green);
  color: white;
  border-radius: 14px;
  padding: 14px;
  font-weight: 700;
  font-size: 15px;
  box-shadow: 0 3px 0 var(--color-green-700);
  font-family: var(--font-sans);
}
</style>
