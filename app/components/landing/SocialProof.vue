<script setup lang="ts">
defineProps<{ centered?: boolean }>()

const avatars = [
  {initial: 'M', color: '#22C55E'},
  {initial: 'J', color: '#7C3AED'},
  {initial: 'S', color: '#F97316'},
  {initial: 'A', color: '#EC4899'},
]

const {waitlistCount} = useWaitlist()
const {t} = useI18n()
</script>

<template>
  <div class="social-proof" :class="{ centered }">
    <div class="avatar-stack">
      <div
          v-for="(a, i) in avatars"
          :key="i"
          class="avatar"
          :style="{ background: a.color, marginLeft: i ? '-10px' : '0' }"
      >
        {{ a.initial }}
      </div>
    </div>
    <div style="font-size: 14px; color: var(--color-muted);">
      {{ t('landing.socialProof.people', { count: waitlistCount.count + 1500 }) }}
    </div>
  </div>
</template>

<style scoped>
.social-proof {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 24px;
}

.social-proof.centered {
  justify-content: center;
}

.avatar-stack {
  display: flex;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 9999px;
  border: 2px solid var(--color-paper);
  display: grid;
  place-items: center;
  color: white;
  font-weight: 700;
  font-size: 12px;
}
</style>
