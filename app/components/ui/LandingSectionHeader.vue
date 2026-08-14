<script setup lang="ts">
withDefaults(defineProps<{
  eyebrow: string
  headingFirst: string
  headingEmphasis: string
  description?: string
  size?: 'default' | 'large'
}>(), {
  description: undefined,
  size: 'default',
})
</script>

<template>
  <header class="text-center">
    <div class="mb-4 inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700">
      {{ eyebrow }}
    </div>
    <h2
        :class="[
          'text-balance font-display font-extrabold leading-[0.95] tracking-[-0.03em]',
          size === 'large'
            ? 'text-[clamp(40px,6vw,64px)]'
            : 'text-[clamp(32px,5vw,48px)]',
        ]"
    >
      {{ headingFirst }}
      <span class="text-green">{{ headingEmphasis }}</span>
    </h2>
    <p v-if="description" class="mx-auto mt-[18px] max-w-[44em] text-pretty text-[16.5px] leading-[1.6] text-muted">
      {{ description }}
    </p>
  </header>
</template>
