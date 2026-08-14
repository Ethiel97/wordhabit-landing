<script setup lang="ts">
withDefaults(defineProps<{
  type?: 'button' | 'submit' | 'reset'
}>(), {
  type: 'button',
})
</script>

<template>
  <button
      :type="type"
      class="inline-flex items-center justify-center gap-2 rounded-[14px] bg-green px-[18px] py-3 text-sm font-semibold leading-none text-white shadow-sm transition-all duration-150 hover:bg-green-600"
  >
    <slot/>
  </button>
</template>
