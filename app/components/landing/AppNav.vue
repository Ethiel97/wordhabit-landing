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
    <div class="nav-inner px-4 py-3 lg:px-8 lg:py-3.5">
      <AppLogo />

      <div class="nav-links hidden lg:flex">
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
        <button class="btn btn-primary px-3 py-2 text-sm sm:text-base" aria-label="Join the waitlist" @click="scrollToWaitlist">
          <span class="sm:hidden">Join</span>
          <span class="hidden sm:inline">Join the waitlist</span>
        </button>
      </div>
    </div>
    <nav aria-label="Mobile navigation" class="flex gap-2 overflow-x-auto border-t border-[var(--color-line)] px-4 pb-3 pt-2 lg:hidden">
      <a
          v-for="link in navLinks"
          :key="`mobile-${link}`"
          :href="`#${anchorId(link)}`"
          class="mobile-nav-link"
      >
        {{ link }}
      </a>
    </nav>
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

.mobile-nav-link {
  white-space: nowrap;
  border-radius: 9999px;
  border: 1px solid var(--color-line);
  background: white;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-ink-2);
  transition: color 0.15s;
}

.mobile-nav-link:hover {
  color: var(--color-green-700);
}

.mobile-nav-link:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-green);
}
</style>
