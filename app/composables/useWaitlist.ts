export function useWaitlist() {
    const email = useState('waitlist-email', () => '')
    const joined = useState('waitlist-joined', () => false)

    function submit(value: string) {
        email.value = value
        joined.value = true
    }

    function reset() {
        email.value = ''
        joined.value = false
    }

    return {email, joined, submit, reset}
}