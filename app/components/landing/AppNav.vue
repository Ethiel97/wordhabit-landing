<script setup lang="ts">
const { t } = useI18n()

const navLinks = computed(() => [
  { id: 'how-it-works', label: t('landing.nav.howItWorks') },
  { id: 'why', label: t('landing.nav.why') },
  { id: 'languages', label: t('landing.nav.languages') },
  { id: 'pricing', label: t('landing.nav.pricing') },
  { id: 'faq', label: t('landing.nav.faq') },
])
const isMobileMenuOpen = ref(false)

function scrollToWaitlist() {
  document.getElementById('hero')?.scrollIntoView({behavior: 'smooth'})
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

function handleNavLinkClick(event: MouseEvent, targetId: string) {
  event.preventDefault()

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
  <nav class="sticky top-0 z-50 border-b border-line bg-[rgba(247,247,242,0.85)] backdrop-blur-[12px]">
    <div class="mx-auto flex max-w-[1240px] items-center justify-between px-4 py-3 lg:px-8 lg:py-3.5">
      <AppLogo class=" mr-4"/>

      <div class="hidden flex-1 items-center gap-8 lg:flex">
        <a
            v-for="link in navLinks"
            :key="link.id"
            :href="`#${link.id}`"
            class="text-sm font-medium text-ink-2 transition-colors duration-150 hover:text-green-700"
            @click="handleNavLinkClick($event, link.id)"
        >
          {{ link.label }}
        </a>
      </div>

      <div class="hidden items-center gap-2.5 lg:flex">
        <LocaleSwitcher />
        <AppButton
            class="px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 sm:text-base"
            @click="scrollToWaitlist">{{ t('landing.launch.navCta') }}
        </AppButton>
      </div>

      <button
          class="inline-flex h-[42px] w-[42px] flex-col items-center justify-center gap-[5px] rounded-xl border border-line bg-white lg:hidden"
          :aria-expanded="isMobileMenuOpen"
          aria-controls="mobile-nav"
          :aria-label="t('landing.nav.toggle')"
          @click="toggleMobileMenu"
      >
        <span class="sr-only">{{ t('landing.nav.menu') }}</span>
        <span
            :class="[
              'h-0.5 w-[18px] rounded-full bg-ink-2 transition-[transform,opacity] duration-200 ease-in-out',
              {'translate-y-[7px] rotate-45': isMobileMenuOpen},
            ]"
        />
        <span
            :class="[
              'h-0.5 w-[18px] rounded-full bg-ink-2 transition-[transform,opacity] duration-200 ease-in-out',
              {'opacity-0': isMobileMenuOpen},
            ]"
        />
        <span
            :class="[
              'h-0.5 w-[18px] rounded-full bg-ink-2 transition-[transform,opacity] duration-200 ease-in-out',
              {'-translate-y-[7px] -rotate-45': isMobileMenuOpen},
            ]"
        />
      </button>
    </div>

    <div
        v-if="isMobileMenuOpen"
        id="mobile-nav"
        :aria-label="t('landing.nav.mobile')"
        class="flex flex-col gap-2.5 border-t border-line bg-[rgba(251,251,247,0.95)] px-4 pt-3 pb-4 backdrop-blur-[8px] lg:hidden"
    >
      <a
          v-for="link in navLinks"
          :key="`mobile-${link.id}`"
          :href="`#${link.id}`"
          class="rounded-xl border border-line bg-white px-3 py-2.5 text-sm font-medium text-ink-2 transition-colors duration-150 hover:text-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green"
          @click="handleNavLinkClick($event, link.id)"
      >
        {{ link.label }}
      </a>

      <LocaleSwitcher />

      <AppButton
          class="mt-1 w-full"
          @click="handleWaitlistClick"
      >
        {{ t('landing.launch.navCta') }}
      </AppButton>
    </div>
  </nav>
</template>
