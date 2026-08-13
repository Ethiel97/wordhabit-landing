<script setup lang="ts">
withDefaults(defineProps<{ dark?: boolean }>(), {
  dark: false,
})

const { locale, locales, setLocale, t } = useI18n()

const options = computed(() => locales.value.map((item) => {
  if (typeof item === 'string') {
    return { code: item, name: t(`languages.${item}`) }
  }

  return { code: item.code, name: item.name ?? t(`languages.${item.code}`) }
}))

async function changeLocale(event: Event) {
  const target = event.target as HTMLSelectElement
  await setLocale(target.value as 'en' | 'fr' | 'es')
}
</script>

<template>
  <label class="locale-switcher" :class="{ dark }">
    <span class="sr-only">{{ t('languages.selector') }}</span>
    <select
      :value="locale"
      :aria-label="t('languages.selector')"
      @change="changeLocale"
    >
      <option v-for="option in options" :key="option.code" :value="option.code">
        {{ option.name }}
      </option>
    </select>
  </label>
</template>

<style scoped>
.locale-switcher {
  display: inline-flex;
  align-items: center;
}

.locale-switcher select {
  min-height: 40px;
  border: 1px solid var(--color-line);
  border-radius: 12px;
  background: white;
  color: var(--color-ink-2);
  padding: 0 32px 0 12px;
  font: 600 13px/1 var(--font-sans);
  cursor: pointer;
}

.locale-switcher select:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-green);
}

.locale-switcher.dark select {
  border-color: rgba(255, 255, 255, 0.28);
  background: rgba(255, 255, 255, 0.14);
  color: white;
}

.locale-switcher.dark option {
  color: var(--color-ink);
}
</style>
