import {Endpoint} from "#server/endpoint";
import type {LanguageCode, PartOfSpeech} from "#server/api/random-word.get";

export interface SharedWordDefinition {
    explanationLanguage: LanguageCode;
    text: string;
    register: string | null;
}

export interface SharedWordResult {
    id: string;
    term: string;
    pronunciation: string | null;
    partOfSpeech: PartOfSpeech;
    targetLanguage: LanguageCode;
    definitions: SharedWordDefinition[];
    example?: { sentence: string } | null;
}

// Cuid/uuid-shaped only: rejecting junk here keeps it from ever reaching
// the upstream throttle, whose 10 req/min budget covers this whole server.
const ID_SHAPE = /^[A-Za-z0-9-]{20,40}$/;

export default defineCachedEventHandler(async (event) => {
    const id = getRouterParam(event, 'id') ?? '';
    if (!ID_SHAPE.test(id)) {
        throw createError({statusCode: 404, message: 'Word not found'});
    }

    const config = useRuntimeConfig();
    const result = await $fetch<{ data: SharedWordResult }>(
        `${config.apiUrl}${Endpoint.sharedWord(id)}`,
    ).catch((error: { statusCode?: number }) => {
        if (error?.statusCode === 404) {
            throw createError({statusCode: 404, message: 'Word not found'});
        }
        console.error('Error fetching shared word:', error);
        throw createError({statusCode: 502, message: 'Failed to fetch word'});
    });

    return {
        success: true,
        data: result.data,
    };
}, {
    // A word never changes once published; a day keeps upstream traffic
    // at one hit per word per day regardless of how viral a link goes.
    maxAge: 86400,
    swr: true,
    getKey: (event) => `shared-word-${getRouterParam(event, 'id')}`,
});
