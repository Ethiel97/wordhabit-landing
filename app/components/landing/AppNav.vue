<script setup lang="ts">
const navLinks = ['Features', 'How it works', 'Pricing', 'FAQ']

function scrollToWaitlist() {
  document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth' })
}

function anchorId(label: string) {
  return label.toLowerCase().replace(/\s+/g, '-')
}
</script>

<template>
  <nav class="nav">
    <div class="nav-inner">
      <AppLogo />

      <div class="nav-links">
        <a
            v-for="link in navLinks"
            :key="link"
            :href="`#${anchorId(link)}`"
            class="nav-link"
        >
          {{ link }}
        </a>
      </div>

      <div class="nav-actions">
<!--        <a href="/app" class="nav-app-link">Open app →</a>-->
        <button class="btn btn-primary" @click="scrollToWaitlist">Join the waitlist</button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(247, 247, 242, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-line);
}

.nav-inner {
  max-width: 1240px;
  margin: 0 auto;
  padding: 14px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-links {
  display: flex;
  gap: 32px;
  align-items: center;
}

.nav-link {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-ink-2);
  transition: color 0.15s;
}

.nav-link:hover {
  color: var(--color-green-700);
}

.nav-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.nav-app-link {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-ink-2);
  padding: 10px 14px;
  transition: color 0.15s;
}

.nav-app-link:hover {
  color: var(--color-green-700);
}
</style>