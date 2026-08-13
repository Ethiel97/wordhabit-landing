<script setup lang="ts">
withDefaults(defineProps<{ size?: number; flying?: boolean; label?: string }>(), {
    size: 34,
    flying: false,
    label: 'Wordhabit mascot',
});
</script>

<template>
  <svg
      :width="size" :height="size" viewBox="0 0 100 100"
      :style="flying ? { transform: 'scaleX(-1)' } : undefined"
      :aria-label="label">
    <circle cx="35" cy="35" r="22" fill="#22C55E"/>
    <circle cx="40" cy="32" r="3" fill="#0F1B12"/>
    <path d="M30 38 Q35 42 40 38" stroke="#0F1B12" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M52 35 L62 33 L62 40 L52 40z" fill="#F97316"/>
    <path d="M30 50 Q40 75 60 78 Q70 75 75 65 Q70 55 55 53" fill="#16A34A"/>
    <path d="M55 53 Q70 55 80 50 Q75 65 65 70" fill="#15803D" opacity="0.6"/>
    <path d="M65 80 L72 90 L68 80z M55 82 L60 92 L58 82z" fill="#F97316"/>
  </svg>
</template>
