import {Endpoint} from "#server/endpoint";

export default defineCachedEventHandler(async () => {
    const config = useRuntimeConfig();

    const response = await $fetch<{
        data: { count: number }
    }>(`${config.apiUrl}${Endpoint.waitlistCount}`).catch((err) => {
        console.error('Error fetching waitlist count:', err);
        throw createError({
            statusCode: 502,
            message: 'Failed to fetch waitlist count',
        });
    })

    return {
        success: true,
        count: response.data.count,
    }
}, {
    //cache for 1 hour with stale-while-revalidate
    maxAge: 60 * 60,
    swr: true,
})