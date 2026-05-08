<script setup lang="ts">
const props = defineProps<{
  color: string
  emoji: string
  top?: number
  left?: number
  right?: number
  rotate?: number
  size?: number
}>()

const sz = computed(() => props.size ?? 72)
const rot = computed(() => props.rotate ?? 0)

const wrapStyle = computed(() => ({
  position: 'absolute' as const,
  top: props.top !== undefined ? `${props.top}px` : undefined,
  left: props.left !== undefined ? `${props.left}px` : undefined,
  right: props.right !== undefined ? `${props.right}px` : undefined,
  width: `${sz.value}px`,
  height: `${sz.value}px`,
  transform: `rotate(${rot.value}deg)`,
  filter: `drop-shadow(0 8px 16px ${props.color}40)`,
}))

const scallopPath =
    'M50 4 L58 11 L68 8 L72 18 L83 19 L83 30 L92 36 L87 46 L92 56 L83 62 L83 73 L72 74 L68 84 L58 81 L50 88 L42 81 L32 84 L28 74 L17 73 L17 62 L8 56 L13 46 L8 36 L17 30 L17 19 L28 18 L32 8 L42 11 Z'
</script>

<template>
  <div :style="wrapStyle">
    <svg :viewBox="'0 0 100 100'" :width="sz" :height="sz">
      <path :d="scallopPath" :fill="color" />
    </svg>
    <div
        :style="{
        position: 'absolute',
        inset: '0',
        display: 'grid',
        placeItems: 'center',
        fontSize: `${sz * 0.4}px`,
      }"
    >
      {{ emoji }}
    </div>
  </div>
</template>