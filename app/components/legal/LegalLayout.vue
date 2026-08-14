<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    updatedOn: string
    summary: string
    eyebrow?: string
  }>(),
  { eyebrow: 'Legal' },
)
</script>

<template>
  <div class="min-h-screen bg-paper">
    <!-- Not AppNav: its links are anchors into the landing sections, and
         none of them exist on this route. -->
    <header class="mx-auto flex max-w-[820px] items-center justify-between gap-4 px-6 pt-6">
      <AppLogo to="/" compact/>
      <NuxtLink to="/" class="text-sm text-muted transition-colors duration-150 hover:text-ink">← Back to site</NuxtLink>
    </header>

    <main class="mx-auto max-w-[820px] px-6 pt-14 pb-24">
      <p class="mb-5 inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700">
        {{ eyebrow }}
      </p>
      <h1 class="mb-5 font-display text-[clamp(36px,6vw,56px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink">
        {{ title }}
      </h1>
      <p class="max-w-[62ch] text-lg leading-[1.6] text-muted">{{ summary }}</p>
      <p class="mt-4 text-sm text-muted-2">Last updated {{ updatedOn }}</p>

      <article
          class="mt-12 text-base leading-[1.7] text-ink-2
          [&_h2]:mt-12 [&_h2]:mb-3 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:leading-[1.25] [&_h2]:text-ink [&_h2:first-child]:mt-0
          [&_h3]:mt-7 [&_h3]:mb-2 [&_h3]:text-[17px] [&_h3]:font-bold [&_h3]:text-ink
          [&_p]:mb-4 [&_p]:max-w-[68ch]
          [&_ul]:mb-4 [&_ul]:max-w-[68ch] [&_ul]:list-disc [&_ul]:pl-[22px]
          [&_li]:mb-2
          [&_a]:text-green-700 [&_a]:underline [&_a]:underline-offset-2
          [&_strong]:font-bold [&_strong]:text-ink
          [&_table]:mb-6 [&_table]:block [&_table]:w-full [&_table]:border-collapse [&_table]:overflow-x-auto [&_table]:text-[15px]
          [&_th]:whitespace-nowrap [&_th]:border-b-2 [&_th]:border-line [&_th]:py-2.5 [&_th]:pr-3 [&_th]:text-left [&_th]:font-bold [&_th]:text-ink
          [&_td]:border-b [&_td]:border-line [&_td]:py-2.5 [&_td]:pr-3 [&_td]:align-top"
      >
        <slot />
      </article>
    </main>

    <AppFooter />
  </div>
</template>
