interface WaitlistState {
    email: string;
    status: 'idle' | 'loading' | 'success' | 'error'
    errorMessage: string | null
}


export function useWaitlist() {
    const state = useState<WaitlistState>('waitlist-state', () => ({
        email: '',
        status: 'idle',
        errorMessage: null,
    }))

    const isLoading = computed(() => state.value.status === 'loading')
    const isSuccess = computed(() => state.value.status === 'success')
    const isError = computed(() => state.value.status === 'error')


    const {data: waitlistCount} = useAsyncData('waitlist-count', () => $fetch<{
        count: number;
        success: boolean;
    }>('/api/waitlist'), {
        default: () => ({count: 0, success: false})
    })

    function incrementCount() {
        if (!waitlistCount.value) {
            return
        }
        waitlistCount.value.count += 1
    }

    async function join() {
        state.value.status = 'loading'
        state.value.errorMessage = null

        try {
            await $fetch('/api/waitlist', {
                method: 'POST',
                body: {email: state.value.email},
            })
            state.value.status = 'success'
            state.value.email = ''

            incrementCount()
        } catch (err: any) {
            state.value.status = 'error'
            state.value.errorMessage =
                err?.data?.statusMessage ?? 'Something went wrong. Please try again.'
        }
    }

    function reset() {
        state.value.status = 'idle'
        state.value.email = ''
        state.value.errorMessage = null
    }

    return {state, waitlistCount, join, reset, isLoading, isSuccess, isError}
}