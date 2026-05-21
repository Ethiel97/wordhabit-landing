import type {GetRandomWordForLandingResult,} from "#server/api/random-word.get";


export const useLearning = () => {
    const {data: result, pending, error} = useAsyncData<{
        data: GetRandomWordForLandingResult | null,
        success: boolean
    }>('random-word', () => $fetch(`/api/random-word`), {
        default: () => ({
            success: false,
            data: null,
        }),
    })

    const randomWord = computed<GetRandomWordForLandingResult | null>(() => result.value?.data ?? null)

    return {randomWord, pending, error}
}