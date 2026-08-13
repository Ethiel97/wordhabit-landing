<script lang="ts" setup>
import type {GetRandomWordForLandingResult} from "#server/api/random-word.get";
import {selectLocalizedDefinition} from '~/utils/selectLocalizedDefinition'

const props = defineProps<{
  randomWord: GetRandomWordForLandingResult | null
}>();

const {locale, t} = useI18n()

const selectedDefinition = computed(() =>
  selectLocalizedDefinition(props.randomWord?.definitions, locale.value))
const synonyms = computed(() => props.randomWord?.synonyms?.map((synonym) => synonym.value).join(', ')
  || t('landing.flashcard.noSynonyms'))
const term = computed(() => props.randomWord?.word?.normalizedTerm || t('landing.flashcard.fallbackTerm'))
const meaning = computed(() => selectedDefinition.value?.text || t('landing.flashcard.loadingMeaning'))
const definitionLanguage = computed(() => {
  const code = selectedDefinition.value?.explanationLanguage.toLowerCase() || locale.value
  return t(`languages.${code}`)
})

const example = computed(() => {
  const hasExamples = (props.randomWord?.examples?.length ?? 0) > 0;
  return hasExamples ? props.randomWord?.examples?.[0]?.sentence : t('landing.flashcard.loadingExample');
});

</script>
<template>
  <div class="card-scene">
    <!-- Back card -->
    <div class="back-card">
      <div class="back-label">{{ t('landing.flashcard.synonyms') }}</div>
      <div class="back-content">
        {{ synonyms }}
      </div>
    </div>

    <!-- Main card -->
    <div class="main-card">
      <div class="card-header">
        <div class="card-tag">{{ t('landing.flashcard.wordOfDay') }}</div>
        <div class="sound-btn" role="img" :aria-label="t('landing.flashcard.listen')">♪</div>
      </div>

      <h3 class="display word-title">{{ term }}</h3>

      <div class="card-meaning">
        <strong>{{ t('landing.flashcard.meaning') }}:</strong> {{ meaning }}
      </div>
      <div class="card-example">
        "{{ example }}"
      </div>

      <div class="card-footer">
        <span class="lang-select">{{ definitionLanguage }}</span>
        <div class="card-actions">
          <button type="button" class="icon-btn" :aria-label="t('landing.flashcard.save')">★</button>
          <button type="button" class="icon-btn" :aria-label="t('landing.flashcard.share')">↗</button>
        </div>
      </div>
    </div>

    <!-- Floating badges -->
    <FloatingBadge aria-hidden="true" color="#7C3AED" emoji="🏆" :top="0" :left="50" :rotate="-12"/>
    <FloatingBadge aria-hidden="true" color="#22C55E" emoji="🎯" :top="310" :right="20" :rotate="15"/>
    <FloatingBadge aria-hidden="true" color="#3B82F6" emoji="📚" :top="420" :left="80" :rotate="-8" :size="56"/>
    <FloatingBadge aria-hidden="true" color="#EC4899" emoji="🔥" :top="150" :right="0" :rotate="20" :size="56"/>
  </div>
</template>

<style scoped>
.card-scene {
  position: relative;
  height: 540px;
  perspective: 1200px;
}

.back-card {
  position: absolute;
  top: 60px;
  right: 40px;
  width: 320px;
  padding: 28px 26px;
  background: white;
  border-radius: 24px;
  box-shadow: var(--shadow-md);
  transform: rotate(8deg);
  border: 1px solid var(--color-line);
}

.back-label {
  font-size: 12px;
  color: var(--color-muted);
  margin-bottom: 6px;
  font-weight: 600;
}

.back-content {
  font-size: 15px;
  color: var(--color-ink);
  line-height: 1.5;
}

.main-card {
  position: absolute;
  top: 30px;
  left: 20px;
  width: 380px;
  padding: 32px;
  background: white;
  border-radius: 28px;
  box-shadow: var(--shadow-lg);
  transform: rotate(-6deg);
  border: 1px solid var(--color-line);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 14px;
}

.card-tag {
  font-size: 12px;
  color: var(--color-muted);
  font-weight: 600;
}

.sound-btn {
  width: 36px;
  height: 36px;
  border-radius: 9999px;
  background-color: var(--color-green-50);
  color: var(--color-green-700);
  display: grid;
  place-items: center;
  font-size: 16px;
}

.word-title {
  font-size: 44px;
  color: var(--color-green);
  margin-bottom: 16px;
}

.card-meaning {
  font-size: 14px;
  line-height: 1.55;
  color: var(--color-ink-2);
}

.card-example {
  font-size: 14px;
  line-height: 1.55;
  color: var(--color-muted);
  margin-top: 12px;
  font-style: italic;
}

.card-footer {
  margin-top: 22px;
  padding-top: 16px;
  border-top: 1px dashed var(--color-line);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.lang-select {
  font-size: 12px;
  color: var(--color-muted);
}

.card-actions {
  display: flex;
  gap: 8px;
}

.icon-btn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background-color: var(--color-paper);
  color: var(--color-muted);
  display: grid;
  place-items: center;
  font-size: 14px;
  cursor: pointer;
}
</style>
