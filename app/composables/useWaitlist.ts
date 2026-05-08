interface WaitlistState {
    email: string;
    status: 'idle' | 'loading' | 'success' | 'error'
    errorMessage: string | null
}


export function useWaitlist() {
    const state = reactive<WaitlistState>({
        email: '',
        status: 'idle',
        errorMessage: null,
    })

    const isLoading = computed(() => state.status === 'loading')
    const isSuccess = computed(() => state.status === 'success')
    const isError = computed(() => state.status === 'error')


    async function join() {
        state.status = 'loading'
        state.errorMessage = null

        try {
            await $fetch('/api/waitlist', {
                method: 'POST',
                body: {email: state.email},
            })
            state.status = 'success'
            state.email = ''
        } catch (err: any) {
            state.status = 'error'
            state.errorMessage =
                err?.data?.statusMessage ?? 'Something went wrong. Please try again.'
        }
    }

    async function reset() {
        state.status = 'idle'
        state.email = ''
        state.errorMessage = null
    }

    return {state, join, reset, isLoading, isSuccess, isError}
}