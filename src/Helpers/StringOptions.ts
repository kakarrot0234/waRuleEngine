export class StringOptions {
    static isNullOrEmpty(text: string | undefined) {
        return text === undefined || text === null && text === "";
    }
}