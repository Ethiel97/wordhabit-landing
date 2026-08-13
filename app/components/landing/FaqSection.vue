<script setup lang="ts">
const { t } = useI18n()

const items = computed(() => [
  {
    q: t('landing.faq.items.launch.question'),
    a: t('landing.faq.items.launch.answer'),
  },
  {
    q: t('landing.faq.items.devices.question'),
    a: t('landing.faq.items.devices.answer'),
  },
  {
    q: t('landing.faq.items.dictionary.question'),
    a: t('landing.faq.items.dictionary.answer'),
  },
  {
    q: t('landing.faq.items.duration.question'),
    a: t('landing.faq.items.duration.answer'),
  },
  {
    q: t('landing.faq.items.languages.question'),
    a: t('landing.faq.items.languages.answer'),
  },
])

const open = ref<number>(0)

function toggle(i: number) {
  open.value = open.value === i ? -1 : i
}
</script>

<template>
  <section id="faq" class="faq-section">
    <div class="section-inner">
      <!-- Header -->
      <div class="section-header">
        <div class="pill" style="margin-bottom: 16px;">{{ t('landing.faq.eyebrow') }}</div>
        <h2 class="display section-heading">
          {{ t('landing.faq.headingFirst') }}
          <span class="text-green">{{ t('landing.faq.headingEmphasis') }}</span>
        </h2>
      </div>

      <!-- Accordion -->
      <div class="accordion">
        <div
            v-for="(item, i) in items"
            :key="i"
            class="accordion-item"
            :class="{ open: open === i }"
        >
          <button
            class="accordion-trigger"
            :aria-expanded="open === i"
            @click="toggle(i)"
          >
            <span>{{ item.q }}</span>
            <span class="accordion-icon" :class="{ active: open === i }">
              {{ open === i ? '−' : '+' }}
            </span>
          </button>
          <div v-if="open === i" class="accordion-body">
            {{ item.a }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq-section {
  padding: 120px 32px;
  background: white;
}

.section-inner {
  max-width: 880px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 56px;
}

.section-heading {
  font-size: clamp(40px, 6vw, 64px);
}

.text-green {
  color: var(--color-green);
}

.accordion {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.accordion-item {
  border: 1px solid var(--color-line);
  border-radius: 18px;
  background: white;
  transition: background 0.2s;
}

.accordion-item.open {
  background-color: var(--color-paper);
}

.accordion-trigger {
  width: 100%;
  padding: 22px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 17px;
  font-weight: 600;
  text-align: left;
  color: var(--color-ink);
  gap: 16px;
}

.accordion-icon {
  width: 28px;
  height: 28px;
  border-radius: 9999px;
  background-color: var(--color-paper);
  color: var(--color-ink-2);
  display: grid;
  place-items: center;
  font-size: 16px;
  font-weight: 700;
  transition: all 0.2s;
  flex-shrink: 0;
}

.accordion-icon.active {
  background-color: var(--color-green);
  color: white;
}

.accordion-body {
  padding: 0 24px 22px;
  font-size: 15px;
  line-height: 1.6;
  color: var(--color-muted);
}
</style>
