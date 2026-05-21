import {Endpoint} from "#server/endpoint";

export enum LanguageCode {
    EN = 'EN',
    ES = 'ES',
    FR = 'FR',
}

export enum WordDifficulty {
    BEGINNER = 'BEGINNER',
    INTERMEDIATE = 'INTERMEDIATE',
    ADVANCED = 'ADVANCED',
}

export enum PartOfSpeech {
    NOUN = 'NOUN',
    VERB = 'VERB',
    ADJECTIVE = 'ADJECTIVE',
    ADVERB = 'ADVERB',
    EXPRESSION = 'EXPRESSION',
    OTHER = 'OTHER',
}

export enum VocabularyWordStatus {
    DRAFT = 'DRAFT',
    PUBLISHED = 'PUBLISHED',
    ARCHIVED = 'ARCHIVED',
}

export interface WordExample {
    id: string;
    wordId: string;
    sentence: string;
    translation: string | null;
    translationLanguage: LanguageCode | null;
    createdAt: Date;
}


export interface VocabularyWord {
    id: string;
    term: string;
    normalizedTerm: string;
    targetLanguage: LanguageCode;
    difficulty: WordDifficulty;
    partOfSpeech: PartOfSpeech;
    status: VocabularyWordStatus;
    createdAt: Date;
    updatedAt: Date;
}


export interface WordDefinition {
    id: string;
    wordId: string;
    explanationLanguage: LanguageCode;
    text: string;
    register: string | null;
    createdAt: Date;
}

export interface WordPronunciation {
    id: string;
    wordId: string;
    phonetic: string | null;
    audioUrl: string | null;
    provider: string | null;
    createdAt: Date;
}

export interface WordSynonym {
    id: string;
    wordId: string;
    value: string;
    createdAt: Date;
}


export interface GetRandomWordForLandingResult {
    word: VocabularyWord;
    definitions: WordDefinition[];
    examples: WordExample[];
    pronunciations: WordPronunciation[];
    synonyms: WordSynonym[];
    themes?: string[];
}


export default defineCachedEventHandler(async (event) => {

    const config = useRuntimeConfig();
    const result = await $fetch<{
        data: GetRandomWordForLandingResult
    }>(`${config.apiUrl}${Endpoint.randomWord}`).catch((error) => {
        console.error('Error fetching random word:', error);
        throw createError({
            statusCode: 500,
            message: 'Failed to fetch random word',
        });
    });

    return {
        success: true,
        data: result.data,
    }
}, {
    //cache for 1 day
    maxAge: 86400,
    swr: true,
});