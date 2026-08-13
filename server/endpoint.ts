export class Endpoint {
    static waitlist = '/waitlist'
    static waitlistCount = '/waitlist/count'
    static randomWord = '/learning/random-word'
    static sharedWord = (id: string) => `/vocabulary/words/${id}/shared`
}
