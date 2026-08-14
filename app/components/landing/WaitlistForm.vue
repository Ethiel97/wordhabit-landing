<script setup lang="ts">
const props = defineProps<{
  dark?: boolean
}>()

const {state, join, isLoading, isSuccess, isError} = useWaitlist()
const {t} = useI18n()

const{trackIosNotifySubmitted} = useAnalytics()

function handleSubmit() {
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(state.value.email)) {
    state.value.errorMessage = t('landing.waitlist.errors.invalidEmail')
    return
  }
  state.value.errorMessage = ''
  join();
  trackIosNotifySubmitted();
}

</script>

<template>
  <div class="max-w-[520px]">
    <!-- Success state -->
    <div v-if="isSuccess" class="flex items-center gap-3.5 rounded-2xl border border-green bg-green-50 px-[22px] py-5">
      <div class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-green text-lg font-bold text-white">✓</div>
      <div>
        <div class="text-base font-bold">{{ t('landing.waitlist.successTitle') }}</div>
        <div class="text-sm text-muted">{{ t('landing.waitlist.successMessage') }}</div>
      </div>
    </div>

    <!-- Form state -->
    <template v-else>
      <form
          class="flex gap-2 rounded-[18px] bg-white p-1.5 shadow-[0_2px_0_0_var(--color-line),inset_0_0_0_1px_var(--color-line)]"
          @submit.prevent="handleSubmit"
      >
        <input
            v-model="state.email"
            type="email"
            :placeholder="t('landing.waitlist.placeholder')"
            :aria-label="t('landing.waitlist.emailLabel')"
            class="min-w-0 flex-1 border-0 bg-transparent px-4 py-3.5 text-base text-ink outline-0"
            :disabled="isLoading"
            @input="state.errorMessage = ''"
        />
        <AppButton
            type="submit"
            :disabled="isLoading"
        >
          {{ isLoading ? t('landing.waitlist.joining') : t('landing.waitlist.join') }}
        </AppButton>
      </form>
      <div v-if="isError" class="mt-2 text-[13px] font-medium text-red-600">{{ state.errorMessage }}</div>
    </template>
  </div>
</template>
