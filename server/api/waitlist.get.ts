export default defineCachedEventHandler(async () => {
    const config = useRuntimeConfig();

    const response = await $fetch<{ data: { count: number } }>(`${config.apiUrl}/waitlist/count`).catch((err) => {
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
    maxAge: 60 * 5,
    swr: true,
})