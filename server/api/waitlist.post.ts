import {z} from 'zod';
import {getRequestIP} from 'h3';

const WaitlistPostSchema = z.object({
    email: z.string().email(),
});


export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const body = await readBody(event);
    const parsed = WaitlistPostSchema.safeParse(body);

    if (!parsed.success) {
        throw createError({statusCode: 400, statusMessage: 'Email is required'});
    }

    // Forward to NestJS — backend URL never exposed to browser
    const response = await $fetch<{ id: string; email: string }>(
        `${config.nestApiUrl}/waitlist`,
        {
            method: 'POST',
            body: parsed.data,
            headers: {
                'Content-Type': 'application/json',
                // forward real IP if needed
                'X-Forwarded-For': getRequestIP(event) ?? '',
            },
        }
    ).catch((err) => {
        // Map NestJS errors to clean client-facing errors
        const status = err?.response?.status
        if (status === 409) {
            throw createError({statusCode: 409, statusMessage: 'Already on the waitlist'})
        }
        throw createError({statusCode: 502, statusMessage: 'Could not join waitlist'})
    })

    return {
        success: true,
        id: response.id,
    }
})