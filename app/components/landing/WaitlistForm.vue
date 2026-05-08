<script setup lang="ts">
const props = defineProps<{
  dark?: boolean
}>()

const { email, joined, submit } = useWaitlist()
const localEmail = ref(email.value)
const error = ref('')

function handleSubmit() {
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(localEmail.value)) {
    error.value = 'Please enter a valid email'
    return
  }
  error.value = ''
  submit(localEmail.value)
}

watch(email, (v) => { localEmail.value = v })
</script>

<template>
  <div class="waitlist-root" style="max-width: 520px;">
    <!-- Success state -->
    <div v-if="joined" class="success-box">
      <div class="success-check">✓</div>
      <div>
        <div style="font-weight: 700; font-size: 16px;">You're on the list!</div>
        <div style="font-size: 14px; color: var(--color-muted);">We'll email you when your spot opens.</div>
      </div>
    </div>

    <!-- Form state -->
    <template v-else>
      <form class="form-row" @submit.prevent="handleSubmit">
        <input
            v-model="localEmail"
            type="email"
            placeholder="you@example.com"
            class="email-input"
            @input="error = ''"
        />
        <button type="submit" class="btn btn-primary">Join waitlist</button>
      </form>
      <div v-if="error" class="error-msg">{{ error }}</div>
    </template>
  </div>
</template>

<style scoped>
.form-row {
  display: flex;
  gap: 8px;
  background: white;
  border-radius: 18px;
  padding: 6px;
  box-shadow: 0 2px 0 0 var(--color-line), inset 0 0 0 1px var(--color-line);
}

.email-input {
  flex: 1;
  border: 0;
  outline: 0;
  padding: 14px 16px;
  font-size: 16px;
  background: transparent;
  color: var(--color-ink);
  min-width: 0;
}

.email-input::placeholder {
  color: var(--color-muted-2);
}

.error-msg {
  color: #DC2626;
  font-size: 13px;
  margin-top: 8px;
  font-weight: 500;
}

.success-box {
  background-color: var(--color-green-50);
  border: 1px solid var(--color-green);
  border-radius: 16px;
  padding: 20px 22px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.success-check {
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  background-color: var(--color-green);
  color: white;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  font-weight: 700;
  font-size: 18px;
}
</style>