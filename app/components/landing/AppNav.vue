<script setup lang="ts">
const navLinks = ['Features', 'How it works', 'Pricing', 'FAQ']
const isMobileMenuOpen = ref(false)

function scrollToWaitlist() {
  document.getElementById('hero-form')?.scrollIntoView({behavior: 'smooth'})
}

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}

function handleWaitlistClick() {
  scrollToWaitlist()
  closeMobileMenu()
}

function anchorId(label: string) {
  return label.toLowerCase().replace(/\s+/g, '-')
}

function handleNavLinkClick(event: MouseEvent, label: string) {
  event.preventDefault()

  const targetId = anchorId(label)
  const target = document.getElementById(targetId)
  if (!target) {
    return
  }

  target.scrollIntoView({behavior: 'smooth'})
  history.replaceState(null, '', `#${targetId}`)
  closeMobileMenu()
}
</script>

<template>
  <nav class="nav">
    <div class="nav-inner px-4 py-3 lg:px-8 lg:py-3.5">
      <AppLogo class=" mr-4"/>

      <div class="nav-links hidden lg:flex flex-1">
        <a
            v-for="link in navLinks"
            :key="link"
            :href="`#${anchorId(link)}`"
            class="nav-link"
            @click="(event) => handleNavLinkClick(event, link)"
        >
          {{ link }}
        </a>
      </div>

      <div class="nav-actions hidden lg:flex">
        <button
            class="btn btn-primary px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-green)] focus-visible:ring-offset-2 sm:text-base"
            @click="scrollToWaitlist">Join the waitlist
        </button>
      </div>

      <button
          class="menu-toggle lg:hidden"
          :aria-expanded="isMobileMenuOpen"
          aria-controls="mobile-nav"
          aria-label="Toggle navigation"
          @click="toggleMobileMenu"
      >
        <span class="sr-only">Menu</span>
        <span :class="['menu-line', { open: isMobileMenuOpen }]"/>
        <span :class="['menu-line', { open: isMobileMenuOpen }]"/>
        <span :class="['menu-line', { open: isMobileMenuOpen }]"/>
      </button>
    </div>

    <div
        v-if="isMobileMenuOpen"
        id="mobile-nav"
        aria-label="Mobile navigation"
        class="mobile-menu lg:hidden"
    >
      <a
          v-for="link in navLinks"
          :key="`mobile-${link}`"
          :href="`#${anchorId(link)}`"
          class="mobile-nav-link"
          @click="(event) => handleNavLinkClick(event, link)"
      >
        {{ link }}
      </a>

      <button class="btn btn-primary mobile-cta" @click="handleWaitlistClick">
        Join the waitlist
      </button>
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
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-links {
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
  gap: 10px;
  align-items: center;
}

.menu-toggle {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  border: 1px solid var(--color-line);
  background: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 5px;
}

.menu-line {
  width: 18px;
  height: 2px;
  border-radius: 9999px;
  background: var(--color-ink-2);
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.menu-line.open:nth-child(2) {
  transform: translateY(7px) rotate(45deg);
}

.menu-line.open:nth-child(3) {
  opacity: 0;
}

.menu-line.open:nth-child(4) {
  transform: translateY(-7px) rotate(-45deg);
}

.mobile-menu {
  border-top: 1px solid var(--color-line);
  background: rgba(251, 251, 247, 0.95);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 12px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
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
  border-radius: 12px;
  border: 1px solid var(--color-line);
  background: white;
  padding: 10px 12px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-ink-2);
  transition: color 0.15s;
}

.mobile-cta {
  width: 100%;
  margin-top: 4px;
}

.mobile-nav-link:hover {
  color: var(--color-green-700);
}

.mobile-nav-link:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-green);
}

@media (min-width: 1024px) {
  .menu-toggle,
  .mobile-menu {
    display: none;
  }
}
</style>
