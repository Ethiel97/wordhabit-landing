<script setup lang="ts">
const { t } = useI18n()

const items = computed(() =>
  (['launch', 'devices', 'free', 'dictionary', 'duration'] as const).map((key) => ({
    q: t(`landing.faq.items.${key}.question`),
    a: t(`landing.faq.items.${key}.answer`),
  })),
)

const open = ref<number>(0)

function toggle(i: number) {
  open.value = open.value === i ? -1 : i
}
</script>

<template>
  <section id="faq" class="bg-white px-8 py-[120px]">
    <div class="mx-auto max-w-[880px]">
      <!-- Header -->
      <LandingSectionHeader
          class="mb-14"
          size="large"
          :eyebrow="t('landing.faq.eyebrow')"
          :heading-first="t('landing.faq.headingFirst')"
          :heading-emphasis="t('landing.faq.headingEmphasis')"
      />

      <!-- Accordion -->
      <div class="flex flex-col gap-3">
        <div
            v-for="(item, i) in items"
            :key="i"
            :class="[
              'rounded-[18px] border border-line transition-colors duration-200',
              open === i ? 'bg-paper' : 'bg-white',
            ]"
        >
          <button
            class="flex w-full items-center justify-between gap-4 px-6 py-[22px] text-left text-[17px] font-semibold text-ink"
            :aria-expanded="open === i"
            @click="toggle(i)"
          >
            <span>{{ item.q }}</span>
            <span
                :class="[
                  'grid h-7 w-7 shrink-0 place-items-center rounded-full text-base font-bold transition-all duration-200',
                  open === i ? 'bg-green text-white' : 'bg-paper text-ink-2',
                ]"
            >
              {{ open === i ? '−' : '+' }}
            </span>
          </button>
          <div v-if="open === i" class="px-6 pt-0 pb-[22px] text-[15px] leading-[1.6] text-muted">
            {{ item.a }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
