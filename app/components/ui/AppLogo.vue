<script setup lang="ts">
withDefaults(defineProps<{
  to?: string
  compact?: boolean
  dark?: boolean
}>(), {
  to: '#',
  compact: false,
  dark: false,
})
</script>

<template>
  <NuxtLink :to="to" :class="['flex items-center', compact ? 'gap-2' : 'gap-2.5']">
    <div
        :class="[
          'grid shrink-0 place-items-center bg-green shadow-[0_3px_0_0_var(--color-green-700)]',
          compact ? 'h-8 w-8 rounded-lg' : 'h-9 w-9 rounded-[10px]',
        ]"
    >
      <span :class="['font-display font-extrabold text-white', compact ? 'text-base' : 'text-lg']">W</span>
    </div>
    <span
        :class="[
          'font-display font-extrabold leading-[0.95] tracking-[-0.03em]',
          compact ? 'text-lg' : 'text-[22px]',
          {'text-white': dark},
        ]"
    >
      Wordhabit
    </span>
  </NuxtLink>
</template>
