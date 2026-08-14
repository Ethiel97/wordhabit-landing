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
  <label class="inline-flex items-center">
    <span class="sr-only">{{ t('languages.selector') }}</span>
    <span class="relative inline-flex items-center">
      <select
        :value="locale"
        :aria-label="t('languages.selector')"
        :class="[
          'min-h-10 cursor-pointer appearance-none rounded-xl border px-3 pr-8 font-sans text-[13px] font-semibold leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green',
          dark
            ? 'border-white/28 bg-white/14 text-white [&>option]:text-ink'
            : 'border-line bg-white text-ink-2',
        ]"
        @change="changeLocale"
      >
        <option v-for="option in options" :key="option.code" :value="option.code">
          {{ option.name }}
        </option>
      </select>
      <svg
          class="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-current"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
      >
        <path d="M3.5 6 8 10.5 12.5 6" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </span>
  </label>
</template>
